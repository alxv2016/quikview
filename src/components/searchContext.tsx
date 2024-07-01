import {ReactNode, createContext, useContext, useState} from 'react';
import {Successcriterion} from '../data/wcag.interface';

export const SearchContext = createContext<{
  userResult: Successcriterion | null;
  setUserResult: (value: Successcriterion | null) => void;
} | null>(null);

export function SearchContextProvider({children}: {children: ReactNode}) {
  const [userResult, setUserResult] = useState<Successcriterion | null>(null);

  return <SearchContext.Provider value={{userResult, setUserResult}}>{children}</SearchContext.Provider>;
}

export default SearchContextProvider;
