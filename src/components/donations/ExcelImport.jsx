import { useState } from 'react';
import * as XLSX from 'xlsx';

// Maps Excel column names → your data model fields
// Adjust these to match your actual Excel column headers
const COLUMN_MAP = {
  'Donor Name':  'donorName',
  'Name':        'donorName',
  'Amount':      'amount',
  'Amount (₹)':  'amount',
  'Mode':        'mode',
  'Payment Mode':'mode',
  'Date':        'date',
  'Purpose':     'purpose',
  'Note':        'purpose',
};

export default function ExcelImport({ onClose, onImport }) {
  const [preview, setPreview] = useState([]);
  const [fileName, setFileName] = useState('');
  const [error, setError]     = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setError('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb   = XLSX.read(evt.target.result, { type: 'binary', cellDates: true });
        const ws   = wb.Sheets[wb.SheetNames[0]];        // take first sheet
        const rows = XLSX.utils.sheet_to_json(ws);

        const mapped = rows.map((row, i) => {
          const record = { id: `xl-${i}` };
          Object.entries(row).forEach(([col, val]) => {
            const field = COLUMN_MAP[col.trim()];
            if (field) record[field] = field === 'amount' ? Number(val) : String(val);
          });
          return record;
        }).filter(r => r.donorName && r.amount);         // drop empty rows

        if (!mapped.length) {
          setError('No valid rows found. Check that your columns match: Donor Name, Amount, Mode, Date.');
          return;
        }
        setPreview(mapped);
      } catch {
        setError('Could not read file. Make sure it is a valid .xlsx file.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirm = () => {
    onImport(preview);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Import from Excel</h3>

        <div className="drop-zone" onClick={() => document.getElementById('xl-file').click()}>
          <p>Click to upload <strong>.xlsx</strong> or <strong>.xls</strong></p>
          <p className="hint">Required columns: Donor Name, Amount, Mode, Date</p>
          {fileName && <p className="file-name">{fileName}</p>}
        </div>
        <input id="xl-file" type="file" accept=".xlsx,.xls" onChange={handleFile} style={{ display:'none' }} />

        {error && <p className="error-msg">{error}</p>}

        {preview.length > 0 && (
          <div className="preview-wrap">
            <p className="preview-count">{preview.length} records ready to import</p>
            <div className="table-wrap" style={{ maxHeight: 160, overflowY: 'auto' }}>
              <table>
                <thead><tr><th>Donor</th><th>Amount</th><th>Mode</th><th>Date</th></tr></thead>
                <tbody>
                  {preview.slice(0, 5).map((r, i) => (
                    <tr key={i}>
                      <td>{r.donorName}</td>
                      <td>₹{Number(r.amount).toLocaleString('en-IN')}</td>
                      <td>{r.mode}</td>
                      <td>{r.date}</td>
                    </tr>
                  ))}
                  {preview.length > 5 && <tr><td colSpan="4" className="muted">...and {preview.length - 5} more</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleConfirm} disabled={!preview.length}>
            Import {preview.length > 0 ? `${preview.length} records` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}