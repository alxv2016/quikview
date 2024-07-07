import {Successcriterion} from '../data/wcag.interface';
import './criterion-details.scss';

interface CriterionDetailsProps {
  data: Successcriterion;
}

function CriterionDetails({data}: CriterionDetailsProps): JSX.Element {
  const {ref_id, title, description, url, level, brief, special_cases, notes, references} = data;
  return (
    <div className="criterion">
      <div className="criterion__header">
        <div className="criterion-title-group">
          <div className="criterion-overline">Success criteria {ref_id}</div>
          <div className="criterion-title">{title}</div>
          <div className="level-tag">Level {level}</div>
        </div>
        <div className="criterion-description">{description}</div>
        {brief?.map((item, index) => {
          const {title, description} = item;
          return (
            <div key={index} className="brief">
              <div className="brief-title">{title}</div>
              <div className="brief-description">{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CriterionDetails;
