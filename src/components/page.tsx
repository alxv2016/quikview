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
import './page.scss';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  onClose?: () => void;
}

const Page = forwardRef<{closePage: () => void; openPage: () => void}, DialogProps>(function Page(
  {children, onClose}: DialogProps,
  ref
): JSX.Element {
  const internalRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    openPage,
    closePage,
  }));

  const openPage = () => {
    if (!internalRef.current) return;
    internalRef.current.showModal();
  };

  const closePage = () => {
    if (!internalRef.current) return;
    internalRef.current.close();
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') event.preventDefault();
  };

  return (
    <dialog ref={internalRef} className="page" onKeyDown={handleKeydown}>
      <div className="page__content">{children}</div>
    </dialog>
  );
});
export default Page;
