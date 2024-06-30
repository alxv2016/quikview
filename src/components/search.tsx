import {useState, useEffect, useRef, useMemo, useContext} from 'react';
import {Successcriterion} from '../data/wcag.interface';
import {SearchContext} from './searchContext';
import {useDebounce, useFuse} from '../hooks';
import './search.scss';

interface SearchProps {
  data: Successcriterion[];
  keys: any[];
  placeholder: string;
  onResultsChange: (result: Successcriterion[] | null) => void;
}

function Search({data, keys, placeholder, onResultsChange}: SearchProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Successcriterion[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 100);
  const context = useContext(SearchContext);
  const fuse = useFuse(data, keys);

  useEffect(() => {
    const result = debouncedQuery ? fuse.search(debouncedQuery).map(({item}) => item) : null;
    setResults(result);
    onResultsChange(result);
  }, [debouncedQuery, fuse]);

  useEffect(() => {
    if (activeIndex !== -1 && listboxRef.current) {
      listboxRef.current.children[activeIndex]?.scrollIntoView({block: 'center'});
    }
  }, [activeIndex]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    if (e.target.value === '') {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results?.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (results.length > 0 && activeIndex < results.length - 1) {
          const nextIndex = activeIndex + 1;
          setActiveIndex(nextIndex);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (results.length > 0 && activeIndex > 0) {
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
          handleResultClick(results[activeIndex]);
        }
        break;
      case 'Escape':
        handleClose();
        break;
      default:
        break;
    }
  };

  const handleResultClick = (result: Successcriterion) => {
    context?.setUserResult?.(result);

    if (inputRef.current) {
      setQuery('');
      inputRef.current.focus();
      handleClose();
    }
  };

  const handleBlur = () => {
    handleClose();
  };

  const handleClose = () => {
    setActiveIndex(-1);
    setResults(null);
  };

  const handleFocus = () => {
    if (inputRef.current?.value) {
      const result = debouncedQuery ? fuse.search(debouncedQuery).map(({item}) => item) : null;
      setResults(result);
    }
  };

  const renderResults = results?.map((result: Successcriterion, index: number) => {
    const {ref_id, title, level} = result;
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
          <span className="sr-only">Success criterion</span>
          <span className="wcag-success-criteria">{ref_id} </span>
          <span className="wcag-label">{title} </span>
        </div>
        <span className="sr-only">Level</span> <span className="wcag-level">{level}</span>
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
        aria-expanded={!!results}
        aria-controls="listbox"
        aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : ''}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
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
              No results for "{query}" 🥲
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
