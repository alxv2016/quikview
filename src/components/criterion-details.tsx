import {Successcriterion} from '../data/wcag.interface';
import './criterion-details.scss';

interface CriterionDetailsProps {
  data: Successcriterion;
}

enum SpecialCases {
  EXCEPTION = 'exception',
  ALLTRUE = 'all_true',
}

function CriterionDetails({data}: CriterionDetailsProps): JSX.Element {
  const {ref_id, title, description, url, level, brief, special_cases, notes, references} = data;

  const renderBrief = brief?.map((item, index) => {
    const {title, description} = item;
    return (
      <div key={index} className="brief">
        <div className="brief-title">{title}</div>
        <div className="brief-description">{description}</div>
      </div>
    );
  });

  const renderSpecialCases = special_cases?.map((item, index) => {
    const {type, title} = item;
    return <div key={index}>{title}</div>;
  });

  return (
    <div className="criterion">
      <div className="criterion__header">
        <div className="criterion-title-group">
          <div className="criterion-overline">Understanding {ref_id}</div>
          <div className="criterion-title">{title}</div>
          <div className="level-tag">Level {level}</div>
        </div>
        {renderBrief}
        <div className="criterion-success">
          <div className="criterion-subtitle">Success criterion</div>
          <div className="criterion-description">{description}</div>
        </div>
      </div>
      {special_cases && (
        <div className="special-cases">
          <div className="special-cases-header">
            {special_cases[0].type === SpecialCases.EXCEPTION ? 'Exceptions' : 'No exceptions'}
          </div>
        </div>
      )}
    </div>
  );
}

export default CriterionDetails;
