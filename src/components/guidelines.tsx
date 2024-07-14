import {Fragment, HTMLAttributes, MouseEvent, RefObject, useContext, useRef} from 'react';
import {Criterion, Successcriterion} from '../data/wcag.interface';
import {extractGuidelines, extractSuccessCriteria} from '../utils';
import ButtonIcon from './button-icon';
import {HomeIcon, OverflowIcon, PlusIcon} from './icons';
import './guidelines.scss';
import {useDataQueryContext, useGuidelinesContext} from '../hooks';

interface GuidelinesProps extends HTMLAttributes<HTMLUListElement> {
  data: Criterion;
  handleClick: (item: Successcriterion) => void;
}

function Guidelines({data, handleClick}: GuidelinesProps): JSX.Element {
  const guidelinesData = extractGuidelines(data.guidelines);
  const {dataQuery, setDataQuery} = useDataQueryContext();
  const {guidelines, setGuidelines} = useGuidelinesContext();

  // const handleResultClick = (item: Successcriterion) => {
  //   setDataQuery(item);
  //   setGuidelines(null);
  // };

  const handleCreate = (e: MouseEvent) => {
    e.stopPropagation();
    console.log('clicked here');
  };

  const handleMoreActions = (e: MouseEvent) => {
    e.stopPropagation();
    console.log('clicked here');
  };

  const handleNav = () => {
    setGuidelines(null);
  };

  const renderGuidelines = guidelinesData.map((item: Successcriterion, index: number) => {
    const {title, description, ref_id} = item;

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
              {item.tags?.map((item, index) => {
                return (
                  <li key={index} className="sc-tag">
                    {item}
                  </li>
                );
              })}
            </ul>
            <div className="success-criteria__actions">
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
      <ul className="guidelines">{renderGuidelines}</ul>
    </Fragment>
  );
}
export default Guidelines;
