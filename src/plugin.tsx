import {useEffect, useState} from 'react';
import {Wcag22} from './data/wcag.interface';
import wcagData from './data/wcag.json';

function Plugin() {
  window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');

  const [data, setData] = useState<Wcag22[]>(wcagData);
  console.log(data);

  return (
    <main>
      <img src={require('../assets/logo.svg')} />
      <h2>Rectangle Creator</h2>
    </main>
  );
}

export default Plugin;
