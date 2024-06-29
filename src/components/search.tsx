import {useState, useEffect, useRef, useMemo} from 'react';
import Fuse from 'fuse.js';
import {Successcriterion} from '../data/wcag.interface';
import useDebounce from './useDebounce';
import './search.scss';

interface SearchProps {
  data: Successcriterion[];
  keys: any[];
  placeholder: string;
  setUserResult: (result: Successcriterion) => void;
  onResultsChange: (result: Successcriterion[] | null) => void;
}
function Search({data, keys, placeholder, setUserResult, onResultsChange}: SearchProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Successcriterion[] | null>(null);
  const debouncedQuery = useDebounce(query, 100);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Setup fuse keywords
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: keys,
        threshold: 0.2,
      }),
    [data, keys]
  );

  useEffect(() => {
    if (debouncedQuery) {
      const result = fuse.search(debouncedQuery).map(({item}) => item);
      setResults(result);
      onResultsChange(result);
    } else {
      setResults(results);
      onResultsChange(results);
    }
  }, [debouncedQuery, fuse]);

  useEffect(() => {
    if (activeIndex === -1) return;
    if (listboxRef.current) {
      listboxRef.current.children[activeIndex].scrollIntoView({block: 'center'});
    }
  }, [activeIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    if (e.target.value === '') {
      setActiveIndex(-1);
      setResults(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Move the selection to the next item in the list
        // (prevIndex + 1) % results.length ensures that after the last item, it wraps back to the first item
        if (results.length > 0 && activeIndex < results.length - 1) {
          // const nextIndex = (activeIndex + 1) % results.length;
          const nextIndex = activeIndex + 1;
          setActiveIndex(nextIndex);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        // Move the selection to the previous item in the list
        // (prevIndex - 1 + results.length) % results.length ensures that before the first item, it wraps back to the last item
        if (results.length > 0 && activeIndex > 0) {
          // const prevIndex = (activeIndex - 1 + results.length) % results.length;
          const prevIndex = activeIndex - 1;
          setActiveIndex(prevIndex);
        } else if (results.length > 0 && activeIndex == 0) {
          setActiveIndex(-1);
        }
        break;
      case 'Enter':
      case ' ':
        if (activeIndex >= 0) {
          e.preventDefault();
          // NOTE: should find a way to clear results and prevent Fuse to run another search
          // on selected keyboards, this doesn't prevent that and Fuse will still run a search to just be cleared.
          handleResultClick(results[activeIndex]);
        }
        break;
      case 'Escape':
        setActiveIndex(-1);
        setResults(null);
        break;
      default:
        break;
    }
  };

  const handleResultClick = (result: Successcriterion) => {
    setQuery(result.title);
    setUserResult(result);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setActiveIndex(-1);
      setTimeout(() => {
        setResults(null);
      }, 100);
    }
  };

  const handleBlur = () => {
    setActiveIndex(-1);
    setTimeout(() => {
      setResults(null);
    }, 200);
  };

  const renderResults = results?.map((result: Successcriterion, index: number) => {
    return (
      <li
        key={index}
        id={`result-${index}`}
        role="option"
        className={activeIndex === index ? 'wcag-list-item wcag-list-item--active' : 'wcag-list-item'}
        aria-selected={activeIndex === index}
        aria-posinset={index + 1} // Indexes start from 1 in aria-posinset
        aria-setsize={results.length}
        onClick={() => handleResultClick(result)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className="wcag-list-item__meta">
          <span className="wcag-success-criteria">{result.ref_id}</span>
          <span className="wcag-label">{result.title}</span>
        </div>
        <span className="wcag-level">{result.level}</span>
      </li>
    );
  });

  return (
    <div className="form-control wcag-search">
      <input
        ref={inputRef}
        id="combobox-input"
        value={query}
        className="input--search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={results ? true : false}
        aria-controls="listbox"
        aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : ''}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <div className="search-icon" aria-hidden="true">
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.04 9.81A4.362 4.362 0 0 1 2 6.364a4.363 4.363 0 1 1 8.727 0 4.348 4.348 0 0 1-.916 2.676l3.484 3.483-.772.771L9.04 9.81Zm.596-3.446a3.272 3.272 0 1 1-6.544 0 3.272 3.272 0 0 1 6.544 0Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {results && (
        <ul id="listbox" ref={listboxRef} className="wcag-search__listbox" role="listbox" aria-label="Search results">
          {renderResults}
          {results?.length === 0 && (
            <li className="wcag-list-item-no-results" aria-hidden="true">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
