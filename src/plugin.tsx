import {useContext, useEffect, useRef, useState, MouseEvent, ReactNode, Fragment} from 'react';
import {Criterion, Successcriterion} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import Search from './components/search';
import {DataQueryContext} from './components/DataQueryContext';
import Announcer from './components/announcer';
import {extractSuccessCriteria} from './utils';
import ButtonGroup from './components/button-group';
import ButtonIcon from './components/button-icon';
import {OverflowIcon} from './components/icons';
import BottomSheet from './components/bottom-sheet';
import ListItem from './components/list-item';
import PourList from './components/guidelines';
import CriterionDetails from './components/criterion-details';
import Principles from './components/principles';
import {useDataQueryContext, useGuidelinesContext} from './hooks';
import Guidelines from './components/guidelines';

enum FilterType {
  ALL = 0,
  LEVEL_A = 1,
  LEVEL_AA = 2,
  LEVEL_AAA = 3,
}

export default function Plugin(): JSX.Element {
  // window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  // parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');
  const successCriteriaDataset = extractSuccessCriteria(wcagData);

  const keys = ['ref_id', 'tags', 'title', 'level'];
  const [data, setData] = useState<Successcriterion[]>(successCriteriaDataset);
  const [announcement, setAnnouncement] = useState('');
  const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null);
  const bottomSheetRef = useRef<{closeBottomSheet: () => void; openBottomSheet: () => void}>(null);
  const {dataQuery, setDataQuery} = useDataQueryContext();
  const {guidelines, setGuidelines} = useGuidelinesContext();

  const openBottomSheet = () => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.openBottomSheet();
  };

  const closeBottomSheet = () => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.closeBottomSheet();
  };

  const handleResultsChange = (results: Successcriterion[] | null) => {
    if (!results) return;
    setAnnouncement(`Found ${results.length} results`);
    if (results.length === 0) {
      setAnnouncement('No results found');
    }
  };

  // const handlePrincipleClick = (item: Criterion) => {
  //   console.log(item);
  //   setBottomSheetContent(<PourList data={item} onCloseBottomSheet={closeBottomSheet} />);
  //   openBottomSheet();
  // };

  const handleFilterClick = (selectedIndex: number) => {
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

  const handleSelection = (result: Successcriterion) => {
    if (!result) return;
    setDataQuery(result);
  };

  return (
    <Fragment>
      <Announcer message={announcement}></Announcer>
      <div className="plugin-wrapper">
        {dataQuery && <CriterionDetails data={dataQuery} />}
        {guidelines && <Guidelines data={guidelines} />}
        {!dataQuery && !guidelines && (
          <Fragment>
            <div className="plugin-header">
              <Search
                data={data}
                keys={keys}
                placeholder="Search for a success criterion"
                onResultsChange={handleResultsChange}
                onResultsSelected={handleSelection}
              />
              <div className="search-filters">
                <ButtonGroup
                  label="Filter by success level"
                  buttons={['All', 'A', 'AA', 'AAA']}
                  onButtonClick={handleFilterClick}
                />
                <ButtonIcon label="Settings" onClick={openBottomSheet}>
                  <OverflowIcon />
                </ButtonIcon>
              </div>
            </div>
            <Principles data={wcagData} />
          </Fragment>
        )}
      </div>
      {/* <BottomSheet ref={bottomSheetRef} onClose={handleOnClose}>{bottomSheetContent}</BottomSheet> */}
    </Fragment>
  );
}
