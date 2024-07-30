import {MouseEvent} from 'react';
import {Successcriterion} from '../../data/wcag.interface';
import './criteria.scss';
import {InfoIcon, NoteIcon, PlusIcon} from '../icons';
import {useDataQueryContext} from '../../hooks';

interface CriteriaProps {
  data: Successcriterion;
}

enum SpecialCases {
  EXCEPTION = 'exception',
  ALLTRUE = 'all_true',
  ATLEASTONE = 'at_least_one',
}

function Criteria({data}: CriteriaProps): JSX.Element {
  const {ref_id, title, description, tags, url, level, brief, special_cases, notes, references} = data;
  const {dataQuery, setDataQuery} = useDataQueryContext();

  const renderBrief = brief?.map((item, index) => {
    const {title, description} = item;
    return (
      <div key={index} className="brief">
        <div className="brief-title">{title}</div>
        <div className="brief-description">{description}</div>
      </div>
    );
  });

  const handleLink = (e: MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  const handleCreate = (item: Successcriterion) => {
    parent.postMessage({pluginMessage: item}, '*');
  };

  const renderRefs = references.map((item, index) => {
    const {title, url} = item;
    return (
      <a key={index} href={url} className="ref-link" onClick={(e) => handleLink(e, url)}>
        {title}
      </a>
    );
  });

  const renderSpecialCases = special_cases?.map((item, index) => {
    const {type, title, description} = item;
    return (
      <div key={index} className="special-case">
        <div className="special-case-title">{title}</div>
        {description && <div className="special-case-description">{description}</div>}
      </div>
    );
  });

  const renderNotes = notes?.map((note, index) => {
    const {content} = note;
    return (
      <div key={index} className="special-case-note">
        {content}
      </div>
    );
  });

  const renderTags = tags?.map((tag, index) => {
    return (
      <div key={index} className="c-tag">
        {tag}
      </div>
    );
  });

  return (
    <div className="criteria">
      <div className="criteria__header">
        <div className="criteria-title-group">
          <div className="criteria-title">{title}</div>
          <div className="criteria-tags">{renderTags}</div>
        </div>
        <div className="criteria-success">
          <div className="criteria-description">{description}</div>
        </div>
        {renderBrief}
        <div className="brief">
          <div className="brief-title">WCAG 2.2 Supporting documents</div>
          <div className="brief-description">{renderRefs}</div>
        </div>
      </div>
      {special_cases && (
        <div className="special-cases">
          <div className="special-cases__header">
            <InfoIcon />
            {special_cases[0].type === SpecialCases.EXCEPTION && 'Exceptions'}
            {special_cases[0].type === SpecialCases.ALLTRUE && 'No exceptions'}
            {special_cases[0].type === SpecialCases.ATLEASTONE && 'Provide at lease one of the following options'}
          </div>
          <div className="special-cases__body">{renderSpecialCases}</div>
        </div>
      )}
      {notes && (
        <div className="special-cases special-cases--info">
          <div className="special-cases__header">
            <NoteIcon /> Notes
          </div>
          <div className="special-cases__body">{renderNotes}</div>
        </div>
      )}
      <button className="btn-icon-suffix" onClick={() => handleCreate(data)}>
        <PlusIcon /> Create reference
      </button>
    </div>
  );
}

export default Criteria;
