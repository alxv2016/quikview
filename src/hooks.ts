import {useEffect, useMemo, useRef, useState} from 'react';
import Fuse from 'fuse.js';
import {Successcriterion} from './data/wcag.interface';

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

export {useFuse, useDebounce};
