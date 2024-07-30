import {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Fuse from 'fuse.js';
import {Successcriterion} from './data/wcag.interface';
import {DataQueryContext} from './DataQueryContext';
import {GuidelinesContext} from './GudelinesContext';

function useFuse(data: Successcriterion[], keys: any[], threshold: number = 0.2) {
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: keys,
        threshold: threshold,
      }),
    [data, keys, threshold]
  );

  return fuse;
}

function useDebounce(value: string | null, delay: number): string | null {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const useDataQueryContext = () => {
  const context = useContext(DataQueryContext);
  if (!context) {
    throw new Error('DataQueryContext must be used within an DataQueryContextProvider');
  }
  return context;
};

const useGuidelinesContext = () => {
  const context = useContext(GuidelinesContext);
  if (!context) {
    throw new Error('GuidelinesContext must be used within an GuidelinesContextProvider');
  }
  return context;
};

export {useFuse, useDebounce, useDataQueryContext, useGuidelinesContext};
