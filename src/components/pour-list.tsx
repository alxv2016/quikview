import {HTMLAttributes, RefObject, useContext, useRef} from 'react';
import {Criterion, Successcriterion} from '../data/wcag.interface';
import './pour-list.scss';
import {extractGuidelines, extractSuccessCriteria} from '../utils';
import {SearchContext} from './searchContext';
import CriterionDetails from './criterion-details';

interface PourListProps extends HTMLAttributes<HTMLUListElement> {
  data: Criterion;
  pourAccent?: string;
  onCloseBottomSheet: () => void;
}

function PourList({data, pourAccent, onCloseBottomSheet, ...props}: PourListProps): JSX.Element {
  const pourDataset = extractGuidelines(data.guidelines);
  const context = useContext(SearchContext);

  const handleResultClick = (item: Successcriterion) => {
    context?.setUserResult?.(item);
  };

  const closeBottomSheet = () => {
    context?.setUserResult(null);
    onCloseBottomSheet();
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
      {!context?.userResult && renderPOURItems}
      {context?.userResult && <CriterionDetails data={context.userResult} />}
      <button onClick={() => context?.setUserResult(null)}>test</button>
      <button onClick={closeBottomSheet}>Close</button>
    </ul>
  );
}
export default PourList;
