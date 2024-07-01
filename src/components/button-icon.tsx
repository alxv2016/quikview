import {ButtonHTMLAttributes, ReactNode} from 'react';
import './button-icon.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
  ghost?: boolean;
}

function ButtonIcon({children, label, ghost = false, ...props}: ButtonProps): JSX.Element {
  return (
    <button className={ghost ? 'button-icon button-icon--ghost' : 'button-icon'} aria-label={label} {...props}>
      {children}
    </button>
  );
}
export default ButtonIcon;
