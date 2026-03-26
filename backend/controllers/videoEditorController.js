const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');

const STORAGE_ROOT = path.join(__dirname, '..', 'tmp', 'video-editor');
const UPLOADS_DIR = path.join(STORAGE_ROOT, 'uploads');
const EXPORTS_DIR = path.join(STORAGE_ROOT, 'exports');
const WORK_DIR = path.join(STORAGE_ROOT, 'work');
const CATALOG_PATH = path.join(STORAGE_ROOT, 'catalog.json');

const ensureStorage = async () => {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(EXPORTS_DIR, { recursive: true });
  await fs.mkdir(WORK_DIR, { recursive: true });

  try {
    await fs.access(CATALOG_PATH);
  } catch (_error) {
    await fs.writeFile(CATALOG_PATH, JSON.stringify({ videos: [] }, null, 2), 'utf-8');
  }
};

const readCatalog = async () => {
  await ensureStorage();
  const raw = await fs.readFile(CATALOG_PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeCatalog = async (catalog) => {
  await fs.writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
};

const runCommand = (binary, args) => {
  return new Promise((resolve, reject) => {
    const process = spawn(binary, args);
    let stderr = '';

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('error', (error) => {
      reject(error);
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr || `${binary} exited with code ${code}`));
      }
    });
  });
};

const getVideoDuration = async (videoPath) => {
  const args = [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    videoPath,
  ];

  try {
    let output = '';
    await new Promise((resolve, reject) => {
      const probe = spawn('ffprobe', args);
      probe.stdout.on('data', (data) => {
        output += data.toString();
      });
      probe.on('error', reject);
      probe.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('ffprobe failed'));
      });
    });

    const parsed = Number.parseFloat(output.trim());
    return Number.isFinite(parsed) ? parsed : 0;
  } catch (_error) {
    return 0;
  }
};

const toSrtTimestamp = (seconds) => {
  const safe = Math.max(0, Number(seconds) || 0);
  const hours = Math.floor(safe / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((safe % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(safe % 60).toString().padStart(2, '0');
  const ms = Math.floor((safe % 1) * 1000).toString().padStart(3, '0');
  return `${hours}:${minutes}:${secs},${ms}`;
};

const srtFromEntries = (entries) => {
  return entries
    .map((entry, index) => {
      return `${index + 1}\n${toSrtTimestamp(entry.start)} --> ${toSrtTimestamp(entry.end)}\n${entry.text || ''}`;
    })
    .join('\n\n');
};

const hexToAssColor = (hex) => {
  const cleaned = (hex || '#FFFFFF').replace('#', '');
  const normalized = cleaned.length === 3
    ? cleaned.split('').map((char) => `${char}${char}`).join('')
    : cleaned.padEnd(6, 'F').slice(0, 6);

  const rr = normalized.slice(0, 2);
  const gg = normalized.slice(2, 4);
  const bb = normalized.slice(4, 6);

  return `&H00${bb}${gg}${rr}&`;
};

const positionToAlignment = (position) => {
  if (position === 'top') return 8;
  if (position === 'middle') return 5;
  return 2;
};

const sanitizeSubtitles = (subtitles) => {
  if (!Array.isArray(subtitles)) return [];
  return subtitles
    .map((entry, index) => ({
      id: entry.id || `line-${index}`,
      start: Math.max(0, Number(entry.start) || 0),
      end: Math.max(0, Number(entry.end) || 0),
      text: String(entry.text || '').trim(),
    }))
    .filter((entry) => entry.text && entry.end > entry.start);
};

const requestWhisperTranscription = async (audioPath) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing.');
  }

  const audioBuffer = await fs.readFile(audioPath);
  const form = new FormData();
  form.append('file', new Blob([audioBuffer]), 'audio.wav');
  form.append('model', process.env.WHISPER_MODEL || 'whisper-1');
  form.append('response_format', 'verbose_json');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: form,
  });

  if (!response.ok) {
    const reason = await response.text();
    throw new Error(`Whisper request failed: ${reason}`);
  }

  const data = await response.json();
  const segments = Array.isArray(data.segments) ? data.segments : [];

  return segments.map((segment, index) => ({
    id: `whisper-${index}`,
    start: Number(segment.start) || 0,
    end: Number(segment.end) || 0,
    text: String(segment.text || '').trim(),
  })).filter((entry) => entry.text && entry.end > entry.start);
};

