import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiDownload, FiLock, FiSearch, FiAlertCircle, FiX, FiPause, FiRewind, FiFastForward, FiScissors, FiType, FiMusic, FiSliders } from 'react-icons/fi';
import './Templates.css';
import { getTemplates } from '../api/dataService';

// Helper function to check if user is logged in
const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  console.log('[Templates] Auth Check - Token exists:', !!token);
  return !!token;
};

const videos = [
  '/images/templets/WhatsApp Video 2026-02-20 at 12.46.10 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.46.19 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.46.22 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.46.34 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.46.37 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.47.03 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.47.11 PM.mp4',
  '/images/templets/WhatsApp Video 2026-02-20 at 12.48.25 PM.mp4',
];

const parseDurationToSeconds = (duration) => {
  if (typeof duration === 'number' && Number.isFinite(duration)) {
    return Math.max(6, Math.round(duration));
  }

  if (typeof duration === 'string') {
    const match = duration.match(/\d+/);
    if (match) {
      return Math.max(6, Number(match[0]));
    }
  }

  return 20;
};

const buildEditorPreset = (template) => {
  const baseDuration = parseDurationToSeconds(template?.duration);
  const primaryVideoUrl = template?.video || '';

  const videoClips = Array.isArray(template?.videoClips) && template.videoClips.length
    ? template.videoClips
    : [
        {
          id: `${template.id}-video-1`,
          src: primaryVideoUrl,
          start: 0,
          duration: baseDuration,
          label: template?.name || 'Template Clip',
        },
      ];

  const textOverlays = Array.isArray(template?.textOverlays) && template.textOverlays.length
    ? template.textOverlays
    : [
        {
          id: `${template.id}-text-title`,
          text: template?.name || 'Template Title',
          x: 60,
          y: 46,
          fontSize: 34,
          fontFamily: 'Poppins',
          color: '#ffffff',
          animation: 'fade',
          width: 260,
          height: 72,
          start: 1,
          duration: Math.min(8, baseDuration),
          label: 'Title',
        },
        {
          id: `${template.id}-text-subtitle`,
          text: template?.category || 'Template',
          x: 70,
          y: 128,
          fontSize: 22,
          fontFamily: 'Poppins',
          color: '#f8fafc',
          animation: 'slide',
          width: 220,
          height: 56,
          start: 3,
          duration: Math.min(10, baseDuration),
          label: 'Subtitle',
        },
      ];

  const music = template?.music || {
    id: `${template.id}-music-1`,
    name: `${template?.name || 'Template'} Music`,
    start: 0,
    duration: baseDuration,
    volume: 100,
  };

  const timelineClips = [
    ...videoClips.map((clip, index) => ({
      id: clip.id || `${template.id}-video-${index + 1}`,
      track: 'video',
      start: Number(clip.start ?? 0),
      duration: Number(clip.duration ?? baseDuration),
      label: clip.label || `Video ${index + 1}`,
    })),
    ...textOverlays.map((overlay, index) => ({
      id: overlay.id || `${template.id}-text-${index + 1}`,
      track: 'text',
      start: Number(overlay.start ?? Math.min(2 + index * 2, Math.max(0, baseDuration - 2))),
      duration: Number(overlay.duration ?? Math.min(8, baseDuration)),
      label: overlay.label || overlay.text || `Text ${index + 1}`,
    })),
    {
      id: music.id || `${template.id}-audio-1`,
      track: 'audio',
      start: Number(music.start ?? 0),
      duration: Number(music.duration ?? baseDuration),
      baseDuration: Number(music.duration ?? baseDuration),
      trimStart: 0,
      trimEnd: 100,
      volume: Number(music.volume ?? 100),
      label: music.name || 'Template Music',
    },
  ];

  return {
    templateName: template?.name || 'Template',
    videoUrl: primaryVideoUrl,
    videoClips,
    textOverlays,
    music,
    timelineClips,
  };
};

