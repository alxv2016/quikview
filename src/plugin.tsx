import {useContext, useEffect, useState} from 'react';
import {Successcriterion} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import Search from './components/search';
import SearchContextProvider, {SearchContext} from './components/searchContext';
import Announcer from './components/announcer';
import {extractSuccessCriteria} from './utils';

export default function Plugin() {
  // window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  // parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');
  console.log('App component rendered');
  const successCriteriaDataset = extractSuccessCriteria(wcagData);

  const keys = ['ref_id', 'tags', 'title', 'level'];
  const [data, setData] = useState<Successcriterion[]>(successCriteriaDataset);
  const [announcement, setAnnouncement] = useState('');

  const handleResultsChange = (results: Successcriterion[] | null) => {
    if (results) {
      setAnnouncement(`Found ${results.length} results`);
      if (results.length === 0) {
        setAnnouncement('No results found');
      }
    }
  };

  return (
    <SearchContextProvider>
      <Announcer message={announcement}></Announcer>
      <main>
        <Search
          data={data}
          keys={keys}
          placeholder="Search for a success criterion"
          onResultsChange={handleResultsChange}
        />
      </main>
    </SearchContextProvider>
  );
}
