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
  onClose?: () => void;
}

const BottomSheet = forwardRef<{closeBottomSheet: () => void; openBottomSheet: () => void}, DialogProps>(
  function BottomSheet({children, onClose}: DialogProps, ref): JSX.Element {
    const [isAnimating, setIsAnimating] = useState(false);
    const internalRef = useRef<HTMLDialogElement>(null);
    // Expose the internalDialogRef through the forwarded dialogRef
    // Expose the toggleBottomSheet and closeBottomSheet functions through the ref
    useImperativeHandle(ref, () => ({
      openBottomSheet,
      closeBottomSheet,
    }));

    useEffect(() => {
      const handleAnimationEnd = (event: AnimationEvent) => {
        if (!internalRef.current) return;
        if (event.animationName === 'close') {
          internalRef.current.close();
          internalRef.current.classList.remove('animate-fadeout');
          setIsAnimating(false);
          onClose?.();
        }
      };

      if (internalRef.current) {
        internalRef.current.addEventListener('animationend', handleAnimationEnd);
      }

      return () => {
        if (internalRef.current) {
          internalRef.current.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }, [isAnimating, onClose]);

    const openBottomSheet = () => {
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
      if (event.key === 'Escape') {
        event.preventDefault();
        closeBottomSheet();
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
