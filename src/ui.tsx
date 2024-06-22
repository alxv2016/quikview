import React from 'react';
import {createRoot} from 'react-dom/client';
import Plugin from './plugin';

const container = document.getElementById('react-root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Plugin />
  </React.StrictMode>
);
