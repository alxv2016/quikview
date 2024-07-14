import React from 'react';
import {createRoot} from 'react-dom/client';
import Plugin from './plugin';
import {DataQueryContextProvider} from './components/DataQueryContext';
import {GuidelinesContextProvider} from './components/GudelinesContext';
import './ui.scss';

const container = document.getElementById('react-root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DataQueryContextProvider>
      <GuidelinesContextProvider>
        <Plugin />
      </GuidelinesContextProvider>
    </DataQueryContextProvider>
  </React.StrictMode>
);
