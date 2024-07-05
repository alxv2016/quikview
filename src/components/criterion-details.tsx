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
          <span>Success criteria{ref_id}</span>
          <div className="criterion-title">
            {title} <span className="tag">Level {level}</span>
          </div>
        </div>
        <div className="criterion-description">{description}</div>
      </div>
    </div>
  );
}
export default CriterionDetails;
