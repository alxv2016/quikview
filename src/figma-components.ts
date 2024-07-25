import {Successcriterion} from './data/wcag.interface';
import {figmaRgb, stroke, textNode} from './figma-utils';
import {clone} from './utils';

/** Note Wrapper Frame **/
function createWrapperFrame(name: string): FrameNode {
  /* Note component wrapper */
  const borderRadius = 12;
  const borderColor = '#FFC300';
  const backgroundColor = '#FFF9E5';
  const frame = figma.createFrame();
  frame.name = `_${name}__wrapper`;
  const fills = clone(frame.fills);
  fills[0].visible = true;
  fills[0].color = figmaRgb(backgroundColor);
  frame.fills = fills;
  stroke(frame, 'CENTER', 1.75, figmaRgb(borderColor), 0.6);
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.layoutAlign = 'STRETCH';
  frame.cornerRadius = borderRadius;
  return frame;
}

function createComponentNode(name: string, layoutMode: 'VERTICAL' | 'HORIZONTAL' = 'VERTICAL'): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = name;
  layoutMode === 'VERTICAL' ? (componentNode.layoutMode = 'VERTICAL') : (componentNode.layoutMode = 'HORIZONTAL');
  componentNode.primaryAxisAlignItems = 'MIN';
  componentNode.counterAxisAlignItems = 'MIN';
  componentNode.primaryAxisSizingMode = 'AUTO';
  componentNode.counterAxisSizingMode = 'FIXED';
  componentNode.fills = [];
  return componentNode;
}

function createBodyFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}__body`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 44;
  frame.clipsContent = false;

  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingLeft = 44;
  frame.paddingTop = 44;
  frame.paddingRight = 44;
  frame.paddingBottom = 44;
  return frame;
}

function createHeaderFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}__header`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 12;
  frame.clipsContent = false;

  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  return frame;
}

function createTitleFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-title-group`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 2;
  frame.clipsContent = false;

  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  return frame;
}

function createTagsFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-tags`;
  frame.layoutMode = 'HORIZONTAL';
  frame.itemSpacing = 12;
  frame.clipsContent = false;

  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  return frame;
}

function createTagFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-tag`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 0;
  frame.clipsContent = false;
  const backgroundColor = '#FFC300';
  const fills = clone(frame.fills);
  fills[0].visible = true;
  fills[0].color = figmaRgb(backgroundColor);
  frame.fills = fills;
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingLeft = 12;
  frame.paddingTop = 8;
  frame.paddingRight = 12;
  frame.paddingBottom = 8;
  frame.cornerRadius = 8;
  return frame;
}

export function createRefComponent(name: string, data: Successcriterion): ComponentNode {
  const {ref_id, title, tags, description} = data;
  /* Create a figma component */
  const refComp = createComponentNode(name);
  refComp.resize(675, refComp.height);
  /* Note component wrapper */
  const wrapperFrame = createWrapperFrame(name);
  const bodyFrame = createBodyFrame(name);
  const headerFrame = createHeaderFrame(name);
  const titleFrame = createTitleFrame(name);
  const overline = textNode(18, 'Semi Bold', figmaRgb('#7B5F00'), `Criteria ${ref_id}`, 'STRETCH');
  const heading = textNode(36, 'Bold', figmaRgb('#131313'), title, 'STRETCH');
  const tagsFrame = createTagsFrame(name);
  const descriptionText = textNode(20, 'Regular', figmaRgb('#131313'), description, 'STRETCH', 32);

  if (tags && tags.length !== 0) {
    tags.forEach((text) => {
      const tagFrame = createTagFrame(name);
      const tag = textNode(16, 'Medium', figmaRgb('#131313'), text);
      tagFrame.appendChild(tag);
      tagsFrame.appendChild(tagFrame);
    });
  }

  titleFrame.appendChild(overline);
  titleFrame.appendChild(heading);
  headerFrame.appendChild(titleFrame);
  headerFrame.appendChild(tagsFrame);
  bodyFrame.appendChild(headerFrame);
  bodyFrame.appendChild(descriptionText);
  wrapperFrame.appendChild(bodyFrame);
  refComp.appendChild(wrapperFrame);

  return refComp;
}
