import React, { useEffect, useState } from 'react';
import { getTemplates, addTemplate, updateTemplate, deleteTemplate } from '../../api/dataService';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import '../../components/Admin/Admin.css';

export const AdminTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [urlValid, setUrlValid] = useState(null);
  const [urlMessage, setUrlMessage] = useState('');

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

  return (
    <AdminLayout>
      <div className="admin-section">
        <h2>Templates Management</h2>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div></div>
          <button className="btn-ghost" onClick={openAdd}><FiPlus/> Add Template</button>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr><th>Name</th><th>Category</th><th>Duration</th><th>Type</th><th>Featured</th><th>Preview</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {templates.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.category}</td>
                  <td>{t.duration}</td>
                  <td>{t.type}</td>
                  <td>{t.featured ? 'Yes' : '—'}</td>
                  <td>{t.image ? <img src={t.image} alt="preview" style={{width:80}}/> : '—'}</td>
                  <td>
                    <button className="btn-ghost" onClick={() => openEdit(t)}><FiEdit/></button>
                    <button className="btn-danger" onClick={() => handleDelete(t.id)}><FiTrash/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="modal-backdrop" onClick={() => setShowForm(false)}>
            <div className="modal" onClick={(e)=>e.stopPropagation()}>
              <h3>{editing ? 'Edit Template' : 'Add Template'}</h3>
              <form onSubmit={handleSubmit}>
                <label>Name<input name="name" defaultValue={editing?.name || ''} required/></label>
                <label>Category<input name="category" defaultValue={editing?.category || ''} required/></label>
                <label>Duration<input name="duration" defaultValue={editing?.duration || ''} required/></label>
                <label>Type<select name="type" defaultValue={editing?.type || 'free'}><option value="free">free</option><option value="premium">premium</option></select></label>
                <label style={{display:'flex',alignItems:'center',gap:12}}>
                  <span>Featured</span>
                  <input type="checkbox" name="featured" defaultChecked={!!editing?.featured} />
                </label>

                <label>Preview Image URL
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <input name="image" defaultValue={editing?.image || ''} style={{flex:1}} />
                    <button type="button" className="btn-ghost" onClick={() => {
                      const url = document.querySelector('.modal input[name=image]').value;
                      if (!url) return setUrlMessage('Enter an image URL to validate');
                      const img = new Image();
                      img.crossOrigin = 'Anonymous';
                      img.onload = () => { setUrlValid(true); setUrlMessage('URL looks valid'); };
                      img.onerror = () => { setUrlValid(false); setUrlMessage('Could not load image from URL'); };
                      img.src = url;
                    }}>Validate URL</button>
                  </div>
                  {urlValid === true && <div style={{color:'green',fontSize:12}}>{urlMessage}</div>}
                  {urlValid === false && <div style={{color:'red',fontSize:12}}>{urlMessage}</div>}
                </label>

                <label>Or upload thumbnail file (jpg/png)
                  <input type="file" name="thumbnail" accept="image/*" />
                </label>

                <label>Description<textarea name="description" defaultValue={editing?.description || ''}></textarea></label>
                <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
                  <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
