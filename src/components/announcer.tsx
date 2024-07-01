import {useEffect, useRef} from 'react';
import {useDebounce} from '../hooks';

interface AnnouncerProps {
  message: string;
}

function Announcer({message}: AnnouncerProps) {
  const ariaLiveRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(message, 100);

  useEffect(() => {
    if (ariaLiveRef.current) {
      // Clear the current text content
      ariaLiveRef.current.textContent = '';
      if (debouncedQuery) {
        ariaLiveRef.current!.textContent = debouncedQuery;
      }
    }
  }, [debouncedQuery]);

  return (
    <div
      ref={ariaLiveRef}
      role="status"
      aria-live="assertive" // Assertive seems to prevent message from repeating as it gets re-render
      className="sr-only"
    ></div>
  );
}

export default Announcer;
