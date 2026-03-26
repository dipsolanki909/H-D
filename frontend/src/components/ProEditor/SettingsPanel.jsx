import React, { useState } from 'react';

const filters = [
  { id: 'none', label: 'Original' },
  { id: 'bw', label: 'Black & White' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'cinematic', label: 'Cinematic' },
];

const effects = [
  { id: 'none', label: 'None' },
  { id: 'blur', label: 'Blur' },
  { id: 'zoom', label: 'Zoom' },
  { id: 'glitch', label: 'Glitch' },
];

export const SettingsPanel = ({ visualFx, onVisualFxChange }) => {
  const [selectedElement, setSelectedElement] = useState('text');
  const [fontFamily, setFontFamily] = useState('Poppins');
  const [fontSize, setFontSize] = useState(36);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [textAnimation, setTextAnimation] = useState('fade');
  const [trimRange, setTrimRange] = useState(25);
  const [speed, setSpeed] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  return (
    <aside className="pro-editor-settings glass-card" aria-label="Settings panel">
      <div className="settings-header-row">
        <h2>Settings</h2>
        <div className="element-selector" role="tablist" aria-label="Selected element">
          <button
            type="button"
            className={selectedElement === 'text' ? 'active' : ''}
            onClick={() => setSelectedElement('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={selectedElement === 'video' ? 'active' : ''}
            onClick={() => setSelectedElement('video')}
          >
            Video
          </button>
        </div>
      </div>

      <div className="settings-content-anim" key={selectedElement}>
        {selectedElement === 'text' ? (
          <>
            <section className="settings-card">
              <h3>Typography</h3>
              <div className="settings-group">
                <label htmlFor="font-family">Font Family</label>
                <select
                  id="font-family"
                  value={fontFamily}
                  onChange={(event) => setFontFamily(event.target.value)}
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Inter">Inter</option>
                </select>
              </div>
              <div className="settings-group">
                <label htmlFor="font-size">Font Size: {fontSize}px</label>
                <input
                  id="font-size"
                  type="range"
                  min="12"
                  max="96"
                  value={fontSize}
                  onChange={(event) => setFontSize(Number(event.target.value))}
                />
              </div>
            </section>

            <section className="settings-card">
              <h3>Style & Motion</h3>
              <div className="settings-group">
                <label htmlFor="font-color">Text Color</label>
                <input
                  id="font-color"
                  type="color"
                  value={fontColor}
                  onChange={(event) => setFontColor(event.target.value)}
                />
              </div>
              <div className="settings-group">
                <label htmlFor="text-animation">Animation</label>
                <select
                  id="text-animation"
                  value={textAnimation}
                  onChange={(event) => setTextAnimation(event.target.value)}
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                </select>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="settings-card">
              <h3>Playback</h3>
              <div className="settings-group">
                <label htmlFor="trim-control">Trim: {trimRange}%</label>
                <input
                  id="trim-control"
                  type="range"
                  min="0"
                  max="100"
                  value={trimRange}
                  onChange={(event) => setTrimRange(Number(event.target.value))}
                />
              </div>
              <div className="settings-group">
                <label htmlFor="speed-control">Speed: {speed.toFixed(2)}x</label>
                <input
                  id="speed-control"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                />
              </div>
            </section>

            <section className="settings-card">
              <h3>Corrections</h3>
              <div className="settings-group">
                <label htmlFor="brightness-control">Brightness: {brightness}%</label>
                <input
                  id="brightness-control"
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(event) => setBrightness(Number(event.target.value))}
                />
              </div>
              <div className="settings-group">
                <label htmlFor="contrast-control">Contrast: {contrast}%</label>
                <input
                  id="contrast-control"
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(event) => setContrast(Number(event.target.value))}
                />
              </div>
            </section>

            <section className="settings-card">
              <h3>Filters</h3>
              <div className="fx-thumb-grid">
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`fx-thumb filter-${item.id} ${visualFx.filter === item.id ? 'active' : ''}`}
                    onClick={() => onVisualFxChange((prev) => ({ ...prev, filter: item.id }))}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="settings-card">
              <h3>Effects</h3>
              <div className="fx-thumb-grid">
                {effects.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`fx-thumb effect-${item.id} ${visualFx.effect === item.id ? 'active' : ''}`}
                    onClick={() => onVisualFxChange((prev) => ({ ...prev, effect: item.id }))}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </aside>
  );
};
