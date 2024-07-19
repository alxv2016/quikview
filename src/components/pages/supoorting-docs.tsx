import {Fragment, MouseEvent} from 'react';
import {WCAGRefs} from '../../data/refs.interface';
import './supporting-docs.scss';
import {ExternalIcon} from '../icons';

interface SupportingDocsProps {
  data: WCAGRefs[];
}

function SupportingDocs({data}: SupportingDocsProps): JSX.Element {
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
      <div className="sp-overview">{description}</div>
      <div className="actions">{renderRefs}</div>
    </Fragment>
  );
}

export default SupportingDocs;
