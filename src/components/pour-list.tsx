import {HTMLAttributes} from 'react';
import {Criterion, Successcriterion} from '../data/wcag.interface';
import './pour-list.scss';
import {extractGuidelines, extractSuccessCriteria} from '../utils';

interface PourListProps extends HTMLAttributes<HTMLUListElement> {
  data: Criterion;
  pourAccent?: string;
}

function PourList({data, pourAccent, ...props}: PourListProps): JSX.Element {
  const pourDataset = extractGuidelines(data.guidelines);
  const renderPOURItems = pourDataset.map((item: Successcriterion, index: number) => {
    const {title, description, ref_id} = item;
    return (
      <li key={index}>
        <button className="pour-item">
          <div className="pour-item__header">
            <span className="pour-item-overline">{data.title}</span>
            <div className="pour-item-title-group">
              <span className="pour-item-sc">{ref_id}</span>
              <span className="pour-item-title">{title}</span>
            </div>
            <span className="pour-item-description">{description}</span>
          </div>
        </button>
      </li>
    );
  });

  return (
    <ul className="pour-list" {...props}>
      {renderPOURItems}
    </ul>
  );
}
export default PourList;