const getVideoById = async (videoId) => {
  const catalog = await readCatalog();
  const found = catalog.videos.find((video) => video.id === videoId);
  return { catalog, found };
};

const uploadVideo = async (req, res) => {
  try {
    await ensureStorage();

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Video file is required.' });
    }

    const videoId = crypto.randomUUID();
    const duration = await getVideoDuration(req.file.path);

    const metadata = {
      id: videoId,
      filePath: req.file.path,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      duration,
      createdAt: new Date().toISOString(),
    };

    const catalog = await readCatalog();
    catalog.videos.push(metadata);
    await writeCatalog(catalog);

    return res.status(201).json({
      success: true,
      data: {
        videoId,
        duration,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const generateSubtitles = async (req, res) => {
  try {
    const { videoId, mode = 'auto', subtitles: manualSubtitles = [] } = req.body || {};

    if (!videoId) {
      return res.status(400).json({ success: false, message: 'videoId is required.' });
    }

    const { found } = await getVideoById(videoId);

    if (!found) {
      return res.status(404).json({ success: false, message: 'Video not found.' });
    }

    if (mode === 'manual') {
      const normalized = sanitizeSubtitles(manualSubtitles);
      return res.status(200).json({ success: true, data: { subtitles: normalized } });
    }

    const audioPath = path.join(WORK_DIR, `${videoId}.wav`);
    await runCommand('ffmpeg', ['-y', '-i', found.filePath, '-ac', '1', '-ar', '16000', audioPath]);

    const subtitles = await requestWhisperTranscription(audioPath);

    return res.status(200).json({ success: true, data: { subtitles } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const exportVideo = async (req, res) => {
  try {
    const { videoId, trim = {}, subtitles = [], subtitleStyle = {} } = req.body || {};

    if (!videoId) {
      return res.status(400).json({ success: false, message: 'videoId is required.' });
    }

    const { found } = await getVideoById(videoId);

    if (!found) {
      return res.status(404).json({ success: false, message: 'Video not found.' });
    }

    const start = Math.max(0, Number(trim.start) || 0);
    const end = Number(trim.end) > start ? Number(trim.end) : null;

    const sanitizedSubtitles = sanitizeSubtitles(subtitles);
    const shouldBurnSubtitles = sanitizedSubtitles.length > 0;
    const subtitlePath = path.join(WORK_DIR, `${videoId}-${Date.now()}.srt`);

    if (shouldBurnSubtitles) {
      await fs.writeFile(subtitlePath, srtFromEntries(sanitizedSubtitles), 'utf-8');
    }

    const outputPath = path.join(EXPORTS_DIR, `${videoId}-${Date.now()}.mp4`);
    const args = ['-y'];

    if (start > 0) {
      args.push('-ss', String(start));
    }

    args.push('-i', found.filePath);

    if (end !== null) {
      args.push('-to', String(end));
    }

    if (shouldBurnSubtitles) {
      const escapedSubtitlePath = subtitlePath
        .replace(/\\/g, '/')
        .replace(':', '\\:')
        .replace(/'/g, "\\'");

      const assColor = hexToAssColor(subtitleStyle.color);
      const fontSize = Math.max(14, Number(subtitleStyle.fontSize) || 28);
      const alignment = positionToAlignment(subtitleStyle.position);
      const style = `Fontsize=${fontSize},PrimaryColour=${assColor},Alignment=${alignment},OutlineColour=&H40000000&,BorderStyle=1,Outline=1,Shadow=0`;

      args.push('-vf', `subtitles='${escapedSubtitlePath}':force_style='${style}'`);
    }

    args.push('-c:a', 'aac', '-movflags', '+faststart', outputPath);

    await runCommand('ffmpeg', args);

    return res.download(outputPath, `${videoId}-export.mp4`);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadVideo,
  generateSubtitles,
  exportVideo,
};
