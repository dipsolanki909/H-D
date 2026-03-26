import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/ProEditor/Navbar';
import { Sidebar } from '../components/ProEditor/Sidebar';
import { VideoCanvas } from '../components/ProEditor/VideoCanvas';
import { SettingsPanel } from '../components/ProEditor/SettingsPanel';
import { Timeline } from '../components/ProEditor/Timeline';
import '../components/ProEditor/ProEditorLayout.css';

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

const normalizeEditorPreset = (state) => {
  const preset = state?.editorPreset;
  if (preset && Array.isArray(preset.timelineClips) && preset.timelineClips.length) {
    return {
      templateName: preset.templateName || state?.templateName || 'Template Project',
      videoUrl: preset.videoUrl || state?.templateData?.video || '',
      textOverlays: Array.isArray(preset.textOverlays) ? preset.textOverlays : [],
      musicName: preset.music?.name || 'Template Music',
      timelineClips: preset.timelineClips,
    };
  }

  if (state?.templateData) {
    const template = state.templateData;
    const duration = parseDurationToSeconds(template.duration);

    return {
      templateName: template.name || state?.templateName || 'Template Project',
      videoUrl: template.video || '',
      textOverlays: [
        {
          id: `${template.id}-text-title`,
          text: template.name || 'Template Title',
          x: 60,
          y: 46,
          fontSize: 34,
          fontFamily: 'Poppins',
          color: '#ffffff',
          animation: 'fade',
          width: 260,
          height: 72,
          start: 1,
          duration: Math.min(8, duration),
          label: 'Title',
        },
      ],
      musicName: `${template.name || 'Template'} Music`,
      timelineClips: [
        {
          id: `${template.id}-video-1`,
          track: 'video',
          start: 0,
          duration,
          label: template.name || 'Template Clip',
        },
        {
          id: `${template.id}-text-1`,
          track: 'text',
          start: 1,
          duration: Math.min(8, duration),
          label: template.name || 'Title',
        },
        {
          id: `${template.id}-audio-1`,
          track: 'audio',
          start: 0,
          duration,
          baseDuration: duration,
          trimStart: 0,
          trimEnd: 100,
          volume: 100,
          label: `${template.name || 'Template'} Music`,
        },
      ],
    };
  }

  return {
    templateName: 'Untitled Project',
    videoUrl: '',
    textOverlays: [],
    musicName: '',
    timelineClips: [],
  };
};

export const ProfessionalVideoEditor = () => {
  const location = useLocation();
  const [visualFx, setVisualFx] = React.useState({
    filter: 'none',
    effect: 'none',
  });
  const [exportResolution, setExportResolution] = React.useState('1080p');
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportProgress, setExportProgress] = React.useState(0);
  const [exportSuccess, setExportSuccess] = React.useState('');

  const exportTimerRef = React.useRef(null);
  const successTimerRef = React.useRef(null);

  const incomingTemplate = React.useMemo(
    () => normalizeEditorPreset(location.state),
    [location.state]
  );

  React.useEffect(() => {
    return () => {
      if (exportTimerRef.current) window.clearInterval(exportTimerRef.current);
      if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
    };
  }, []);

  const startExport = () => {
    if (isExporting) return;

    if (exportTimerRef.current) window.clearInterval(exportTimerRef.current);
    if (successTimerRef.current) window.clearTimeout(successTimerRef.current);

    setExportSuccess('');
    setIsExporting(true);
    setExportProgress(0);

    exportTimerRef.current = window.setInterval(() => {
      setExportProgress((prev) => {
        const next = Math.min(100, prev + 10);
        if (next >= 100) {
          window.clearInterval(exportTimerRef.current);
          exportTimerRef.current = null;
          setIsExporting(false);
          setExportSuccess(`Export complete: project_${exportResolution}.mp4`);
          successTimerRef.current = window.setTimeout(() => setExportSuccess(''), 3500);
        }
        return next;
      });
    }, 260);
  };

  return (
    <div className="pro-editor-page">
      <Navbar
        exportResolution={exportResolution}
        onResolutionChange={setExportResolution}
        isExporting={isExporting}
        exportProgress={exportProgress}
        exportSuccess={exportSuccess}
        onExport={startExport}
      />

      <main className="pro-editor-main-grid">
        <Sidebar />
        <VideoCanvas
          visualFx={visualFx}
          initialVideoUrl={incomingTemplate.videoUrl}
          initialTextOverlays={incomingTemplate.textOverlays}
        />
        <SettingsPanel visualFx={visualFx} onVisualFxChange={setVisualFx} />
      </main>

      <Timeline
        initialClips={incomingTemplate.timelineClips}
        initialUploadedAudioName={incomingTemplate.musicName}
      />
    </div>
  );
};
