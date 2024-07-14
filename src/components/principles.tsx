import {useContext, useRef, useState, ReactNode, Fragment} from 'react';
import {Criterion} from '../data/wcag.interface';
import {OperableIcon, PerceivableIcon, RobustIcon, UnderstandableIcon} from './icons';
import ListItem from './list-item';
import './principles.scss';
import PourList from './guidelines';
import BottomSheet from './bottom-sheet';
import {DataQueryContext} from './DataQueryContext';
import {useGuidelinesContext} from '../hooks';
import Guidelines from './guidelines';
import Page from './page';

interface PrinciplesProps {
  data: Criterion[] | null;
  handleClick: (item: Criterion) => void;
}

function Principles({data, handleClick}: PrinciplesProps): JSX.Element {
  const {guidelines, setGuidelines} = useGuidelinesContext();

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
        <ListItem
          icon={icon}
          data={item}
          iconColor={color}
          iconBGColor={backgroundColor}
          onClick={() => handleClick(item)}
        ></ListItem>
      </li>
    );
  });

  return (
    <Fragment>
      <div className="principles">
        <div className="label">Browse guidelines by principle</div>
        <ul className="principles-list">{renderPrinciples}</ul>
      </div>
    </Fragment>
  );
}
export default Principles;
