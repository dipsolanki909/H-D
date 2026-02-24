import React from 'react';
import { FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';

const ProjectsSection = ({ projects, onEdit, onExport, onDelete }) => {
  return (
    <section className="cd-section" aria-label="My projects">
      <div className="cd-section-head">
        <h2>Recent Projects</h2>
      </div>

      <div className="cd-projects-grid">
        {projects.map((project) => (
          <article className="cd-project-card" key={project.id}>
            <div className="cd-project-thumb-wrap">
              <img src={project.thumbnail} alt={project.name} className="cd-project-thumb" loading="lazy" />
              <span className={`cd-project-status ${project.status.toLowerCase()}`}>{project.status}</span>
              <div className="cd-project-overlay">
                <button type="button" className="cd-btn cd-btn-primary" onClick={() => onEdit(project.id)}>
                  <FiEdit2 /> Continue Editing
                </button>
                <button type="button" className="cd-btn cd-btn-ghost" onClick={() => onExport(project.id)}>
                  <FiDownload /> Export
                </button>
                <button type="button" className="cd-btn cd-btn-danger" onClick={() => onDelete(project.id)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
            <div className="cd-project-body">
              <h3>{project.name}</h3>
              <p>Last edited: {project.lastEdited}</p>
              <div className="cd-project-meta">
                <span>{project.duration}</span>
                <span>{project.resolution}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
