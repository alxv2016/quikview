import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import Plugin from './plugin';
import './ui.scss';
import Announcer from './components/announcer';

const container = document.getElementById('react-root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Plugin />
  </React.StrictMode>
);
