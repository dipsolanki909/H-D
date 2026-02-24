import React, { useEffect, useMemo, useState } from 'react';
import { getTemplates, addTemplate, updateTemplate, deleteTemplate } from '../../api/dataService';
import { FiEdit, FiGrid, FiImage, FiStar, FiTrash, FiUploadCloud } from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import '../../components/Admin/Admin.css';

export const AdminTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [urlValid, setUrlValid] = useState(null);
  const [urlMessage, setUrlMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const openAdd = () => { setEditing(null); setShowForm(true); };
  const openEdit = (t) => { setEditing(t); setShowForm(true); };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this template?')) return;
    deleteTemplate(id);
    setTemplates(getTemplates());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // If a file was uploaded, convert to data URL and use it as image
    let imageValue = form.image.value || '';
    const file = form.thumbnail?.files?.[0];
    if (file) {
      imageValue = await new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = rej;
        fr.readAsDataURL(file);
      });
    }

    const data = {
      name: form.name.value,
      category: form.category.value,
      duration: form.duration.value,
      type: form.type.value,
      featured: !!form.featured?.checked,
      image: imageValue,
      description: form.description.value,
      usageCount: Number(form.usageCount?.value || 0),
      createdAt: editing?.createdAt || new Date().toISOString(),
    };
    if (editing) {
      updateTemplate(editing.id, data);
    } else {
      addTemplate(data);
    }
    setTemplates(getTemplates());
    setShowForm(false);
    setUrlValid(null);
    setUrlMessage('');
  };

  const normalizedTemplates = useMemo(() => {
    return templates.map((template, index) => ({
      ...template,
      usageCount: Number(template.usageCount ?? (index + 2) * 47),
      createdAt: template.createdAt || new Date(Date.now() - index * 86400000).toISOString(),
    }));
  }, [templates]);

  const categories = useMemo(() => {
    const unique = new Set(normalizedTemplates.map((item) => item.category).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [normalizedTemplates]);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'All') return normalizedTemplates;
    return normalizedTemplates.filter((item) => item.category === activeCategory);
  }, [activeCategory, normalizedTemplates]);

  const mostUsedTemplate = useMemo(() => {
    if (!normalizedTemplates.length) return null;
    return [...normalizedTemplates].sort((a, b) => b.usageCount - a.usageCount)[0];
  }, [normalizedTemplates]);

  const recentlyAdded = normalizedTemplates.length ? normalizedTemplates[0] : null;

  return (
    <AdminLayout>
      <section className="admin-template-page">
        <header className="admin-template-header">
          <div>
            <h1>Template Management</h1>
            <p>Curate the template library and track usage across categories.</p>
          </div>
          <button className="admin-template-upload" onClick={openAdd}>
            <FiUploadCloud /> Upload New Template
          </button>
        </header>

        <div className="admin-template-analytics">
          <div>
            <span><FiStar /> Most used template</span>
            <strong>{mostUsedTemplate?.name || '—'}</strong>
          </div>
          <div>
            <span><FiImage /> Recently added</span>
            <strong>{recentlyAdded?.name || '—'}</strong>
          </div>
          <div>
            <span><FiGrid /> Total templates</span>
            <strong>{normalizedTemplates.length}</strong>
          </div>
        </div>

        <div className="admin-template-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="admin-template-grid">
          {filteredTemplates.map((template) => (
            <article className="admin-template-card" key={template.id}>
              <div className="admin-template-preview">
                {template.image ? (
                  <img src={template.image} alt={template.name} />
                ) : (
                  <div className="admin-template-fallback">
                    <FiImage />
                  </div>
                )}
                {template.featured && <span className="admin-template-featured">Featured</span>}
              </div>

              <div className="admin-template-info">
                <h3>{template.name}</h3>
                <p>{template.description || 'No description provided.'}</p>
                <div className="admin-template-meta">
                  <span>{template.category}</span>
                  <span>{template.duration}</span>
                  <span>{template.type}</span>
                </div>
              </div>

              <div className="admin-template-footer">
                <div className="admin-template-usage">
                  Usage: <strong>{template.usageCount.toLocaleString()}</strong>
                </div>
                <div className="admin-template-actions">
                  <button type="button" className="btn-ghost" onClick={() => openEdit(template)}><FiEdit /> Edit</button>
                  <button type="button" className="btn-danger" onClick={() => handleDelete(template.id)}><FiTrash /> Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showForm && (
          <div className="modal-backdrop" onClick={() => setShowForm(false)}>
            <div className="modal" onClick={(e)=>e.stopPropagation()}>
              <h3>{editing ? 'Edit Template' : 'Add Template'}</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Template Name
                  <input name="name" placeholder="e.g., Cinematic Intro" defaultValue={editing?.name || ''} required />
                </label>

                <label>
                  Category
                  <input name="category" placeholder="e.g., YouTube, Instagram" defaultValue={editing?.category || ''} required />
                </label>

                <label>
                  Duration
                  <input name="duration" placeholder="e.g., 15s, 30s, 1m" defaultValue={editing?.duration || ''} required />
                </label>

                <label>
                  Template Type
                  <select name="type" defaultValue={editing?.type || 'free'}>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </label>

                <label>
                  Usage Count
                  <input name="usageCount" type="number" min="0" placeholder="0" defaultValue={editing?.usageCount || 0} />
                </label>

                <div className="modal-form-row">
                  <input type="checkbox" name="featured" id="featured-check" defaultChecked={!!editing?.featured} />
                  <label htmlFor="featured-check" style={{margin: 0, fontWeight: 500}}>
                    Mark as Featured
                  </label>
                </div>

                <div className="modal-image-section">
                  <div className="modal-image-subsection">
                    <label>Preview Image URL</label>
                    <div className="modal-url-validator">
                      <input 
                        name="image" 
                        placeholder="https://example.com/image.jpg" 
                        defaultValue={editing?.image || ''} 
                      />
                      <button 
                        type="button" 
                        className="btn-ghost" 
                        onClick={() => {
                          const url = document.querySelector('.modal input[name=image]').value;
                          if (!url) return setUrlMessage('Enter an image URL to validate');
                          const img = new Image();
                          img.crossOrigin = 'Anonymous';
                          img.onload = () => { setUrlValid(true); setUrlMessage('✓ URL is valid'); };
                          img.onerror = () => { setUrlValid(false); setUrlMessage('✗ Could not load image'); };
                          img.src = url;
                        }}
                      >
                        Validate
                      </button>
                    </div>
                    {urlValid === true && <div className="modal-validation-message success">{urlMessage}</div>}
                    {urlValid === false && <div className="modal-validation-message error">{urlMessage}</div>}
                  </div>

                  <div className="modal-image-subsection">
                    <label>Or Upload Thumbnail</label>
                    <label className="modal-file-input-label">
                      <span>JPG or PNG • Max 5MB</span>
                      <input type="file" name="thumbnail" accept="image/jpeg,image/png" />
                    </label>
                  </div>
                </div>

                <label className="full-width">
                  Description
                  <textarea 
                    name="description" 
                    placeholder="Write a brief description of this template..." 
                    defaultValue={editing?.description || ''}
                  ></textarea>
                </label>

                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editing ? 'Update Template' : 'Create Template'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};
