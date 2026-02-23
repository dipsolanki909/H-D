import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUpload, FiScissors, FiType, FiMusic, FiFilter, FiPlay, FiPause, FiRewind, FiFastForward,
  FiChevronRight, FiChevronLeft, FiPlusCircle, FiCheckCircle, FiFilm, FiDownload, FiStar, FiZap, FiMaximize
} from 'react-icons/fi';
import './Editing.css';

// Mock data
const MUSIC_TRACKS = [{ id: 'm1', name: 'Upbeat Funk' }, { id: 'm2', name: 'Cinematic Ambient' }, { id: 'm3', name: 'Acoustic Chill' }];
const FILTERS = [{ id: 'f1', name: 'Vintage' }, { id: 'f2', name: 'Noir' }, { id: 'f3', name: 'Summer' }];

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
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [activeTool, setActiveTool] = useState(null);
  const [trim, setTrim] = useState({ start: 0, end: 120 });
  const [text, setText] = useState({ content: '', color: '#ffffff', fontSize: 24, position: 'center' });
  const [music, setMusic] = useState({ track: null, volume: 80 });

  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.play().catch(console.error) : videoRef.current.pause();
    }
  }, [isPlaying, videoFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoFile(file);
  };
  
  const handleToolClick = (tool) => setActiveTool(tool === activeTool ? null : tool);

  const renderToolPanel = () => {
    switch (activeTool) {
      case 'trim': return (
        <div className="tool-panel"><h4>Trim Video</h4><div className="range-slider"><label>Start: {trim.start}s</label><input type="range" min="0" max={duration} value={trim.start} onChange={(e) => setTrim({ ...trim, start: e.target.value })} /></div><div className="range-slider"><label>End: {trim.end}s</label><input type="range" min="0" max={duration} value={trim.end} onChange={(e) => setTrim({ ...trim, end: e.target.value })} /></div></div>
      );
      case 'text': return (
        <div className="tool-panel"><h4>Add Text</h4><input type="text" placeholder="Enter text" value={text.content} onChange={(e) => setText({ ...text, content: e.target.value })} /><div className="text-options"><input type="color" value={text.color} onChange={(e) => setText({ ...text, color: e.target.value })} /><input type="number" min="12" max="72" value={text.fontSize} onChange={(e) => setText({ ...text, fontSize: e.target.value })} /></div></div>
      );
      case 'music': return (
        <div className="tool-panel"><h4>Add Music</h4><select onChange={(e) => setMusic({ ...music, track: e.target.value })}><option value="">Select a track</option>{MUSIC_TRACKS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}</select><div className="range-slider"><label>Volume: {music.volume}%</label><input type="range" min="0" max="100" value={music.volume} onChange={(e) => setMusic({ ...music, volume: e.target.value })} /></div></div>
      );
      default: return <div className="tool-panel"><p>Select a tool to start editing.</p></div>;
    }
  };

  return (
    <div className="editing-page">


      {showEditor ? (
        <div className="editor-layout">
          <aside className="left-panel">
            <div className="card tools-card"><h3>Tools</h3><div className="tools-grid"><button className={`tool ${activeTool === 'trim' ? 'active' : ''}`} onClick={() => handleToolClick('trim')}><FiScissors /><span>Trim</span></button><button className={`tool ${activeTool === 'text' ? 'active' : ''}`} onClick={() => handleToolClick('text')}><FiType /><span>Text</span></button><button className={`tool ${activeTool === 'music' ? 'active' : ''}`} onClick={() => handleToolClick('music')}><FiMusic /><span>Music</span></button><button className={`tool ${activeTool === 'filters' ? 'active' : ''}`} onClick={() => handleToolClick('filters')}><FiFilter /><span>Filters</span></button></div></div>
            <div className="card">{renderToolPanel()}</div>
          </aside>
          <main className="main-content">
            <div className="video-preview">{videoFile ? (<video ref={videoRef} src={URL.createObjectURL(videoFile)} className="preview-video" />) : (<div className="upload-placeholder" onClick={() => document.getElementById('file-upload').click()}><FiUpload /><div className="upload-placeholder-text"><p>Upload videos to start editing</p><p className="subtext">Drag & drop or click to upload</p></div><input type="file" accept="video/*" onChange={handleFileChange} className="file-input-hidden" id="file-upload" /></div>)}{text.content && (<div className="text-overlay" style={{ color: text.color, fontSize: `${text.fontSize}px` }}>{text.content}</div>)}</div>
            <div className="timeline-controls"><div className="playback-buttons"><button><FiRewind /></button><button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <FiPause /> : <FiPlay />}</button><button><FiFastForward /></button></div><div className="timeline"><div className="progress-bar" style={{ width: `${(currentTime / duration) * 100}%` }}></div><div className="handle" style={{ left: `${(currentTime / duration) * 100}%` }}></div></div></div>
          </main>
          <aside className="right-panel">
            <div className="card export-card"><h3>Export Video</h3><button className="btn-primary export-btn" disabled={!videoFile}>Export</button></div>
          </aside>
        </div>
      ) : (
        <EditingLandingPage onStartEditing={() => setShowEditor(true)} />
      )}
    </div>
  );
}
