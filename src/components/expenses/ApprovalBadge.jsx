import React from 'react';
export default function ApprovalBadge({approved}){ return <span>{approved ? 'Approved' : 'Pending'}</span>; }
