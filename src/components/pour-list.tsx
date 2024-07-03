import {HTMLAttributes, useContext} from 'react';
import {Criterion, Successcriterion} from '../data/wcag.interface';
import './pour-list.scss';
import {extractGuidelines, extractSuccessCriteria} from '../utils';
import {SearchContext} from './searchContext';

interface PourListProps extends HTMLAttributes<HTMLUListElement> {
  data: Criterion;
  pourAccent?: string;
}

function PourList({data, pourAccent, ...props}: PourListProps): JSX.Element {
  const pourDataset = extractGuidelines(data.guidelines);
  const context = useContext(SearchContext);

  console.log(context?.userResult);

  const handleResultClick = (item: Successcriterion) => {
    context?.setUserResult?.(item);
  };

  const renderPOURItems = pourDataset.map((item: Successcriterion, index: number) => {
    const {title, description, ref_id} = item;

    return (
      <li key={index} className="criterion-list-item">
        <button className="pour-item" onClick={() => handleResultClick(item)}>
          <div className="pour-item__header">
            <div className="pour-item-title-group">
              <span className="pour-item-sc">{ref_id}</span>
              <span className="pour-item-title">{title}</span>
            </div>
            <span className="pour-item-description">{description}</span>
          </div>
          <div className="pour-item__footer">
            <ul className="pour-item-tags">
              {item.tags?.map((item, index) => {
                return (
                  <li key={index} className="pour-tag">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </button>
      </li>
    );
  });

  return (
    <ul className="criterion-list" {...props}>
      {renderPOURItems}
    </ul>
  );
}
export default PourList;
