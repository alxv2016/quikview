import {Fragment, MouseEvent} from 'react';
import {WCAGRefs} from '../data/refs.interface';
import './action-content.scss';
import {ExternalIcon} from './icons';

interface ActionContentProps {
  data: WCAGRefs[];
}

function ActionContent({data}: ActionContentProps): JSX.Element {
  const {ref_id, title, description, url, supporting_docs} = data[0];

  const handleLink = (e: MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  const renderRefs = supporting_docs.map((item, index) => {
    const {title, description, url} = item;
    return (
      <a key={index} href={url} className="support-link" onClick={(e) => handleLink(e, url)}>
        <div className="support-link__heading">
          <div className="sp-title">{title}</div>
          <ExternalIcon />
        </div>
        <div className="sp-description">{description}</div>
      </a>
    );
  });

  return (
    <Fragment>
      <div className="actions">{renderRefs}</div>
    </Fragment>
  );
}

export default ActionContent;
