import React, { useState, useRef, useEffect } from 'react';
import {
  FiUpload, FiScissors, FiType, FiMusic, FiFilter, FiPlay, FiPause, FiRewind, FiFastForward,
  FiChevronRight, FiChevronLeft, FiPlusCircle, FiCheckCircle, FiFilm, FiDownload, FiStar, FiZap, FiMaximize,
  FiRotateCw, FiImage, FiLayers
} from 'react-icons/fi';
import './Editing.css';

// Mock data
const MUSIC_TRACKS = [{ id: 'm1', name: 'Upbeat Funk' }, { id: 'm2', name: 'Cinematic Ambient' }, { id: 'm3', name: 'Acoustic Chill' }];
const FILTERS = [{ id: 'f1', name: 'Vintage' }, { id: 'f2', name: 'Noir' }, { id: 'f3', name: 'Summer' }];
const TRANSITIONS = ['Fade', 'Slide', 'Zoom', 'Wipe'];
const STICKERS = ['🔥', '✨', '🎉', '❤️', '👍'];

const FILTER_STYLE_MAP = {
  Vintage: 'sepia(0.35) saturate(1.1)',
  Noir: 'grayscale(1) contrast(1.2)',
  Summer: 'saturate(1.25) hue-rotate(-10deg)',
};

const TOOL_ITEMS = [
  { id: 'trim', label: 'Trim', icon: <FiScissors /> },
  { id: 'cut', label: 'Cut', icon: <FiScissors /> },
  { id: 'split', label: 'Split', icon: <FiLayers /> },
  { id: 'cropRotate', label: 'Crop/Rotate', icon: <FiRotateCw /> },
  { id: 'speed', label: 'Speed', icon: <FiFastForward /> },
  { id: 'filters', label: 'Filters', icon: <FiFilter /> },
  { id: 'transitions', label: 'Transitions', icon: <FiFilm /> },
  { id: 'text', label: 'Text/Titles', icon: <FiType /> },
  { id: 'stickers', label: 'Stickers', icon: <FiImage /> },
  { id: 'audio', label: 'Audio', icon: <FiMusic /> },
  { id: 'ai', label: 'AI Tools', icon: <FiZap /> },
];

// New Landing Page Component
const EditingLandingPage = ({ onStartEditing }) => (
  <div className="editing-landing-page">
    <div className="hero-section">
      <h1>Professional Video Editing, Simplified</h1>
      <p>Create stunning, high-quality videos in minutes. No experience required.</p>
      <button className="btn-primary-cta" onClick={onStartEditing}>
        <FiPlay /> Start Editing Now
      </button>
    </div>

    <div className="editor-preview-section">
      <div className="editor-workspace">
        <div className="preview-window-mock">
          <FiPlay className="play-icon-mock" />
          <p className="preview-upload-text">Upload your video to get started</p>
        </div>
        <div className="timeline-mock">
          <div className="timeline-track"></div>
          <div className="timeline-track"></div>
        </div>
      </div>
    </div>

    <div className="features-section">
      <h2>All The Tools You Need</h2>
      <div className="features-grid">
        <div className="feature-item"><FiScissors /> Trim & Cut</div>
        <div className="feature-item"><FiMaximize /> Crop & Resize</div>
        <div className="feature-item"><FiFastForward /> Speed Control</div>
        <div className="feature-item"><FiFilm /> Transitions</div>
        <div className="feature-item"><FiFilter /> Filters & Effects</div>
        <div className="feature-item"><FiType /> Titles & Text</div>
        <div className="feature-item"><FiMusic /> Audio Editing</div>
        <div className="feature-item"><FiCheckCircle /> Color Correction</div>
      </div>
    </div>

    <div className="templates-ai-section">
      <div className="templates-showcase">
        <h3>Start with a Template</h3>
        <div className="templates-tags">
          <span>Reels</span>
          <span>YouTube</span>
          <span>Ads</span>
          <span>Social Media</span>
        </div>
      </div>
      <div className="ai-features">
        <h3>Powered by AI</h3>
        <div className="ai-tags">
          <span><FiZap /> Auto Captions</span>
          <span><FiStar /> Smart Cut</span>
          <span><FiMaximize /> Auto Resize</span>
        </div>
      </div>
    </div>
    
    <div className="export-section">
      <h2>Export & Share</h2>
      <p>Download your videos in the perfect format.</p>
      <div className="export-options">
        <span>720p</span>
        <span>1080p</span>
        <span>4K</span>
        <span>MP4</span>
      </div>
    </div>

    <div className="final-cta-section">
      <h2>Ready to Create Your Masterpiece?</h2>
      <button className="btn-primary-cta" onClick={onStartEditing}>
        <FiPlay /> Try for Free
      </button>
    </div>
  </div>
);


