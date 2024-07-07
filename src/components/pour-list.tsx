import {Fragment, HTMLAttributes, MouseEvent, RefObject, useContext, useRef} from 'react';
import {Criterion, Successcriterion} from '../data/wcag.interface';
import './pour-list.scss';
import {extractGuidelines, extractSuccessCriteria} from '../utils';
import {SearchContext} from './searchContext';
import CriterionDetails from './criterion-details';
import ButtonIcon from './button-icon';
import {OverflowIcon, PlusIcon} from './icons';
import ActionBar from './actionbar';

interface PourListProps extends HTMLAttributes<HTMLUListElement> {
  data: Criterion;
  pourAccent?: string;
  onCloseBottomSheet: () => void;
}

function PourList({data, pourAccent, onCloseBottomSheet, ...props}: PourListProps): JSX.Element {
  const pourDataset = extractGuidelines(data.guidelines);
  const context = useContext(SearchContext);

  console.log(pourAccent);

  const handleResultClick = (item: Successcriterion) => {
    context?.setUserResult?.(item);
  };

  const closeBottomSheet = () => {
    context?.setUserResult(null);
    onCloseBottomSheet();
  };

  const handleCreate = (e: MouseEvent) => {
    e.stopPropagation();
    console.log('clicked here');
  };

  const handleMoreActions = (e: MouseEvent) => {
    e.stopPropagation();
    console.log('clicked here');
  };

  const renderPOURItems = pourDataset.map((item: Successcriterion, index: number) => {
    const {title, description, ref_id} = item;

    return (
      <li key={index} className="criterion-list-item">
        <div role="button" tabIndex={0} className="pour-item" onClick={() => handleResultClick(item)}>
          <div className="pour-item__header">
            <div className="pour-title">
              <span className="pour-ref-id">{ref_id}</span> {title}
            </div>
            <div className="pour-description">{description}</div>
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
            <div className="pour-item__actions">
              <ButtonIcon label="Create" onClick={handleCreate}>
                <PlusIcon />
              </ButtonIcon>
              <ButtonIcon label="More actions" onClick={handleMoreActions}>
                <OverflowIcon />
              </ButtonIcon>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <Fragment>
      <ul className="criterion-list" {...props}>
        {!context?.userResult && renderPOURItems}
        {context?.userResult && <CriterionDetails data={context.userResult} />}
      </ul>
      <ActionBar>
        {context?.userResult && (
          <button className="btn-ghost" onClick={() => context?.setUserResult(null)}>
            Back
          </button>
        )}
        <button onClick={closeBottomSheet}>Close</button>
      </ActionBar>
    </Fragment>
  );
}
export default PourList;
