import React from 'react';
import { FiDownload } from 'react-icons/fi';

const ExportsSection = ({ exportsList, onDownload }) => {
  return (
    <section className="cd-section" aria-label="Recent exports">
      <div className="cd-section-head">
        <h2>Recent Exports</h2>
      </div>

      <div className="cd-exports-wrap">
        <table className="cd-exports-table">
          <thead>
            <tr>
              <th>Resolution</th>
              <th>File Size</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exportsList.map((item) => (
              <tr key={item.id}>
                <td>{item.resolution}</td>
                <td>{item.fileSize}</td>
                <td>
                  <span className={`cd-status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="cd-btn cd-btn-ghost"
                    disabled={item.status !== 'Completed'}
                    onClick={() => onDownload(item.id)}
                  >
                    <FiDownload /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ExportsSection;
