import React from 'react';
import {createRoot} from 'react-dom/client';
import Plugin from './plugin';
import './ui.scss';
import {DataQueryContextProvider} from './DataQueryContext';
import {GuidelinesContextProvider} from './GudelinesContext';

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
