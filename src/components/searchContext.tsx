import {ReactNode, createContext, useContext, useState} from 'react';
import {Successcriterion} from '../data/wcag.interface';

export const SearchContext = createContext<Successcriterion | null>(null);

export function useSearchContext() {
  const userResult = useContext(SearchContext);
  if (!userResult) {
    return 'No results selected';
  }
  return userResult;
}
