const fs = require('fs');

const files = [
  'src/services/excelParser.js',
  'src/components/expenses/ExpenseForm.jsx',
  'src/components/expenses/ApprovalBadge.jsx',
  'src/components/dashboard/RecentActivity.jsx',
  'src/components/dashboard/ChartPanel.jsx',
  'src/components/common/Sidebar.jsx',
  'src/components/common/Modal.jsx',
  'src/components/common/Loader.jsx',
  'src/components/common/Button.jsx',
  'src/components/donations/DonationForm.jsx',
  'src/services/donationService.js'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('\\n')) {
      content = content.replace(/\\n/g, '\n');
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed', file);
    }
  }
});
