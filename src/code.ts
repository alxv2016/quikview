import {createRefComponent} from './figma-components';
import {createInstance, loadFonts, notify} from './figma-utils';

figma.showUI(__html__, {height: 620, width: 380, title: 'A Figma plugin', themeColors: true});

//Figma api service
figma.ui.onmessage = (message) => {
  console.log('Criteria from ui', message);
  const userSelections = figma.currentPage.selection;
  const userData = figma.activeUsers as ActiveUser[];
  const uniqueId = userData[0].id?.substring(userData[0].id.length - 4);
  const userPosition = {
    x: figma.viewport.center.x,
    y: figma.viewport.center.y,
  };
  const refId = `_ref-${uniqueId}`;
  // Load all fonts
  loadFonts([
    {family: 'Inter', style: 'Regular'},
    {family: 'Inter', style: 'Medium'},
    {family: 'Inter', style: 'Semi Bold'},
    {family: 'Inter', style: 'Bold'},
  ]).then(() => {
    const refComponent = createRefComponent(refId, message);
    const refInstance = createInstance(refComponent);
    if (refInstance) {
      notify('✨ Design note posted! ✨');
    }
  });
};
