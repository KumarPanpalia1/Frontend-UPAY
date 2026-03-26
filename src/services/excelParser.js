import * as XLSX from 'xlsx';
export function parseExcel(file){ const reader = new FileReader(); return new Promise((resolve,reject)=>{ reader.onload = e=>{ const wb = XLSX.read(e.target.result,{type:'binary'}); const ws=wb.Sheets[wb.SheetNames[0]]; resolve(XLSX.utils.sheet_to_json(ws)); }; reader.onerror=reject; reader.readAsBinaryString(file); }); }
