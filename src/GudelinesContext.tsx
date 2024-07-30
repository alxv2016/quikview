import {ReactNode, createContext, useState} from 'react';
import {Criterion} from './data/wcag.interface';

interface Guideline {
  guidelines: Criterion | null;
  setGuidelines: (value: Criterion | null) => void;
}

const GuidelinesContext = createContext<Guideline | null>(null);

function GuidelinesContextProvider({children}: {children: ReactNode}) {
  const [guidelines, setGuidelines] = useState<Criterion | null>(null);

  return <GuidelinesContext.Provider value={{guidelines, setGuidelines}}>{children}</GuidelinesContext.Provider>;
}

export {GuidelinesContext, GuidelinesContextProvider};
