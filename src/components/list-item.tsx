import {ButtonHTMLAttributes} from 'react';
import {Criterion} from '../data/wcag.interface';
import './list-item.scss';

interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element | null;
  data: Criterion;
  iconColor?: string;
  iconBGColor?: string;
}

function ListItem({icon, data, iconColor, iconBGColor, ...props}: ListItemProps): JSX.Element {
  const {title, description} = data;
  return (
    <button className="list-item" {...props}>
      <div
        className="list-item-icon"
        style={
          {
            '--icon-color': iconColor,
            '--icon-bg-color': iconBGColor,
          } as React.CSSProperties
        }
      >
        {icon}
      </div>
      <div className="list-item__content">
        <span className="list-item-title">{title}</span>
        <span className="list-item-descr">{description}</span>
      </div>
    </button>
  );
}
export default ListItem;
