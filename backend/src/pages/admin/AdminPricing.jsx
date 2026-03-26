import React, { useEffect, useState } from 'react';
import { getPricing, addPricing, updatePricing, deletePricing } from '../../api/dataService';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import '../../components/Admin/Admin.css';

export const AdminPricing = () => {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { setPlans(getPricing()); }, []);

  const openAdd = () => { setEditing(null); setShowForm(true); };
  const openEdit = (p) => { setEditing(p); setShowForm(true); };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this plan?')) return;
    deletePricing(id);
    setPlans(getPricing());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const plan = {
      name: form.name.value,
      price: Number(form.price.value),
      features: (form.features.value || '').split('\n').map(s => s.trim()).filter(Boolean),
    };
    if (editing) updatePricing(editing.id, plan); else addPricing(plan);
    setPlans(getPricing());
    setShowForm(false);
  };

  return (
    <div className="admin-section">
      <h2>Pricing Management</h2>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div></div>
        <button className="btn-ghost" onClick={openAdd}><FiPlus/> Add Plan</button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr><th>Plan</th><th>Price</th><th>Features</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {plans.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price === 0 ? 'Free' : `$${p.price}`}</td>
                <td>{(p.features || []).map((f,i)=><div key={i}>{f}</div>)}</td>
                <td>
                  <button className="btn-ghost" onClick={()=>openEdit(p)}><FiEdit/></button>
                  <button className="btn-danger" onClick={()=>handleDelete(p.id)}><FiTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-backdrop" onClick={()=>setShowForm(false)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h3>{editing? 'Edit Plan':'Add Plan'}</h3>
            <form onSubmit={handleSubmit}>
              <label>Name<input name="name" defaultValue={editing?.name||''} required/></label>
              <label>Price<input name="price" type="number" step="0.01" defaultValue={editing?.price||0} required/></label>
              <label>Features (one per line)<textarea name="features" defaultValue={(editing?.features||[]).join('\n')}></textarea></label>
              <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
                <button type="button" className="btn-ghost" onClick={()=>setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
