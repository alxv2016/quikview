import {useRef, useState, Fragment} from 'react';
import {Criterion, Successcriterion} from './data/wcag.interface';
import wcagData from './data/wcag.json';
import wcagRefs from './data/refs.json';
import Search from './components/search';
import Announcer from './components/announcer';
import {extractSuccessCriteria} from './utils';
import ButtonGroup from './components/button-group';
import ButtonIcon from './components/button-icon';
import {BackIcon, OverflowIcon, RefsIcon} from './components/icons';
import Principles from './components/pages/principles';
import {useDataQueryContext, useGuidelinesContext} from './hooks';
import Guidelines from './components/pages/guidelines';
import Page from './components/page';
import ActionSheet from './components/action-sheet';
import {WCAGRefs} from './data/refs.interface';
import SupportingDocs from './components/pages/supoorting-docs';
import Criteria from './components/pages/criteria';

enum FilterType {
  ALL = 0,
  LEVEL_A = 1,
  LEVEL_AA = 2,
  LEVEL_AAA = 3,
}

export default function Plugin(): JSX.Element {
  // window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  // parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');
  const refData: WCAGRefs[] = wcagRefs;
  const successCriteriaDataset = extractSuccessCriteria(wcagData);
  const {title, description, url, version, supporting_docs} = refData[0];

  const keys = ['ref_id', 'tags', 'title', 'level'];
  const [data, setData] = useState<Successcriterion[]>(successCriteriaDataset);
  const [announcement, setAnnouncement] = useState('');
  // const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null);
  const guidelinesPage = useRef<{closePage: () => void; openPage: () => void}>(null);
  const criteriaPage = useRef<{closePage: () => void; openPage: () => void}>(null);
  const actionSheetRef = useRef<{closeActionSheet: () => void; openActionSheet: () => void}>(null);
  const {dataQuery, setDataQuery} = useDataQueryContext();
  const {guidelines, setGuidelines} = useGuidelinesContext();

  const closeCriteriaPage = () => {
    if (!criteriaPage.current) return;
    criteriaPage.current.closePage();
    setDataQuery(null);
  };

  const closeGuidelinePage = () => {
    if (!guidelinesPage.current) return;
    guidelinesPage.current.closePage();
    setGuidelines(null);
  };

  const showActions = () => {
    if (!actionSheetRef) return;
    actionSheetRef.current?.openActionSheet();
  };

  const handleResultsChange = (results: Successcriterion[] | null) => {
    if (!results) return;
    setAnnouncement(`Found ${results.length} results`);
    if (results.length === 0) {
      setAnnouncement('No results found');
    }
  };

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
    criteriaPage.current?.openPage();
  };

  const handleResultClick = (item: Successcriterion) => {
    if (!item) return;
    setDataQuery(item);
    criteriaPage.current?.openPage();
  };

  const handlePrincipleClick = (item: Criterion) => {
    setGuidelines(item);
    guidelinesPage.current?.openPage();
  };

  return (
    <Fragment>
      <Announcer message={announcement}></Announcer>
      <div className="plugin-wrapper">
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
            <ButtonIcon label="Settings" onClick={showActions}>
              <RefsIcon />
            </ButtonIcon>
          </div>
        </div>
        <Principles data={wcagData} handleClick={handlePrincipleClick} />
        <div className="plugin-footer">
          This data set is pulled from the <strong>WCAG 2.2 document</strong> and is designed to meet the needs of those
          who need a creditable source of referenceable technical standards for accessibility guidelines.
        </div>
      </div>
      <Page ref={guidelinesPage}>
        <div className="nav-toolbar">
          <div className="nav-title">{guidelines?.title}</div>
          <div className="nav-btn-group">
            <ButtonIcon label="Back" onClick={closeGuidelinePage}>
              <BackIcon />
            </ButtonIcon>
            <ButtonIcon label="More actions">
              <OverflowIcon />
            </ButtonIcon>
          </div>
        </div>
        {guidelines && <Guidelines data={guidelines} handleClick={handleResultClick} />}
      </Page>
      <Page ref={criteriaPage}>
        <div className="nav-toolbar">
          <div className="nav-title">Understanding {dataQuery?.ref_id}</div>
          <div className="nav-btn-group">
            <ButtonIcon label="Back" onClick={closeCriteriaPage}>
              <BackIcon />
            </ButtonIcon>
            <ButtonIcon label="More actions">
              <OverflowIcon />
            </ButtonIcon>
          </div>
        </div>
        {dataQuery && <Criteria data={dataQuery} />}
      </Page>
      <ActionSheet title={title} ref={actionSheetRef}>
        <SupportingDocs data={refData} />
      </ActionSheet>
    </Fragment>
  );
}
