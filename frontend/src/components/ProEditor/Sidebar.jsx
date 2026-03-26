import React from 'react';
import {
  FiLayout,
  FiMusic,
  FiUpload,
  FiType,
  FiFilter,
  FiRepeat,
  FiZap,
} from 'react-icons/fi';

const toolItems = [
  { id: 'templates', label: 'Templates', icon: <FiLayout /> },
  { id: 'audio', label: 'Audio', icon: <FiMusic /> },
  { id: 'upload', label: 'Upload', icon: <FiUpload /> },
  { id: 'text', label: 'Text', icon: <FiType /> },
  { id: 'filters', label: 'Filters', icon: <FiFilter /> },
  { id: 'transitions', label: 'Transitions', icon: <FiRepeat /> },
  { id: 'effects', label: 'Effects', icon: <FiZap /> },
];

export const Sidebar = () => {
  const [activeTool, setActiveTool] = React.useState('templates');

  return (
    <aside className="pro-editor-sidebar glass-card" aria-label="Editor tools">
      {toolItems.map((tool) => (
        <button
          key={tool.id}
          type="button"
          className={`sidebar-icon-btn ${activeTool === tool.id ? 'active' : ''}`}
          title={tool.label}
          aria-label={tool.label}
          data-tooltip={tool.label}
          onClick={() => setActiveTool(tool.id)}
        >
          {tool.icon}
        </button>
      ))}
    </aside>
  );
};
