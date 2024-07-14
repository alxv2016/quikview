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
import './action-sheet.scss';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  title?: string;
  description?: string;
  onClose?: () => void;
}

const ActionSheet = forwardRef<{closeActionSheet: () => void; openActionSheet: () => void}, DialogProps>(
  function ActionSheet({children, title, description, onClose}: DialogProps, ref): JSX.Element {
    const [isAnimating, setIsAnimating] = useState(false);
    const internalRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => ({
      openActionSheet,
      closeActionSheet,
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

    const openActionSheet = () => {
      if (!internalRef.current) return;
      internalRef.current.showModal();
    };

    const closeActionSheet = () => {
      if (!internalRef.current) return;
      internalRef.current.classList.add('animate-fadeout');
      setIsAnimating(true);
    };

    // const handleClick = (event: MouseEvent) => {
    //   if (isAnimating || !internalRef.current) return;
    //   const {currentTarget, target} = event;
    //   if (currentTarget === target) {
    //     closeActionSheet();
    //   }
    // };

    const handleKeydown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeActionSheet();
      }
    };

    return (
      <dialog ref={internalRef} className="action-sheet" onKeyDown={handleKeydown}>
        <div className="action-sheet__content">
          <div className="action-sheet-header">
            {title && <div className="as-title">{title}</div>}
            {description && <div className="as-description">{description}</div>}
          </div>
          {children}
        </div>
        <button className="close-btn" onClick={closeActionSheet} autoFocus>
          Cancel
        </button>
      </dialog>
    );
  }
);
export default ActionSheet;
