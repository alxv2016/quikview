import {Fragment, useState, useEffect, useRef, useMemo} from 'react';
import Fuse from 'fuse.js';
import Input from '../components/input';
import {Successcriterion} from '../data/wcag.interface';
import './search.scss';

interface SearchProps {
  data: Successcriterion[];
  keys: any[];
  placeholder: string;
}
function Search({data, keys, placeholder}: SearchProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<Successcriterion[] | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Setup fuse keywords
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: keys,
        threshold: 0.2,
      }),
    [data, keys]
  );
  // debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      const result = fuse.search(debouncedQuery).map(({item}) => item);
      setResults(result);
    } else {
      setResults(null);
    }
  }, [debouncedQuery, fuse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Move the selection to the next item in the list
        // (prevIndex + 1) % results.length ensures that after the last item, it wraps back to the first item
        if (results && results.length > 0) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        // Move the selection to the previous item in the list
        // (prevIndex - 1 + results.length) % results.length ensures that before the first item, it wraps back to the last item
        if (results && results.length > 0) {
          setActiveIndex((prevIndex) => (prevIndex - 1 + results.length) % results.length);
        }
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          e.preventDefault();
          setQuery(results[activeIndex].title);
          setActiveIndex(-1);
          // NOTE: should find a way to clear results and prevent Fuse to run another search
          // on selected keyboards, this doesn't prevent that and Fuse will still run a search to just be cleared.
          setTimeout(() => {
            setResults(null);
          }, 200);
        }
        break;
      case ' ':
        if (activeIndex >= 0) {
          e.preventDefault();
          setQuery(results[activeIndex].title);
          setActiveIndex(-1);
          setTimeout(() => {
            setResults(null);
          }, 200);
        }
        break;
      case 'Escape':
        setResults(null);
        break;

      default:
        break;
    }
  };

  const handleResultClick = (result: Successcriterion) => {
    setQuery(result.title);
    setResults(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setActiveIndex(-1);
    }
    console.log('Clicked result', query);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  return (
    <div className="wcag-search">
      <Input
        ref={searchInputRef}
        id="autocomplete-input"
        value={query}
        search
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoComplete="off"
        name="input-autocomplete"
        placeholder={placeholder}
        role="combobox"
        aria-expanded={results ? true : false}
        aria-owns="autocomplete-listbox"
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
        aria-describedby="autocomplete-hint"
      ></Input>
      <Fragment>
        {results && (
          <ul
            ref={listboxRef}
            className="wcag-search__listbox"
            id="autocomplete-listbox"
            role="listbox"
            aria-labelledby="autocomplete-input"
          >
            {results.map((result, index) => (
              <li
                key={index}
                id={`result-${index}`}
                role="option"
                className={activeIndex === index ? 'wcag-list-item wcag-list-item--active' : 'wcag-list-item'}
                onClick={() => handleResultClick(result)}
                onMouseDown={(e) => e.preventDefault()}
                aria-selected={activeIndex === index}
                aria-posinset={index}
                aria-setsize={results.length}
              >
                <span className="wcag-list-item__label">{result.title}</span>
              </li>
            ))}
            {results?.length === 0 && <li className="wcag-list-item-no-results">No results found</li>}
          </ul>
        )}
      </Fragment>
    </div>
  );
}

export default Search;
