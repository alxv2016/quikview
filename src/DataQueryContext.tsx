import {ReactNode, createContext, useState} from 'react';
import {Successcriterion} from './data/wcag.interface';

interface DataQuery {
  dataQuery: Successcriterion | null;
  setDataQuery: (value: Successcriterion | null) => void;
}

const DataQueryContext = createContext<DataQuery | null>(null);

function DataQueryContextProvider({children}: {children: ReactNode}) {
  const [dataQuery, setDataQuery] = useState<Successcriterion | null>(null);

  return <DataQueryContext.Provider value={{dataQuery, setDataQuery}}>{children}</DataQueryContext.Provider>;
}

export {DataQueryContext, DataQueryContextProvider};
