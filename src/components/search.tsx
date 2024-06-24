import {useState, useEffect, useRef, useMemo} from 'react';
import Fuse from 'fuse.js';
import Input from '../components/input';
import {Guideline, Critiera, Successcriterion} from '../data/wcag.interface';

interface SearchProps {
  data: Successcriterion[];
  keys: any[];
}
function Search({data, keys}: SearchProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Successcriterion[] | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);

  // Setup fuse keywords
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: keys,
        threshold: 0.2,
      }),
    [data, keys]
  );

  console.log('fuse', results);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        if (results) {
          setActiveIndex((prevIndex) => (prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex));
        }
        break;
      case 'ArrowUp':
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          if (results) {
            setQuery(results[activeIndex].title);
            setResults(null);
          }
        }
        break;
      case 'Escape':
        setResults(null);
        break;
      default:
        break;
    }
  };

  const handleResultClick = (result: Critiera) => {
    setQuery(result.title);
    setResults(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  return (
    <div>
      <Input
        ref={searchInputRef}
        id="search-input"
        value={query}
        search
        onChange={handleInputChange}
        // onFocus={() => setIsFocused(true)}
        // onKeyDown={handleKeyDown}
        // onBlur={handleBlur}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
      ></Input>
      {/* {isFocused && results!.length > 0 && (
        <ul id="autocomplete-list" role="listbox" ref={resultsRef}>
          {results!.map((result, index) => (
            <li
              key={index}
              id={`result-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              onClick={() => handleResultClick(result)}
              onMouseDown={(e) => e.preventDefault()}
              className={activeIndex === index ? 'active' : ''}
            >
              <strong>{result.title}</strong> - {result.description}
              <small>Tags: {result.guidelines.map(tag => `${tag.title} (${tag.description})`)}</small>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Search;
