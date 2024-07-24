import {Fragment, HTMLAttributes, MouseEvent, ReactNode, useRef, useState} from 'react';
import {Criterion, Successcriterion} from '../../data/wcag.interface';
import {extractGuidelines} from '../../utils';
import ButtonIcon from '../button-icon';
import {OverflowIcon, PlusIcon} from '../icons';
import './guidelines.scss';
import ActionSheet from '../action-sheet';
import Actions from './actions';

interface GuidelinesProps extends HTMLAttributes<HTMLUListElement> {
  data: Criterion;
  handleClick: (item: Successcriterion) => void;
}

function Guidelines({data, handleClick}: GuidelinesProps): JSX.Element {
  const guidelinesData = extractGuidelines(data.guidelines);
  const [actions, setActions] = useState<ReactNode>(null);
  const actionSheetRef = useRef<{closeActionSheet: () => void; openActionSheet: () => void}>(null);

  const handleCreate = (e: MouseEvent, item: Successcriterion) => {
    e.stopPropagation();
    parent.postMessage({pluginMessage: item}, '*');
  };

  const handleActionClick = (item: Successcriterion) => {
    handleClick(item);
    actionSheetRef.current?.closeActionSheet();
  };

  const showMoreActions = (e: MouseEvent, item: Successcriterion) => {
    e.stopPropagation();
    if (!actionSheetRef) return;
    setActions(<Actions data={item} handleClick={handleActionClick} />);
    actionSheetRef.current?.openActionSheet();
  };

  const renderGuidelines = guidelinesData.map((item: Successcriterion, index: number) => {
    const {title, description, ref_id, tags} = item;

    return (
      <li key={index} className="guideline">
        <div role="button" tabIndex={0} className="success-criteria" onClick={() => handleClick(item)}>
          <div className="success-criteria__header">
            <div className="sc-title">
              <span className="sc-ref-id">{ref_id}</span> {title}
            </div>
            <div className="sc-description">{description}</div>
          </div>
          <div className="success-criteria__footer">
            <ul className="sc-tags">
              {tags?.slice(1).map((item, index) => {
                return (
                  <li key={index} className="sc-tag">
                    {item}
                  </li>
                );
              })}
            </ul>
            <div className="success-criteria__actions">
              <ButtonIcon label="Create" onClick={(e) => handleCreate(e, item)}>
                <PlusIcon />
              </ButtonIcon>
              <ButtonIcon label="More actions" onClick={(e) => showMoreActions(e, item)}>
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
      <ul className="guidelines">{renderGuidelines}</ul>
      <ActionSheet title="More actions" ref={actionSheetRef}>
        {actions}
      </ActionSheet>
    </Fragment>
  );
}
export default Guidelines;
