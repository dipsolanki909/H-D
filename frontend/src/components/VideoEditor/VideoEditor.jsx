import React, { useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import VideoPreview from './VideoPreview';
import Timeline from './Timeline';
import SubtitlesPanel from './SubtitlesPanel';
import { exportVideo, requestSubtitles, uploadVideo } from './videoEditorApi';
import './videoEditor.css';

const initialStyle = {
  color: '#ffffff',
  fontSize: 28,
  position: 'bottom',
};

const formatTime = (seconds) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const mins = Math.floor(safe / 60).toString().padStart(2, '0');
  const secs = Math.floor(safe % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const parseSrt = (srtText) => {
  const blocks = srtText.replace(/\r/g, '').split('\n\n').filter(Boolean);
  return blocks
    .map((block, index) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      if (lines.length < 2) return null;

      const timeLine = lines.find((line) => line.includes('-->'));
      if (!timeLine) return null;

      const [rawStart, rawEnd] = timeLine.split('-->').map((v) => v.trim());
      const textLines = lines.filter((line) => !line.includes('-->') && !/^\d+$/.test(line));

      const toSeconds = (value) => {
        const normalized = value.replace(',', '.');
        const [hh, mm, ss] = normalized.split(':');
        return Number(hh) * 3600 + Number(mm) * 60 + Number(ss);
      };

      return {
        id: `srt-${Date.now()}-${index}`,
        start: toSeconds(rawStart),
        end: toSeconds(rawEnd),
        text: textLines.join(' '),
      };
    })
    .filter(Boolean);
};

const downloadBlob = (blob, fileName) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function VideoEditor() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [trim, setTrim] = useState({ start: 0, end: 0 });
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleStyle, setSubtitleStyle] = useState(initialStyle);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Upload a video to begin this module.');

  const activeSubtitle = useMemo(() => {
    return subtitles.find((entry) => currentTime >= entry.start && currentTime <= entry.end) || null;
  }, [currentTime, subtitles]);

  const onVideoUpload = async (file) => {
    if (!file) return;

    setError('');
    setStatus('Uploading video...');
    setIsUploading(true);

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    const localUrl = URL.createObjectURL(file);
    setVideoUrl(localUrl);

    try {
      const response = await uploadVideo(file);
      setVideoId(response.videoId);
      setDuration(response.duration || 0);
      setTrim({ start: 0, end: response.duration || 0 });
      setStatus('Video uploaded. You can generate or upload subtitles.');
    } catch (uploadError) {
      setError(uploadError?.response?.data?.message || uploadError.message || 'Upload failed.');
      setStatus('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const onAutoSubtitles = async () => {
    if (!videoId) {
      setError('Upload a video before generating subtitles.');
      return;
    }

    setError('');
    setStatus('Generating subtitles with Whisper...');
    setIsGenerating(true);

    try {
      const response = await requestSubtitles({ videoId, mode: 'auto' });
      setSubtitles(response.subtitles || []);
      setStatus('Auto subtitles generated. Review and edit as needed.');
    } catch (subtitleError) {
      setError(subtitleError?.response?.data?.message || subtitleError.message || 'Subtitle generation failed.');
      setStatus('Subtitle generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const onSrtUpload = async (file) => {
    if (!file) return;

    setError('');

    try {
      const text = await file.text();
      const parsed = parseSrt(text);
      setSubtitles(parsed);
      setStatus(`Loaded ${parsed.length} subtitle lines from SRT.`);
    } catch (srtError) {
      setError(srtError.message || 'Unable to parse SRT file.');
      setStatus('SRT import failed.');
    }
  };

  const onSubtitleChange = (subtitleId, value) => {
    setSubtitles((prev) => prev.map((entry) => (entry.id === subtitleId ? { ...entry, text: value } : entry)));
  };

  const onDurationReady = (videoDuration) => {
    if (!Number.isFinite(videoDuration) || videoDuration <= 0) return;

    setDuration((prev) => (prev > 0 ? prev : videoDuration));
    setTrim((prev) => {
      const nextEnd = prev.end > 0 ? prev.end : videoDuration;
      return { ...prev, end: nextEnd };
    });
  };

  const onExport = async () => {
    if (!videoId) {
      setError('Upload a video before export.');
      return;
    }

    setError('');
    setStatus('Preparing export...');
    setIsExporting(true);

    try {
      const blob = await exportVideo({
        videoId,
        trim,
        subtitleStyle,
        subtitles,
      });
      downloadBlob(blob, `edited-${Date.now()}.mp4`);
      setStatus('Export complete. Download started.');
    } catch (exportError) {
      setError(exportError?.response?.data?.message || exportError.message || 'Export failed.');
      setStatus('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="dhe-video-editor" aria-label="Video Editor Module">
      <header className="dhe-video-editor__header">
        <h2>Video Editing Module</h2>
        <p>Upload, subtitle, trim, and export without affecting existing flows.</p>
      </header>

      <div className="dhe-video-editor__grid">
        <Sidebar
          onVideoUpload={onVideoUpload}
          onAutoSubtitles={onAutoSubtitles}
          onExport={onExport}
          onStyleChange={setSubtitleStyle}
          subtitleStyle={subtitleStyle}
          isUploading={isUploading}
          isGenerating={isGenerating}
          isExporting={isExporting}
          hasVideo={Boolean(videoId)}
          hasSubtitles={subtitles.length > 0}
          status={status}
        />

        <div className="dhe-video-editor__workspace">
          <VideoPreview
            videoUrl={videoUrl}
            subtitle={activeSubtitle}
            subtitleStyle={subtitleStyle}
            currentTime={currentTime}
            onTimeUpdate={setCurrentTime}
            onDurationReady={onDurationReady}
          />

          <Timeline
            currentTime={currentTime}
            duration={duration}
            trim={trim}
            onSeek={setCurrentTime}
            onTrimChange={setTrim}
            formatTime={formatTime}
          />
        </div>

        <SubtitlesPanel
          subtitles={subtitles}
          onSubtitleChange={onSubtitleChange}
          onSrtUpload={onSrtUpload}
          hasVideo={Boolean(videoId)}
        />
      </div>

      {error ? <p className="dhe-video-editor__error">{error}</p> : null}
    </section>
  );
}
