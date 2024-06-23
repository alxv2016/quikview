import {useEffect, useState} from 'react';
import {Wcag22} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import Search from './components/search';
import Input from './components/input';

export default function Plugin() {
  // window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  // parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');

  const [data, setData] = useState<Wcag22[]>(wcagData);
  // console.log(data);
  const options = ['Canada'];
  // const localSource = {local: data}

  return <main></main>;
}
