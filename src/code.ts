import {createRefComponent} from './figma-components';
import {createInstance, loadFonts, notify, preventCollision} from './figma-utils';

figma.showUI(__html__, {height: 620, width: 380, title: 'A Figma plugin', themeColors: true});

//Figma api service
figma.ui.onmessage = (message) => {
  const userSelections = figma.currentPage.selection;
  const userData = figma.activeUsers as ActiveUser[];
  const uniqueId = userData[0].id?.substring(userData[0].id.length - 4);
  const userPosition = {
    x: figma.viewport.center.x,
    y: figma.viewport.center.y,
  };
  const refId = `_wcag22-ref-${uniqueId}${2024}`;
  // Load all fonts
  loadFonts([
    {family: 'Inter', style: 'Regular'},
    {family: 'Inter', style: 'Medium'},
    {family: 'Inter', style: 'Semi Bold'},
    {family: 'Inter', style: 'Bold'},
  ]).then(() => {
    if (userSelections.length !== 0) {
      const refComponent = createRefComponent(refId, message);
      const refInstance = createInstance(refComponent);
      const userSelectionRec = userSelections[0].absoluteBoundingBox as Rect;
      const noteBoundingRec = refInstance.absoluteBoundingBox as Rect;

      refInstance.y = userSelectionRec.y;
      refInstance.x = userSelectionRec.x - noteBoundingRec.width - 64;
      preventCollision(refId, 24);

      if (refInstance) {
        notify('✨ WCAG 2.2 reference posted! ✨');
      }
    } else {
      const refComponent = createRefComponent(refId, message);
      const refInstance = createInstance(refComponent);
      const noteBoundingRec = refInstance.absoluteBoundingBox as Rect;

      refInstance.x = (userPosition.x - noteBoundingRec.width / 2) as number;
      refInstance.y = (userPosition.y - noteBoundingRec.height / 2) as number;
      preventCollision(refId, 24);

      if (refInstance) {
        notify('✨ WCAG 2.2 reference posted! ✨');
      }
    }
  });
};
