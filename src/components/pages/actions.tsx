import {Fragment, MouseEvent, useState} from 'react';
import {CopyIcon, ExternalIcon} from '../icons';
import './actions.scss';
import {Reference, Successcriterion} from '../../data/wcag.interface';
import ButtonIcon from '../button-icon';

interface ActionsProps {
  data: Successcriterion;
  handleClick: (item: Successcriterion) => void;
}

function SupportingDocs({data, handleClick}: ActionsProps): JSX.Element {
  const {ref_id, title, description, url, references} = data;

  const handleLink = (e: MouseEvent, ref: Reference) => {
    e.preventDefault();
    window.open(ref.url, '_blank');
  };

  const renderSupportingLinks = references?.map((ref, index) => {
    return (
      <a key={index} href={ref.url} className="c-action" onClick={(e) => handleLink(e, ref)}>
        {ref.title}
      </a>
    );
  });

  return (
    <div className="criteria-actions">
      {renderSupportingLinks}
      <button className="c-action c-action--primary" onClick={() => handleClick(data)}>
        View details
      </button>
    </div>
  );
}

export default SupportingDocs;
