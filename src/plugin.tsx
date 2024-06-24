import {useEffect, useState} from 'react';
import {Critiera, Guideline, Successcriterion} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import Search from './components/search';
import Input from './components/input';

export default function Plugin() {
  // window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  // parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');

  function extractSuccessCriteria(wcagData: Critiera[]) {
    let result: Successcriterion[] = [];

    function traverse(node: any): void {
      if (Array.isArray(node)) {
        node.forEach((item) => traverse(item));
      } else if (typeof node === 'object' && node !== null) {
        if (node.hasOwnProperty('success_criteria')) {
          result = result.concat(node.success_criteria);
        }
        Object.values(node).forEach((value) => traverse(value));
      }
    }

    traverse(wcagData);
    return result;
  }

  function extractGuidelines(wcagData: Critiera[]): Guideline[] {
    let result: Guideline[] = [];

    function traverse(node: any): void {
      if (Array.isArray(node)) {
        node.forEach((item) => traverse(item));
      } else if (typeof node === 'object' && node !== null) {
        if (node.hasOwnProperty('guidelines')) {
          result = result.concat(
            node.guidelines.map((guideline: Guideline) => {
              const {success_criteria, ...rest} = guideline;
              return rest;
            })
          );
        }
        Object.values(node).forEach((value) => traverse(value));
      }
    }

    traverse(wcagData);
    return result;
  }

  // const guideLines = extractGuidelines(wcagData);
  const successCriteriaDataset = extractSuccessCriteria(wcagData);
  //const mergedCriteria = [...guideLines, successCriteria].flat() as Successcriterion[];

  const [data, setData] = useState<Successcriterion[]>(successCriteriaDataset);
  const keys = ['ref_id', 'tags', 'title', 'level'];

  console.log(data);

  return (
    <main>
      <Search data={data} keys={keys} />
    </main>
  );
}
