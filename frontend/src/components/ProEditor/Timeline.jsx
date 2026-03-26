import React, { useEffect, useMemo, useState } from 'react';

const PX_PER_SEC = 20;
const MIN_CLIP_DURATION = 2;

const DEFAULT_INITIAL_CLIPS = [
  { id: 'v1', track: 'video', start: 2, duration: 18, label: 'Main Footage' },
  { id: 'v2', track: 'video', start: 24, duration: 12, label: 'B-Roll' },
  { id: 'a1', track: 'audio', start: 0, duration: 40, label: 'Music Bed' },
  { id: 't1', track: 'text', start: 8, duration: 8, label: 'Intro Title' },
];

const trackRows = [
  { id: 'video', name: 'V1', title: 'Video' },
  { id: 'audio', name: 'A1', title: 'Audio' },
  { id: 'text', name: 'T1', title: 'Text' },
];

export const Timeline = ({ initialClips = [], initialUploadedAudioName = '' }) => {
  const [clips, setClips] = useState(
    Array.isArray(initialClips) && initialClips.length ? initialClips : DEFAULT_INITIAL_CLIPS
  );
  const [selectedClipId, setSelectedClipId] = useState(
    (Array.isArray(initialClips) && initialClips.length ? initialClips : DEFAULT_INITIAL_CLIPS)[0]?.id || null
  );
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [dragState, setDragState] = useState(null);
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const [uploadedAudioName, setUploadedAudioName] = useState(initialUploadedAudioName);

  useEffect(() => {
    if (!Array.isArray(initialClips) || !initialClips.length) return;
    setClips(initialClips);
    setSelectedClipId(initialClips[0]?.id || null);
    setPast([]);
    setFuture([]);
  }, [initialClips]);

  useEffect(() => {
    setUploadedAudioName(initialUploadedAudioName || '');
  }, [initialUploadedAudioName]);

  useEffect(() => {
    if (!selectedClipId || clips.some((clip) => clip.id === selectedClipId)) return;
    setSelectedClipId(clips[0]?.id || null);
  }, [clips, selectedClipId]);

  const selectedClip = clips.find((clip) => clip.id === selectedClipId) || null;
  const selectedAudioClip = selectedClip?.track === 'audio' ? selectedClip : null;

  const maxEnd = useMemo(
    () => clips.reduce((latest, clip) => Math.max(latest, clip.start + clip.duration), 0),
    [clips]
  );

  const timelineSeconds = Math.max(60, Math.ceil(maxEnd / 10) * 10);
  const timelineWidth = timelineSeconds * PX_PER_SEC;

  const waveformBars = useMemo(() => {
    const sourceName = uploadedAudio?.name || uploadedAudioName;
    if (!sourceName) return [];
    const seed = sourceName
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Array.from({ length: 48 }, (_, index) => {
      const value = (Math.sin((seed + index) * 0.45) + 1) / 2;
      return Math.max(12, Math.round(value * 100));
    });
  }, [uploadedAudio, uploadedAudioName]);

  const commitClips = (nextClips) => {
    setPast((prev) => [...prev, clips]);
    setFuture([]);
    setClips(nextClips);
  };

  const onAudioUpload = (event) => {
    const incoming = event.target.files?.[0];
    if (!incoming || !incoming.type.startsWith('audio/')) return;
    setUploadedAudio(incoming);
    setUploadedAudioName(incoming.name);
  };

  const addAudioToTimeline = () => {
    if (!uploadedAudio && !uploadedAudioName) return;
    const id = `a-${Date.now()}`;
    const baseDuration = 24;
    const labelSource = uploadedAudio?.name || uploadedAudioName || 'Template Music';
    const next = [
      ...clips,
      {
        id,
        track: 'audio',
        start: Math.max(0, maxEnd - 8),
        duration: baseDuration,
        baseDuration,
        trimStart: 0,
        trimEnd: 100,
        volume: 100,
        label: labelSource.replace(/\.[^/.]+$/, ''),
      },
    ];
    commitClips(next);
    setSelectedClipId(id);
  };

  const updateSelectedAudio = (changes) => {
    if (!selectedAudioClip) return;
    const next = clips.map((clip) => {
      if (clip.id !== selectedAudioClip.id) return clip;
      const baseDuration = clip.baseDuration || clip.duration;
      const nextTrimStart =
        changes.trimStart !== undefined ? Number(changes.trimStart) : clip.trimStart ?? 0;
      const nextTrimEnd =
        changes.trimEnd !== undefined ? Number(changes.trimEnd) : clip.trimEnd ?? 100;
      const safeTrimStart = Math.min(nextTrimStart, nextTrimEnd - 5);
      const safeTrimEnd = Math.max(nextTrimEnd, safeTrimStart + 5);
      const trimmedDuration = Math.max(
        MIN_CLIP_DURATION,
        (baseDuration * (safeTrimEnd - safeTrimStart)) / 100
      );

      return {
        ...clip,
        ...changes,
        trimStart: safeTrimStart,
        trimEnd: safeTrimEnd,
        duration: Number(trimmedDuration.toFixed(2)),
        baseDuration,
      };
    });
    commitClips(next);
  };

  const updateClip = (clipId, updater, storeHistory = false) => {
    const next = clips.map((clip) => (clip.id === clipId ? updater(clip) : clip));
    if (storeHistory) {
      commitClips(next);
      return;
    }
    setClips(next);
  };

  const splitSelected = () => {
    const selected = clips.find((clip) => clip.id === selectedClipId);
    if (!selected || selected.duration < MIN_CLIP_DURATION * 2) return;

    const splitPoint = selected.start + selected.duration / 2;
    const firstDuration = splitPoint - selected.start;
    const secondDuration = selected.duration - firstDuration;
    const firstId = `${selected.id}-a-${Date.now()}`;
    const secondId = `${selected.id}-b-${Date.now()}`;

    const next = clips.flatMap((clip) => {
      if (clip.id !== selected.id) return [clip];
      return [
        { ...clip, id: firstId, duration: firstDuration, label: `${clip.label} (1)` },
        {
          ...clip,
          id: secondId,
          start: splitPoint,
          duration: secondDuration,
          label: `${clip.label} (2)`,
        },
      ];
    });

    commitClips(next);
    setSelectedClipId(secondId);
  };

  const deleteSelected = () => {
    if (!selectedClipId) return;
    const next = clips.filter((clip) => clip.id !== selectedClipId);
    commitClips(next);
    setSelectedClipId(next[0]?.id || null);
  };

  const undo = () => {
    if (!past.length) return;
    const previous = past[past.length - 1];
    setPast((prev) => prev.slice(0, -1));
    setFuture((prev) => [clips, ...prev]);
    setClips(previous);
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, clips]);
    setClips(next);
  };

  const onClipPointerDown = (event, clipId, mode) => {
    event.preventDefault();
    event.stopPropagation();
    const source = clips.find((clip) => clip.id === clipId);
    if (!source) return;
    setSelectedClipId(clipId);
    setDragState({
      clipId,
      mode,
      startX: event.clientX,
      originStart: source.start,
      originDuration: source.duration,
    });
  };

  useEffect(() => {
    if (!dragState) return undefined;

    const onMove = (event) => {
      const deltaSeconds = (event.clientX - dragState.startX) / PX_PER_SEC;

      updateClip(dragState.clipId, (clip) => {
        if (dragState.mode === 'move') {
          return {
            ...clip,
            start: Math.max(0, dragState.originStart + deltaSeconds),
          };
        }

        if (dragState.mode === 'resize-left') {
          const nextStart = Math.max(0, dragState.originStart + deltaSeconds);
          const end = dragState.originStart + dragState.originDuration;
          const nextDuration = Math.max(MIN_CLIP_DURATION, end - nextStart);
          return {
            ...clip,
            start: end - nextDuration,
            duration: nextDuration,
          };
        }

        const nextDuration = Math.max(MIN_CLIP_DURATION, dragState.originDuration + deltaSeconds);
        return {
          ...clip,
          duration: nextDuration,
        };
      });
    };

    const onUp = () => {
      const snapshot = clips;
      const finalized = clips.map((clip) => {
        if (clip.id !== dragState.clipId) return clip;
        return {
          ...clip,
          start: Number(clip.start.toFixed(2)),
          duration: Number(clip.duration.toFixed(2)),
        };
      });
      setPast((prev) => [...prev, snapshot]);
      setFuture([]);
      setClips(finalized);
      setDragState(null);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [clips, dragState]);

  const marks = Array.from({ length: timelineSeconds / 5 + 1 }, (_, index) => index * 5);

  return (
    <section className="pro-editor-timeline glass-card" aria-label="Timeline section">
      <div className="timeline-controls-row">
        <button type="button" onClick={splitSelected} disabled={!selectedClipId}>
          Split
        </button>
        <button type="button" onClick={deleteSelected} disabled={!selectedClipId}>
          Delete
        </button>
        <button type="button" onClick={undo} disabled={!past.length}>
          Undo
        </button>
        <button type="button" onClick={redo} disabled={!future.length}>
          Redo
        </button>
      </div>

      <div className="timeline-audio-panel">
        <div className="audio-upload-group">
          <label htmlFor="audio-upload">Upload music</label>
          <input id="audio-upload" type="file" accept="audio/*" onChange={onAudioUpload} />
          <button type="button" onClick={addAudioToTimeline} disabled={!uploadedAudio && !uploadedAudioName}>
            Add to Timeline
          </button>
        </div>

        <div className="audio-waveform-preview" aria-label="Waveform preview">
          {(uploadedAudio || uploadedAudioName) ? (
            <>
              <span className="audio-name">{uploadedAudio?.name || uploadedAudioName}</span>
              <div className="waveform-bars">
                {waveformBars.map((height, index) => (
                  <i key={`${uploadedAudio?.name || uploadedAudioName}-${index}`} style={{ height: `${height}%` }} />
                ))}
              </div>
            </>
          ) : (
            <span className="audio-empty">Upload an audio file to preview waveform</span>
          )}
        </div>

        <div className="audio-edit-group">
          <label htmlFor="audio-trim-start">
            Trim Start: {Math.round(selectedAudioClip?.trimStart ?? 0)}%
          </label>
          <input
            id="audio-trim-start"
            type="range"
            min="0"
            max="95"
            value={selectedAudioClip?.trimStart ?? 0}
            disabled={!selectedAudioClip}
            onChange={(event) => updateSelectedAudio({ trimStart: Number(event.target.value) })}
          />
          <label htmlFor="audio-trim-end">
            Trim End: {Math.round(selectedAudioClip?.trimEnd ?? 100)}%
          </label>
          <input
            id="audio-trim-end"
            type="range"
            min="5"
            max="100"
            value={selectedAudioClip?.trimEnd ?? 100}
            disabled={!selectedAudioClip}
            onChange={(event) => updateSelectedAudio({ trimEnd: Number(event.target.value) })}
          />
          <label htmlFor="audio-volume">
            Volume: {Math.round(selectedAudioClip?.volume ?? 100)}%
          </label>
          <input
            id="audio-volume"
            type="range"
            min="0"
            max="200"
            value={selectedAudioClip?.volume ?? 100}
            disabled={!selectedAudioClip}
            onChange={(event) => updateSelectedAudio({ volume: Number(event.target.value) })}
          />
        </div>
      </div>

      <div className="timeline-scroll-wrap">
        <div className="timeline-scroll-inner" style={{ width: `${timelineWidth}px` }}>
          <div className="timeline-ruler">
            {marks.map((second) => (
              <span key={second} style={{ left: `${second * PX_PER_SEC}px` }}>
                {String(Math.floor(second / 60)).padStart(2, '0')}:{String(second % 60).padStart(2, '0')}
              </span>
            ))}
          </div>

          <div className="timeline-tracks">
            {trackRows.map((track) => (
              <div className="track-row" key={track.id}>
                <strong title={track.title}>{track.name}</strong>
                <div className="track-content">
                  {clips
                    .filter((clip) => clip.track === track.id)
                    .map((clip) => (
                      <div
                        key={clip.id}
                        className={`timeline-clip clip-${clip.track} ${selectedClipId === clip.id ? 'selected' : ''} ${
                          dragState?.clipId === clip.id ? 'dragging' : ''
                        }`}
                        style={{
                          left: `${clip.start * PX_PER_SEC}px`,
                          width: `${clip.duration * PX_PER_SEC}px`,
                        }}
                        onMouseDown={(event) => onClipPointerDown(event, clip.id, 'move')}
                        onClick={() => setSelectedClipId(clip.id)}
                      >
                        <span className="resize-handle left" onMouseDown={(event) => onClipPointerDown(event, clip.id, 'resize-left')} />
                        <span className="clip-label">{clip.label}</span>
                        {clip.track === 'audio' && (
                          <span className="clip-waveform" aria-hidden="true">
                            {Array.from({ length: 16 }, (_, index) => {
                              const height =
                                25 + Math.round(((Math.sin((clip.start + index) * 0.9) + 1) / 2) * 75);
                              return <i key={`${clip.id}-wave-${index}`} style={{ height: `${height}%` }} />;
                            })}
                          </span>
                        )}
                        <span className="resize-handle right" onMouseDown={(event) => onClipPointerDown(event, clip.id, 'resize-right')} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
