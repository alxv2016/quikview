import {useState, useEffect, useRef} from 'react';
import Fuse from 'fuse.js';
import Input from '../components/input';
import {Guideline, Wcag22} from '../data/wcag.interface';

interface SearchProps {
  data: Wcag22;
  keys: string[];
}
function Search({data, keys}: SearchProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Guideline[] | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);

  // Setup fuse keywords
  const fuse = new Fuse(data.guidelines, {
    keys: keys,
    includeScore: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (query) {
      const result = fuse.search(query).map(({item}) => item);
      setResults(result);
    } else {
      setResults(null);
    }
  }, [query, fuse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div>
      <Input
        ref={searchInputRef}
        id="test"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      ></Input>
    </div>
  );
}

export default Search;
