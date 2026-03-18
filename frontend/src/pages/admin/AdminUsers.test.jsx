import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AdminUsers } from './AdminUsers';
import jsPDF from 'jspdf';

jest.mock('jspdf');

describe('AdminUsers', () => {
  it('should call handleExportPDF when "Export user list" button is clicked', () => {
    render(
      <MemoryRouter>
        <AdminUsers />
      </MemoryRouter>
    );
    
    const exportButton = screen.getByText('Export user list');
    fireEvent.click(exportButton);
    
    expect(jsPDF).toHaveBeenCalled();
    const JSPDF_INSTANCE = jsPDF.mock.instances[0];
    expect(JSPDF_INSTANCE.save).toHaveBeenCalledWith('admin-users.pdf');
  });
});
