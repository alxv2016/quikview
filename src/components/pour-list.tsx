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
    return (
      <li key={index}>
        {item.title}
        {item.description}
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
