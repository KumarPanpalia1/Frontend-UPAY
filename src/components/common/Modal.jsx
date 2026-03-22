import React from 'react';\nexport default function Modal({open,children}){ if(!open)return null; return <div className='modal'>{children}</div>; }
