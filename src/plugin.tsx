import {useContext, useEffect, useRef, useState, MouseEvent, ReactNode} from 'react';
import {Criterion, Successcriterion} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import Search from './components/search';
import SearchContextProvider, {SearchContext} from './components/searchContext';
import Announcer from './components/announcer';
import {extractSuccessCriteria} from './utils';
import ButtonGroup from './components/button-group';
import ButtonIcon from './components/button-icon';
import {OperableIcon, OverflowIcon, PerceivableIcon, RobustIcon, UnderstandableIcon} from './components/icons';
import BottomSheet from './components/bottom-sheet';
import ListItem from './components/list-item';
import PourList from './components/pour-list';
import CriterionDetails from './components/criterion-details';

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
  const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null);
  const bottomSheetRef = useRef<{closeBottomSheet: () => void; toggleBottomSheet: () => void}>(null);

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.toggleBottomSheet();
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.closeBottomSheet();
    }
  };

  const context = useContext(SearchContext);

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

  const handlePourClick = (item: Criterion, color: string) => {
    console.log(item);
    setBottomSheetContent(<PourList data={item} pourAccent={color} onCloseBottomSheet={closeBottomSheet} />);
    openBottomSheet();
  };

  const handleResultSelected = (result: Successcriterion) => {
    console.log('search selected');
    setBottomSheetContent(<CriterionDetails data={result} />);
    openBottomSheet();
  };

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

  const renderPOURItems = wcagData.map((item: Criterion, index: number) => {
    const {icon, color, backgroundColor} = iconMap[item.title];
    return (
      <li key={index}>
        <ListItem
          icon={icon}
          data={item}
          iconColor={color}
          iconBGColor={backgroundColor}
          onClick={() => handlePourClick(item, backgroundColor)}
        ></ListItem>
      </li>
    );
  });

  return (
    <SearchContextProvider>
      <Announcer message={announcement}></Announcer>
      <main>
        <div className="plugin-header">
          <Search
            data={data}
            keys={keys}
            placeholder="Search for a success criterion"
            onResultsChange={handleResultsChange}
            onResultsSelected={handleResultSelected}
          />
          <div className="search-filters">
            <ButtonGroup
              label="Filter by success level"
              buttons={['All', 'A', 'AA', 'AAA']}
              onButtonClick={handleButtonClick}
            />
            <ButtonIcon label="Settings" onClick={openBottomSheet}>
              <OverflowIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="plugin-body">
          <span className="label">Explore by POUR</span>
          <ul className="pour-list">{renderPOURItems}</ul>
        </div>
      </main>
      <BottomSheet ref={bottomSheetRef}>{bottomSheetContent}</BottomSheet>
    </SearchContextProvider>
  );
}
