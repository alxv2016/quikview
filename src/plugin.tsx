import {useContext, useEffect, useRef, useState, MouseEvent} from 'react';
import {Criterion, Successcriterion} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import Search from './components/search';
import SearchContextProvider from './components/searchContext';
import Announcer from './components/announcer';
import {extractSuccessCriteria} from './utils';
import ButtonGroup from './components/button-group';
import ButtonIcon from './components/button-icon';
import {OperableIcon, OverflowIcon, PerceivableIcon, RobustIcon, UnderstandableIcon} from './components/icons';
import BottomSheet from './components/bottom-sheet';
import ListItem from './components/list-item';

enum FilterType {
  ALL = 0,
  LEVEL_A = 1,
  LEVEL_AA = 2,
  LEVEL_AAA = 3,
}

export default function Plugin() {
  // window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  // parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');
  console.log('App component rendered');
  const successCriteriaDataset = extractSuccessCriteria(wcagData);

  const keys = ['ref_id', 'tags', 'title', 'level'];
  const [data, setData] = useState<Successcriterion[]>(successCriteriaDataset);
  const [announcement, setAnnouncement] = useState('');
  const bottomSheetRef = useRef<HTMLDialogElement>(null);

  const handleResultsChange = (results: Successcriterion[] | null) => {
    if (results) {
      setAnnouncement(`Found ${results.length} results`);
      if (results.length === 0) {
        setAnnouncement('No results found');
      }
    }
  };

  const handleButtonClick = (selectedIndex: number) => {
    switch (true) {
      case selectedIndex === FilterType.ALL:
        setData(successCriteriaDataset);
        break;
      case selectedIndex === FilterType.LEVEL_A:
        const dataSetA = successCriteriaDataset.filter((item) => item.level === 'A');
        setData(dataSetA);
        break;
      case selectedIndex === FilterType.LEVEL_AA:
        const dataSetAA = successCriteriaDataset.filter((item) => item.level === 'AA');
        setData(dataSetAA);
        break;
      case selectedIndex === FilterType.LEVEL_AAA:
        const dataSetAAA = successCriteriaDataset.filter((item) => item.level === 'AAA');
        setData(dataSetAAA);
        break;
    }
  };

  const toggleBottomSheet = () => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.hasAttribute('open') ? bottomSheetRef.current.close() : bottomSheetRef.current.showModal();
  };

  // const handleClose = (e: MouseEvent<HTMLDialogElement>) => {
  //   console.log(e);
  //   // bottomSheetRef.current?.close();
  // }

  const iconMap: {
    [key: string]: {
      icon: JSX.Element;
      color: string;
      backgroundColor: string;
      borderColor: string;
    };
  } = {
    Perceivable: {
      icon: <PerceivableIcon />,
      color: '#015353',
      backgroundColor: '#1BC4C4',
      borderColor: '#98FFFF',
    },
    Operable: {
      icon: <OperableIcon />,
      color: '#706800',
      backgroundColor: '#FFEB00',
      borderColor: '#FFF9B1',
    },
    Understandable: {
      icon: <UnderstandableIcon />,
      color: '#120263',
      backgroundColor: '#7B61FF',
      borderColor: '#9F8DFF',
    },
    Robust: {
      icon: <RobustIcon />,
      color: '#042A62',
      backgroundColor: '#18A0FB',
      borderColor: '#71C6FF',
    },
  };

  const renderPOURItems = wcagData.map((item: Criterion, index: number) => {
    const {icon, color, backgroundColor, borderColor} = iconMap[item.title];
    return (
      <li key={index}>
        <ListItem
          icon={icon}
          data={item}
          iconColor={color}
          iconBGColor={backgroundColor}
          iconBorderColor={borderColor}
        ></ListItem>
      </li>
    );
  });

  return (
    <SearchContextProvider>
      <Announcer message={announcement}></Announcer>
      <main>
        <Search
          data={data}
          keys={keys}
          placeholder="Search for a success criterion"
          onResultsChange={handleResultsChange}
        />
        <div className="filter-toolbar">
          <ButtonGroup
            label="Filter by success level"
            buttons={['All', 'A', 'AA', 'AAA']}
            onButtonClick={handleButtonClick}
          />
          <ButtonIcon label="Settings" onClick={toggleBottomSheet}>
            <OverflowIcon />
          </ButtonIcon>
        </div>
        <div className="pour">
          <span className="pour-heading">Explore by POUR</span>
          <ul className="pour-list">{renderPOURItems}</ul>
        </div>
      </main>
      <BottomSheet ref={bottomSheetRef} toggleBottomSheet={toggleBottomSheet}>
        <div>Hello</div>
      </BottomSheet>
    </SearchContextProvider>
  );
}
