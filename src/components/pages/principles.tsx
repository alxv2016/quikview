import {Criterion} from '../../data/wcag.interface';
import {OperableIcon, PerceivableIcon, RobustIcon, UnderstandableIcon} from '../icons';
import PrincipleItem from '../principle-item';
import './principles.scss';

interface PrinciplesProps {
  data: Criterion[] | null;
  handleClick: (item: Criterion) => void;
}

function Principles({data, handleClick}: PrinciplesProps): JSX.Element {
  const iconMap: {
    [key: string]: {
      icon: JSX.Element;
      color: string;
      backgroundColor: string;
    };
  } = {
    Perceivable: {
      icon: <PerceivableIcon />,
      color: '#015353',
      backgroundColor: '#22DEDE',
    },
    Operable: {
      icon: <OperableIcon />,
      color: '#706800',
      backgroundColor: '#FFEB00',
    },
    Understandable: {
      icon: <UnderstandableIcon />,
      color: '#120263',
      backgroundColor: '#9F8DFF',
    },
    Robust: {
      icon: <RobustIcon />,
      color: '#042A62',
      backgroundColor: '#3BB0FF',
    },
  };

  const renderPrinciples = data?.map((item: Criterion, index: number) => {
    const {icon, color, backgroundColor} = iconMap[item.title];
    return (
      <li key={index}>
        <PrincipleItem
          icon={icon}
          data={item}
          iconColor={color}
          iconBGColor={backgroundColor}
          onClick={() => handleClick(item)}
        ></PrincipleItem>
      </li>
    );
  });

  return (
    <div className="principles">
      <div className="label">Browse guidelines by principle</div>
      <ul className="principles-list">{renderPrinciples}</ul>
    </div>
  );
}
export default Principles;