// Professional Inline Video Editor Component
const InlineVideoEditor = ({ template, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('trim');
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [textOverlay, setTextOverlay] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [selectedMusic, setSelectedMusic] = useState('');

  const musicTracks = [
    { id: 'm1', name: 'Upbeat Funk' },
    { id: 'm2', name: 'Cinematic Ambient' },
    { id: 'm3', name: 'Acoustic Chill' },
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      setDuration(dur);
      setTrimEnd(dur);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleExport = () => {
    console.log('[Editor] Export clicked with settings:', {
      trimStart,
      trimEnd,
      textOverlay,
      fontSize,
      selectedMusic,
    });
    alert('✓ Video exported successfully! (Demo mode)');
  };

  return (
    <div className="inline-editor-modal">
      <div className="inline-editor-overlay" onClick={onClose}></div>
      <div className="inline-editor-container">
        {/* Header */}
        <div className="inline-editor-header">
          <div className="editor-title-section">
            <h2>{template.name}</h2>
            <p>{template.category} • {template.duration}</p>
          </div>
          <button className="close-editor-btn" onClick={onClose} title="Close Editor">
            <FiX size={24} />
          </button>
        </div>

        {/* Main Editor Layout */}
        <div className="inline-editor-layout">
          {/* Video Preview (Left) */}
          <div className="inline-preview-section">
            <div className="video-container">
              <video
                ref={videoRef}
                src={template.video}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="editor-video"
                crossOrigin="anonymous"
              />
              {textOverlay && (
                <div className="video-text-overlay" style={{ fontSize: `${fontSize}px` }}>
                  {textOverlay}
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="video-controls">
              <button className="control-btn" onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>
              <button className="control-btn" title="Rewind">
                <FiRewind size={20} onClick={() => videoRef.current && (videoRef.current.currentTime = Math.max(0, currentTime - 5))} />
              </button>
              <button className="control-btn" title="Fast Forward">
                <FiFastForward size={20} onClick={() => videoRef.current && (videoRef.current.currentTime = Math.min(duration, currentTime + 5))} />
              </button>
              <div className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</div>
            </div>

            {/* Timeline Scrubber */}
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Number(e.target.value);
                }
              }}
              className="timeline-input"
            />
          </div>

          {/* Tools Panel (Right) */}
          <div className="inline-tools-section">
            {/* Tool Tabs */}
            <div className="tools-header">
              <button
                className={`tool-tab ${activeTab === 'trim' ? 'active' : ''}`}
                onClick={() => setActiveTab('trim')}
              >
                <FiScissors size={18} /> Trim
              </button>
              <button
                className={`tool-tab ${activeTab === 'text' ? 'active' : ''}`}
                onClick={() => setActiveTab('text')}
              >
                <FiType size={18} /> Text
              </button>
              <button
                className={`tool-tab ${activeTab === 'music' ? 'active' : ''}`}
                onClick={() => setActiveTab('music')}
              >
                <FiMusic size={18} /> Music
              </button>
            </div>

            {/* Tool Content */}
            <div className="tools-content">
              {activeTab === 'trim' && (
                <div className="tool-panel">
                  <h3>Trim Video</h3>
                  <div className="slider-group">
                    <label>Start: {formatTime(trimStart)}</label>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={trimStart}
                      onChange={(e) => setTrimStart(Number(e.target.value))}
                      className="tool-slider"
                    />
                  </div>
                  <div className="slider-group">
                    <label>End: {formatTime(trimEnd)}</label>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={trimEnd}
                      onChange={(e) => setTrimEnd(Number(e.target.value))}
                      className="tool-slider"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="tool-panel">
                  <h3>Add Text Overlay</h3>
                  <div className="input-group">
                    <label>Text Content</label>
                    <input
                      type="text"
                      placeholder="Enter text..."
                      value={textOverlay}
                      onChange={(e) => setTextOverlay(e.target.value)}
                      className="text-input"
                    />
                  </div>
                  <div className="slider-group">
                    <label>Font Size: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="tool-slider"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'music' && (
                <div className="tool-panel">
                  <h3>Add Music Track</h3>
                  <select
                    value={selectedMusic}
                    onChange={(e) => setSelectedMusic(e.target.value)}
                    className="music-select"
                  >
                    <option value="">Select a track...</option>
                    {musicTracks.map((track) => (
                      <option key={track.id} value={track.id}>
                        {track.name}
                      </option>
                    ))}
                  </select>
                  {selectedMusic && (
                    <div className="music-preview">
                      <p>🎵 {musicTracks.find((t) => t.id === selectedMusic)?.name}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Export Button */}
            <div className="editor-actions">
              <button className="btn-export" onClick={handleExport}>
                <FiDownload size={18} /> Export Video
              </button>
              <button className="btn-cancel" onClick={onClose}>
                Close Editor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Templates = () => {
  const navigate = useNavigate();
  const prepareTimeoutRef = useRef(null);
  const [templatesData, setTemplatesData] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [preview, setPreview] = useState(null);
  const [loadingTemplateId, setLoadingTemplateId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isPreparingTemplate, setIsPreparingTemplate] = useState(false);

  useEffect(() => {
    console.log('[Templates] Initializing - Fetching template data');
    const templates = getTemplates().map((template, index) => ({
      ...template,
      video: videos[index % videos.length],
    }));
    setTemplatesData(templates);
    console.log(`[Templates] Loaded ${templates.length} templates`);
  }, []);

  useEffect(() => {
    return () => {
      if (prepareTimeoutRef.current) {
        clearTimeout(prepareTimeoutRef.current);
      }
    };
  }, []);

  const categories = React.useMemo(() => {
    const s = new Set(['All']);
    templatesData.forEach(t => s.add(t.category || 'Uncategorized'));
    return Array.from(s);
  }, [templatesData]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return templatesData.filter(t => {
      if (category !== 'All' && t.category !== category) return false;
      if (!q) return true;
      return (
        (t.name || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q)
      );
    });
  }, [templatesData, query, category]);

  const onUse = async (template) => {
    console.log(`[Templates] Use Template clicked - Template ID: ${template.id}, Type: ${template.type}`);
    
    // Clear previous errors
    setError(null);
    
    // Check authentication before proceeding
    const loggedIn = isUserLoggedIn();
    if (!loggedIn) {
      console.warn('[Templates] ⚠️ User not logged in. Redirecting to login...');
      navigate('/login', { state: { returnTo: '/templates', templateId: template.id } });
      return;
    }

    // Handle premium templates
    if (template.type === 'premium') {
      console.log('[Templates] Premium template selected. Redirecting to payment...');
      navigate('/payment', { state: { templateId: template.id } });
      return;
    }

    // For free templates, show loading and redirect to pro editor
    try {
      setLoadingTemplateId(template.id);
      setIsPreparingTemplate(true);
      console.log(`[Templates] ✓ Auth verified. Preparing template ${template.id}...`);

      if (prepareTimeoutRef.current) {
        clearTimeout(prepareTimeoutRef.current);
      }

      prepareTimeoutRef.current = setTimeout(() => {
        const editorPreset = buildEditorPreset(template);
        setIsPreparingTemplate(false);
        setLoadingTemplateId(null);
        console.log(`[Templates] ✓ Redirecting to /pro-editor for template: ${template.id}`);
        navigate('/pro-editor', {
          state: {
            templateId: template.id,
            templateName: template.name,
            templateData: template,
            editorPreset,
          },
        });
      }, 2000);
    } catch (err) {
      console.error('[Templates] ❌ Error using template:', err);
      const errorMsg = err.message || 'Failed to use template. Please try again.';
      setError(errorMsg);
      setIsPreparingTemplate(false);
      setLoadingTemplateId(null);
    }
  };

  const handleCloseEditor = () => {
    console.log('[Templates] Closing inline editor');
    setSelectedTemplate(null);
  };

  const handlePreview = (e, template) => {
    console.log(`[Templates] Preview button clicked for: ${template.name}`);
    e.stopPropagation();
    setPreview(template);
  };

  // If editor is open, show it fullscreen
  if (selectedTemplate) {
    return <InlineVideoEditor template={selectedTemplate} onClose={handleCloseEditor} />;
  }

  return (
    <div className="templates-page modern">
      <header className="tp-header">
        <div className="tp-hero">
          <div className="tp-hero-left">
            <h1>Create stunning videos from templates</h1>
            <p className="subtitle">Professionally-designed templates for every use — social, promo, events and more.</p>

            <nav className="category-tabs" role="tablist" aria-label="Template categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={category === cat}
                  className={`tab ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          
        </div>
      </header>

      <main className="tp-main">
        <div className="search-row">
          <div className="search-input-wrap">
            <FiSearch className="search-icon" />
            <input
              aria-label="Search templates"
              className="search-input"
              placeholder="Search templates, categories or keywords"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="cta-actions">
            <button className="btn-outline" onClick={() => { setQuery(''); setCategory('All'); console.log('[Templates] Reset filters'); }}>Reset</button>
            <button className="btn-primary" onClick={() => { console.log('[Templates] Start from scratch clicked'); navigate('/upload'); }}>Start from scratch</button>
          </div>
        </div>

        {error && (
          <div className="error-banner" role="alert" style={{ 
            padding: '12px 16px',
            marginBottom: '16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#c33',
          }}>
            <FiAlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <section className="grid-wrap">
          {filtered.length === 0 ? (
            <div className="no-results-card">
              <h3>No templates match your search</h3>
              <p>Try different keywords or clear filters.</p>
              <button className="btn-primary" onClick={() => { setQuery(''); setCategory('All'); console.log('[Templates] Show all templates'); }}>Show all templates</button>
            </div>
          ) : (
            <div className="templates-grid">
              {filtered.map(t => (
                <article key={t.id} className="template-card" aria-label={t.name} onClick={() => onUse(t)}>
                  <div className="media-wrap">
                    {t.video ? (
                      <video src={t.video} alt={t.name} className="thumb" muted autoPlay loop />
                    ) : (
                      <div className="thumb-fallback">{t.name.charAt(0)}</div>
                    )}

                    {t.type === 'premium' && (
                      <div className="lock-overlay" title="Premium template"><FiLock /></div>
                    )}

                    <button className="preview-circle" onClick={(e) => handlePreview(e, t)} aria-label={`Preview ${t.name}`}>
                      <FiPlay />
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="meta-row">
                      <div className="title">{t.name}</div>
                      <div className={`badge ${t.type}`}>{t.type === 'free' ? 'Free' : 'Premium'}</div>
                    </div>
                    <div className="sub">{t.category} • {t.duration}</div>
                    <p className="desc">{t.description}</p>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="btn-ghost" 
                      onClick={(e) => handlePreview(e, t)}
                      disabled={loadingTemplateId === t.id}
                    >
                      <FiPlay /> Preview
                    </button>
                    <button 
                      className={`btn-cta ${t.type === 'premium' ? 'locked' : ''} ${loadingTemplateId === t.id ? 'loading' : ''}`} 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUse(t);
                      }}
                      disabled={loadingTemplateId === t.id}
                      aria-busy={loadingTemplateId === t.id}
                    >
                      {loadingTemplateId === t.id ? (
                        <>
                          <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⚙️</span> Loading...
                        </>
                      ) : (
                        <>
                          <FiDownload /> {t.type === 'premium' ? 'Upgrade' : 'Use template'}
                        </>
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {preview && (
        <div className="preview-modal" role="dialog" aria-modal="true" onClick={() => { console.log('[Templates] Preview modal closed'); setPreview(null); }}>
          <div className="preview-card" onClick={e => e.stopPropagation()}>
            <header>
              <h3>{preview.name}</h3>
              <button className="close" onClick={() => { console.log('[Templates] Preview modal closed via close button'); setPreview(null); }} title="Cancel">✕</button>
            </header>
            <div className="preview-content">
              {preview.video ? <video src={preview.video} alt={preview.name} controls autoPlay muted loop playsInline /> : <div className="preview-fallback">No preview</div>}
              <div className="preview-meta">
                <p><strong>Template:</strong> {preview.name}</p>
                <p><strong>Category:</strong> {preview.category}</p>
                <p><strong>Duration:</strong> {preview.duration}</p>
                <p>{preview.description}</p>
              </div>
            </div>
            <footer>
              <button className="btn-ghost" onClick={() => { console.log('[Templates] Preview modal closed via close'); setPreview(null); }}>Close</button>
              <button 
                className="btn-primary" 
                onClick={() => { 
                  console.log(`[Templates] Use template from preview modal: ${preview.id}`);
                  setPreview(null); 
                  onUse(preview); 
                }}
                disabled={loadingTemplateId === preview.id}
                aria-busy={loadingTemplateId === preview.id}
              >
                {loadingTemplateId === preview.id ? 'Loading...' : (preview.type === 'premium' ? 'Upgrade' : 'Use Template')}
              </button>
            </footer>
          </div>
        </div>
      )}

      {isPreparingTemplate && (
        <div className="template-preparing-overlay" role="status" aria-live="polite">
          <div className="template-preparing-card">
            <div className="template-preparing-spinner" />
            <p>Preparing your template...</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

