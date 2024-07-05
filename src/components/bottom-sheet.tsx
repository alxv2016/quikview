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
}

const BottomSheet = forwardRef<{closeBottomSheet: () => void; toggleBottomSheet: () => void}, DialogProps>(
  function BottomSheet({children}: DialogProps, ref): JSX.Element {
    const [isAnimating, setIsAnimating] = useState(false);
    const internalRef = useRef<HTMLDialogElement>(null);
    // Expose the internalDialogRef through the forwarded dialogRef
    // Expose the toggleBottomSheet and closeBottomSheet functions through the ref
    useImperativeHandle(ref, () => ({
      toggleBottomSheet,
      closeBottomSheet,
    }));

    useEffect(() => {
      const handleAnimationEnd = (event: AnimationEvent) => {
        if (!internalRef.current) return;

        if (event.animationName === 'close') {
          // Handle fadeout animation end
          console.log('Fadeout animation ended');
          internalRef.current.close();
        }
        internalRef.current.classList.remove('animate-fadeout');
        // Hide the element after animation ends
        setIsAnimating(false);
      };

      if (internalRef.current) {
        internalRef.current.addEventListener('animationend', handleAnimationEnd);
      }

      return () => {
        if (internalRef.current) {
          internalRef.current.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }, [isAnimating]);

    const toggleBottomSheet = () => {
      if (!internalRef.current) return;
      internalRef.current.showModal();
    };

    const closeBottomSheet = () => {
      if (!internalRef.current) return;
      internalRef.current.classList.add('animate-fadeout');
      setIsAnimating(true);
    };

    const handleClick = (event: MouseEvent) => {
      if (isAnimating || !internalRef.current) return;
      const {currentTarget, target} = event;
      if (currentTarget === target) {
        closeBottomSheet();
      }
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (!internalRef.current) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        internalRef.current.classList.add('animate-fadeout');
        setIsAnimating(true);
      }
    };

    return (
      <dialog ref={internalRef} className="bottom-sheet" onKeyDown={handleKeydown} onClick={handleClick}>
        <div className="bottom-sheet__content">{children}</div>
      </dialog>
    );
  }
);
export default BottomSheet;
