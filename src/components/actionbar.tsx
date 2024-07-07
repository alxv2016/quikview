import {ReactNode} from 'react';
import './actionbar.scss';

function ActionBar({children}: {children: ReactNode}) {
  return (
    <div className="action-bar">
      <div className="action-bar__container">{children}</div>
    </div>
  );
}

export default ActionBar;
