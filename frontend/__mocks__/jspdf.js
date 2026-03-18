console.log('jspdf mock loaded');

const mockSave = jest.fn();
const mockAutoTable = jest.fn();
const mockAddImage = jest.fn();
const mockSetFontSize = jest.fn();
const mockText = jest.fn();

const jsPDF = jest.fn().mockImplementation(() => ({
  save: mockSave,
  autoTable: mockAutoTable,
  addImage: mockAddImage,
  setFontSize: mockSetFontSize,
  text: mockText,
}));

jsPDF.prototype.save = mockSave;
jsPDF.prototype.autoTable = mockAutoTable;
jsPDF.prototype.addImage = mockAddImage;
jsPDF.prototype.setFontSize = mockSetFontSize;
jsPDF.prototype.text = mockText;

module.exports = jsPDF;