// Main Component
export function Editing() {
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [activeTool, setActiveTool] = useState('trim');
  const [trim, setTrim] = useState({ start: 0, end: 120 });
  const [cutPoint, setCutPoint] = useState(30);
  const [splitPoint, setSplitPoint] = useState(60);
  const [text, setText] = useState({ content: '', color: '#ffffff', fontSize: 24, position: 'center' });
  const [music, setMusic] = useState({ track: null, volume: 80, fadeIn: 0, fadeOut: 0 });
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [speedControl, setSpeedControl] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedTransition, setSelectedTransition] = useState('Fade');
  const [selectedSticker, setSelectedSticker] = useState(STICKERS[0]);
  const [subtitleEnabled, setSubtitleEnabled] = useState(false);
  const [bgRemoveEnabled, setBgRemoveEnabled] = useState(false);
  const [subtitleStyle, setSubtitleStyle] = useState('Clean');
  const [draggedClip, setDraggedClip] = useState(null);
  const [timelineTracks, setTimelineTracks] = useState({
    video: [
      { id: 'v-main', label: 'Main Clip', className: 'video-clip' },
      { id: 'v-broll', label: 'B-Roll', className: 'video-clip secondary' },
    ],
    audio: [{ id: 'a-main', label: 'Music', className: 'audio-clip' }],
    text: [{ id: 't-main', label: 'Title', className: 'text-clip' }],
  });

  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.play().catch(console.error) : videoRef.current.pause();
    }
  }, [isPlaying, videoFile]);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    const onLoadedMetadata = () => {
      if (Number.isFinite(videoElement.duration)) {
        setDuration(Math.floor(videoElement.duration));
        setTrim((prev) => ({ ...prev, end: Math.floor(videoElement.duration) }));
      }
    };

    const onTimeUpdate = () => {
      const updatedTime = videoElement.currentTime;
      if (updatedTime >= Number(trim.end) && isPlaying) {
        videoElement.currentTime = Number(trim.start);
        setCurrentTime(Number(trim.start));
        return;
      }
      setCurrentTime(updatedTime);
    };

    videoElement.addEventListener('loadedmetadata', onLoadedMetadata);
    videoElement.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      videoElement.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [videoFile, trim.start, trim.end, isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speedControl / 100;
    }
  }, [speedControl, videoFile]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (currentTime < Number(trim.start) && isPlaying) {
      videoRef.current.currentTime = Number(trim.start);
      setCurrentTime(Number(trim.start));
    }
  }, [trim.start, currentTime, isPlaying]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };
  
  const handleToolClick = (tool) => setActiveTool(tool);

  const handleTimelineClick = (event) => {
    if (!timelineRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const clickX = event.clientX - timelineRect.left;
    const safeDuration = duration || 1;
    const newTime = Math.max(0, Math.min((clickX / timelineRect.width) * safeDuration, safeDuration));
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const addTimelineClip = (laneKey, label, className) => {
    setTimelineTracks((prev) => ({
      ...prev,
      [laneKey]: [
        ...prev[laneKey],
        {
          id: `${laneKey}-${Date.now()}`,
          label,
          className,
        },
      ],
    }));
  };

  const handleDragStart = (laneKey, clipId) => {
    setDraggedClip({ laneKey, clipId });
  };

  const handleDropToLane = (targetLane) => {
    if (!draggedClip) return;

    setTimelineTracks((prev) => {
      const sourceLaneClips = [...prev[draggedClip.laneKey]];
      const movedClipIndex = sourceLaneClips.findIndex((clip) => clip.id === draggedClip.clipId);
      if (movedClipIndex === -1) return prev;

      const [movedClip] = sourceLaneClips.splice(movedClipIndex, 1);
      const updatedTargetLane = [...prev[targetLane], movedClip];

      return {
        ...prev,
        [draggedClip.laneKey]: sourceLaneClips,
        [targetLane]: updatedTargetLane,
      };
    });

    setDraggedClip(null);
  };

  const previewFilter = [
    `brightness(${Math.max(0.2, brightness / 50).toFixed(2)})`,
    `contrast(${Math.max(0.2, contrast / 50).toFixed(2)})`,
    FILTER_STYLE_MAP[selectedFilter] || '',
  ].join(' ').trim();

  const playheadPercent = duration ? (currentTime / duration) * 100 : 0;

  const renderPropertiesPanel = () => {
    switch (activeTool) {
      case 'trim':
        return (
          <div className="tool-panel">
            <h4>Trim Video</h4>
            <div className="range-slider">
              <label>Start: {trim.start}s</label>
              <input type="range" min="0" max={duration} value={trim.start} onChange={(e) => setTrim({ ...trim, start: Number(e.target.value) })} />
            </div>
            <div className="range-slider">
              <label>End: {trim.end}s</label>
              <input type="range" min="0" max={duration} value={trim.end} onChange={(e) => setTrim({ ...trim, end: Number(e.target.value) })} />
            </div>
          </div>
        );
      case 'cut':
        return (
          <div className="tool-panel">
            <h4>Cut</h4>
            <div className="range-slider">
              <label>Cut Point: {cutPoint}s</label>
              <input type="range" min="0" max={duration} value={cutPoint} onChange={(e) => setCutPoint(Number(e.target.value))} />
            </div>
            <button type="button" className="tool-action-btn" onClick={() => addTimelineClip('video', `Cut @ ${cutPoint}s`, 'video-clip')}>
              Apply Cut
            </button>
          </div>
        );
      case 'split':
        return (
          <div className="tool-panel">
            <h4>Split</h4>
            <div className="range-slider">
              <label>Split Point: {splitPoint}s</label>
              <input type="range" min="0" max={duration} value={splitPoint} onChange={(e) => setSplitPoint(Number(e.target.value))} />
            </div>
            <button type="button" className="tool-action-btn" onClick={() => addTimelineClip('video', `Split @ ${splitPoint}s`, 'video-clip secondary')}>
              Apply Split
            </button>
          </div>
        );
      case 'cropRotate':
        return (
          <div className="tool-panel">
            <h4>Crop / Rotate</h4>
            <div className="range-slider">
              <label>Rotation: {rotation}°</label>
              <input type="range" min="-180" max="180" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />
            </div>
            <div className="range-slider">
              <label>Brightness: {brightness}%</label>
              <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
            </div>
            <div className="range-slider">
              <label>Contrast: {contrast}%</label>
              <input type="range" min="0" max="100" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
            </div>
          </div>
        );
      case 'speed':
        return (
          <div className="tool-panel">
            <h4>Speed Control</h4>
            <div className="range-slider">
              <label>Speed: {(speedControl / 100).toFixed(2)}x</label>
              <input type="range" min="25" max="200" value={speedControl} onChange={(e) => setSpeedControl(Number(e.target.value))} />
            </div>
          </div>
        );
      case 'filters':
        return (
          <div className="tool-panel">
            <h4>Filters</h4>
            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
              <option value="">Select filter</option>
              {FILTERS.map((filter) => <option key={filter.id} value={filter.name}>{filter.name}</option>)}
            </select>
          </div>
        );
      case 'transitions':
        return (
          <div className="tool-panel">
            <h4>Transitions</h4>
            <select value={selectedTransition} onChange={(e) => setSelectedTransition(e.target.value)}>
              {TRANSITIONS.map((transition) => <option key={transition} value={transition}>{transition}</option>)}
            </select>
          </div>
        );
      case 'text':
        return (
          <div className="tool-panel">
            <h4>Text / Titles</h4>
            <input type="text" placeholder="Enter text" value={text.content} onChange={(e) => setText({ ...text, content: e.target.value })} />
            <div className="text-options">
              <input type="color" value={text.color} onChange={(e) => setText({ ...text, color: e.target.value })} />
              <input type="number" min="12" max="72" value={text.fontSize} onChange={(e) => setText({ ...text, fontSize: Number(e.target.value) })} />
            </div>
            <select value={text.position} onChange={(e) => setText({ ...text, position: e.target.value })}>
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        );
      case 'stickers':
        return (
          <div className="tool-panel">
            <h4>Stickers</h4>
            <div className="sticker-row">
              {STICKERS.map((sticker) => (
                <button key={sticker} type="button" className={`sticker-btn ${selectedSticker === sticker ? 'active' : ''}`} onClick={() => setSelectedSticker(sticker)}>
                  {sticker}
                </button>
              ))}
            </div>
            <button type="button" className="tool-action-btn" onClick={() => addTimelineClip('text', `Sticker ${selectedSticker}`, 'text-clip')}>
              Add Sticker
            </button>
          </div>
        );
      case 'audio':
        return (
          <div className="tool-panel">
            <h4>Audio Controls</h4>
            <select value={music.track || ''} onChange={(e) => setMusic({ ...music, track: e.target.value })}>
              <option value="">Select a track</option>
              {MUSIC_TRACKS.map((track) => <option key={track.id} value={track.name}>{track.name}</option>)}
            </select>
            <div className="range-slider">
              <label>Volume: {music.volume}%</label>
              <input type="range" min="0" max="100" value={music.volume} onChange={(e) => setMusic({ ...music, volume: Number(e.target.value) })} />
            </div>
            <div className="range-slider">
              <label>Fade In: {music.fadeIn}s</label>
              <input type="range" min="0" max="10" value={music.fadeIn} onChange={(e) => setMusic({ ...music, fadeIn: Number(e.target.value) })} />
            </div>
            <div className="range-slider">
              <label>Fade Out: {music.fadeOut}s</label>
              <input type="range" min="0" max="10" value={music.fadeOut} onChange={(e) => setMusic({ ...music, fadeOut: Number(e.target.value) })} />
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="tool-panel">
            <h4>AI Tools</h4>
            <label className="tool-checkbox">
              <input type="checkbox" checked={subtitleEnabled} onChange={(e) => setSubtitleEnabled(e.target.checked)} />
              Auto Subtitle
            </label>
            <label className="tool-checkbox">
              <input type="checkbox" checked={bgRemoveEnabled} onChange={(e) => setBgRemoveEnabled(e.target.checked)} />
              Background Remove
            </label>
            <select value={subtitleStyle} onChange={(e) => setSubtitleStyle(e.target.value)}>
              <option value="Clean">Subtitle Style: Clean</option>
              <option value="Bold">Subtitle Style: Bold</option>
              <option value="Minimal">Subtitle Style: Minimal</option>
            </select>
          </div>
        );
      default:
        return (
          <div className="tool-panel">
            <p>Select a tool to start editing.</p>
          </div>
        );
    }
  };

  return (
    <div className="editing-page">


      {showEditor ? (
        <div className="editor-layout">
          <aside className="left-panel">
            <div className="card tools-card">
              <h3>Tools</h3>
              <div className="tools-grid tools-grid-extended">
                {TOOL_ITEMS.map((item) => (
                  <button key={item.id} className={`tool ${activeTool === item.id ? 'active' : ''}`} onClick={() => handleToolClick(item.id)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="card quick-controls-card">
              <h3>Quick Controls</h3>
              <div className="range-slider">
                <label>Brightness: {brightness}%</label>
                <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
              </div>
              <div className="range-slider">
                <label>Contrast: {contrast}%</label>
                <input type="range" min="0" max="100" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
              </div>
              <div className="range-slider">
                <label>Speed: {(speedControl / 100).toFixed(2)}x</label>
                <input type="range" min="25" max="200" value={speedControl} onChange={(e) => setSpeedControl(Number(e.target.value))} />
              </div>
            </div>
          </aside>
          <main className="main-content">
            <div className="video-preview">
              {videoFile ? (
                <video
                  ref={videoRef}
                  src={URL.createObjectURL(videoFile)}
                  className="preview-video"
                  style={{
                    filter: previewFilter,
                    transform: `rotate(${rotation}deg)`,
                    transition: selectedTransition === 'Fade' ? 'filter 0.3s ease, transform 0.3s ease, opacity 0.3s ease' : 'filter 0.3s ease, transform 0.3s ease',
                  }}
                />
              ) : (
                <div className="upload-placeholder" onClick={() => document.getElementById('file-upload').click()}>
                  <FiUpload />
                  <div className="upload-placeholder-text">
                    <p>Upload videos to start editing</p>
                    <p className="subtext">Drag & drop or click to upload</p>
                  </div>
                  <input type="file" accept="video/*" onChange={handleFileChange} className="file-input-hidden" id="file-upload" />
                </div>
              )}
              {text.content && <div className={`text-overlay text-${text.position}`} style={{ color: text.color, fontSize: `${text.fontSize}px` }}>{text.content}</div>}
              {selectedSticker && <div className="sticker-overlay">{selectedSticker}</div>}
              {subtitleEnabled && <div className={`subtitle-overlay subtitle-${subtitleStyle.toLowerCase()}`}>Auto Subtitle Preview</div>}
              {bgRemoveEnabled && <div className="ai-badge">BG Remove On</div>}
            </div>

            <div className="timeline-controls">
              <div className="playback-buttons">
                <button><FiRewind /></button>
                <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <FiPause /> : <FiPlay />}</button>
                <button><FiFastForward /></button>
              </div>

              <div className="timeline" ref={timelineRef} onClick={handleTimelineClick}>
                <div className="progress-bar" style={{ width: `${playheadPercent}%` }}></div>
                <div className="handle" style={{ left: `${playheadPercent}%` }}></div>
              </div>

              <div className="timeline-ruler">
                <span>00:00</span>
                <span>00:30</span>
                <span>01:00</span>
                <span>01:30</span>
                <span>02:00</span>
              </div>

              <div className="timeline-track-stack">
                {[
                  { key: 'video', label: 'Video' },
                  { key: 'audio', label: 'Audio' },
                  { key: 'text', label: 'Text' },
                ].map((lane) => (
                  <div className="timeline-track-row" key={lane.key}>
                    <span className="track-label">{lane.label}</span>
                    <div
                      className="track-lane"
                      data-droppable="true"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDropToLane(lane.key)}
                    >
                      {timelineTracks[lane.key].map((clip) => (
                        <div
                          key={clip.id}
                          className={`track-clip ${clip.className}`}
                          draggable="true"
                          onDragStart={() => handleDragStart(lane.key, clip.id)}
                        >
                          {clip.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <aside className="right-panel">
            <div className="card properties-card">
              <h3>Properties</h3>
              {renderPropertiesPanel()}
            </div>
            <div className="card export-card"><h3>Export Video</h3><button className="btn-primary export-btn" disabled={!videoFile}>Export</button></div>
          </aside>
        </div>
      ) : (
        <EditingLandingPage onStartEditing={() => setShowEditor(true)} />
      )}
    </div>
  );
}
