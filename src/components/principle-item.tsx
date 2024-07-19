import {ButtonHTMLAttributes} from 'react';
import {Criterion} from '../data/wcag.interface';
import './principle-item.scss';

interface PrincipleItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element | null;
  data: Criterion;
  iconColor?: string;
  iconBGColor?: string;
}

function PrincipleItem({icon, data, iconColor, iconBGColor, ...props}: PrincipleItemProps): JSX.Element {
  const {title, description} = data;
  return (
    <button className="principle-item" {...props}>
      <div
        className="pi-icon"
        style={
          {
            '--icon-color': iconColor,
            '--icon-bg-color': iconBGColor,
          } as React.CSSProperties
        }
      >
        {icon}
      </div>
      <div className="principle-item__content">
        <span className="pi-title">{title}</span>
        <span className="pi-descr">{description}</span>
      </div>
    </button>
  );
}
export default PrincipleItem;
