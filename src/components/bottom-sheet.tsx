import {
  ReactNode,
  forwardRef,
  DialogHTMLAttributes,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  MouseEvent,
} from 'react';
import './bottom-sheet.scss';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  toggleBottomSheet: () => void;
}

const BottomSheet = forwardRef<HTMLDialogElement, DialogProps>(function BottomSheet(
  {children, toggleBottomSheet}: DialogProps,
  ref
): JSX.Element {
  const [isAnimating, setIsAnimating] = useState(false);
  const internalRef = useRef<HTMLDialogElement>(null);
  // Expose the internalDialogRef through the forwarded dialogRef
  useImperativeHandle(ref, () => {
    if (internalRef.current) {
      return internalRef.current;
    } else {
      throw new Error('Dialog reference is null');
    }
  });

  useEffect(() => {
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (internalRef.current) {
        if (event.animationName === 'close') {
          // Handle fadeout animation end
          console.log('Fadeout animation ended');
          toggleBottomSheet();
        }
        internalRef.current.classList.remove('animate-fadeout');
        // Hide the element after animation ends
        setIsAnimating(false);
      }
    };

    const element = internalRef.current;
    if (element) {
      element.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isAnimating]);

  const handleClick = (event: MouseEvent) => {
    if (!isAnimating && internalRef.current) {
      if (event.currentTarget === event.target) {
        internalRef.current.classList.add('animate-fadeout');
        setIsAnimating(true);
      }
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (!internalRef.current) return;
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        internalRef.current.classList.add('animate-fadeout');
        setIsAnimating(true);
        break;
      default:
        break;
    }
  };

  return (
    <dialog ref={internalRef} className="bottom-sheet" onKeyDown={handleKeydown} onClick={handleClick}>
      <div className="bottom-sheet__content">{children}</div>
    </dialog>
  );
});
export default BottomSheet;
