import {ReactNode, forwardRef, DialogHTMLAttributes, useRef, useImperativeHandle, MouseEvent} from 'react';
import './bottom-sheet.scss';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  toggleBottomSheet: (e: MouseEvent) => void;
}

const BottomSheet = forwardRef<HTMLDialogElement, DialogProps>(function BottomSheet(
  {children, toggleBottomSheet}: DialogProps,
  ref
): JSX.Element {
  const internalRef = useRef<HTMLDialogElement>(null);
  // Expose the internalDialogRef through the forwarded dialogRef
  useImperativeHandle(ref, () => {
    if (internalRef.current) {
      return internalRef.current;
    } else {
      throw new Error('Dialog reference is null');
    }
  });

  return (
    <dialog ref={internalRef} className="bottom-sheet" onClick={toggleBottomSheet}>
      <div className="bottom-sheet__content">{children}</div>
    </dialog>
  );
});
export default BottomSheet;
