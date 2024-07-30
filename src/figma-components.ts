import {Successcriterion} from './data/wcag.interface';
import {figmaRgb, injectSVG, stroke, textNode} from './figma-utils';
import {clone} from './utils';

const linkIcon = `<svg width="$size$" height="$size$" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.4 18 5 16.6 14.6 7H6V5h12v12h-2V8.4L6.4 18Z" fill="$color$"/></svg>`;
const infoIcon = `<svg width="$size$" height="$size$" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.667 22.667h2.666v-8h-2.666v8ZM16 12c.378 0 .695-.128.95-.383a1.29 1.29 0 0 0 .383-.95 1.29 1.29 0 0 0-.383-.95 1.29 1.29 0 0 0-.95-.384 1.29 1.29 0 0 0-.95.384 1.29 1.29 0 0 0-.383.95c0 .377.127.694.383.95.256.255.572.383.95.383Zm0 17.333c-1.844 0-3.578-.35-5.2-1.05a13.465 13.465 0 0 1-4.233-2.85c-1.2-1.2-2.15-2.61-2.85-4.233-.7-1.622-1.05-3.355-1.05-5.2 0-1.844.35-3.578 1.05-5.2.7-1.622 1.65-3.033 2.85-4.233 1.2-1.2 2.61-2.15 4.233-2.85 1.622-.7 3.356-1.05 5.2-1.05 1.845 0 3.578.35 5.2 1.05 1.622.7 3.033 1.65 4.233 2.85 1.2 1.2 2.15 2.61 2.85 4.233.7 1.622 1.05 3.356 1.05 5.2 0 1.845-.35 3.578-1.05 5.2a13.465 13.465 0 0 1-2.85 4.233c-1.2 1.2-2.61 2.15-4.233 2.85-1.622.7-3.355 1.05-5.2 1.05Zm0-2.666c2.978 0 5.5-1.034 7.567-3.1 2.066-2.067 3.1-4.59 3.1-7.567 0-2.978-1.034-5.5-3.1-7.567-2.067-2.066-4.59-3.1-7.567-3.1-2.978 0-5.5 1.034-7.567 3.1-2.066 2.067-3.1 4.59-3.1 7.567 0 2.978 1.034 5.5 3.1 7.567 2.067 2.066 4.59 3.1 7.567 3.1Z" fill="$color$"/></svg>`;
const noteIcon = `<svg width="$size$" height="$size$" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.667 25.333h12v-6.666h6.666v-12H6.667v18.666Zm0 2.667a2.568 2.568 0 0 1-1.884-.783A2.568 2.568 0 0 1 4 25.333V6.667c0-.734.261-1.361.783-1.884A2.568 2.568 0 0 1 6.667 4h18.666c.734 0 1.361.261 1.884.783.522.523.783 1.15.783 1.884V20l-8 8H6.667Zm2.666-9.333V16H16v2.667H9.333Zm0-5.334v-2.666h13.334v2.666H9.333Z" fill="$color$"/></svg>`;

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

function createCalloutFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-callout`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 8;
  frame.clipsContent = false;

  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  return frame;
}
function createlinkFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-link`;
  frame.layoutMode = 'HORIZONTAL';
  frame.itemSpacing = 4;
  frame.clipsContent = false;
  const backgroundColor = '#F5EDD2';
  const fills = clone(frame.fills);
  fills[0].visible = true;
  fills[0].color = figmaRgb(backgroundColor);
  frame.fills = fills;
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingLeft = 16;
  frame.paddingTop = 8;
  frame.paddingRight = 12;
  frame.paddingBottom = 8;
  frame.cornerRadius = 8;
  return frame;
}
function createLinkWrapperFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-links`;
  frame.layoutMode = 'HORIZONTAL';
  frame.itemSpacing = 12;
  frame.clipsContent = false;
  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingTop = 8;
  return frame;
}

function createExceptionFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}-exception`;
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

function createNotesFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}__footer-notes`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 24;
  frame.clipsContent = false;
  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingLeft = 24;
  stroke(frame, 'CENTER', 4, figmaRgb('#18A0FB'), 1, ['LEFT']);
  return frame;
}

function createNotesHeaderFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}__footer-notes-header`;
  frame.layoutMode = 'HORIZONTAL';
  frame.itemSpacing = 8;
  frame.clipsContent = false;
  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  const icon = injectSVG(noteIcon, '32', '#0065A8');
  icon.name = `_${name}-icon`;
  frame.appendChild(icon);
  return frame;
}

function createExceptionsFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}__footer-notes`;
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 24;
  frame.clipsContent = false;
  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'MIN';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingLeft = 24;
  stroke(frame, 'CENTER', 4, figmaRgb('#FF9820'), 1, ['LEFT']);
  return frame;
}

function createExceptionsHeaderFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_${name}__footer-exceptions-header`;
  frame.layoutMode = 'HORIZONTAL';
  frame.itemSpacing = 8;
  frame.clipsContent = false;
  frame.fills = [];
  frame.layoutAlign = 'STRETCH';
  frame.primaryAxisAlignItems = 'MIN';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  const icon = injectSVG(infoIcon, '32', '#BE6700');
  icon.name = `_${name}-icon`;
  frame.appendChild(icon);
  return frame;
}

export function createRefComponent(name: string, data: Successcriterion): ComponentNode {
  const {ref_id, title, tags, description, brief, references, special_cases, notes} = data;
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
  const referenceFrame = createCalloutFrame(name);
  const refHeading = textNode(18, 'Semi Bold', figmaRgb('#7B5F00'), 'WCAG 2.2 Supporting documents', 'STRETCH');
  const linkWrapperFrame = createLinkWrapperFrame(name);
  let footerFrame: FrameNode | null = null;
  let notesFrame: FrameNode | null = null;

  if (special_cases) {
    footerFrame = createExceptionsFrame(name);
    const footerHeaderFrame = createExceptionsHeaderFrame(name);
    const footerHeading = textNode(
      20,
      'Semi Bold',
      figmaRgb('#BE6700'),
      special_cases[0].type === 'exception' ? 'Exceptions' : 'Requirements',
      'MIN'
    );
    footerHeading.layoutGrow = 1;
    footerHeaderFrame.appendChild(footerHeading);
    footerFrame.appendChild(footerHeaderFrame);

    special_cases.forEach((item) => {
      let title = null;
      const description = textNode(18, 'Regular', figmaRgb('#131313'), item.description!, 'STRETCH', 28);
      const exceptionFrame = createExceptionFrame(name);
      if (item.title) {
        title = textNode(18, 'Semi Bold', figmaRgb('#7B5F00'), item.title);
        exceptionFrame.appendChild(title);
      }
      exceptionFrame?.appendChild(description);
      footerFrame?.appendChild(exceptionFrame);
    });
  }

  if (notes) {
    notesFrame = createNotesFrame(name);
    const notesHeaderFrame = createNotesHeaderFrame(name);
    const notesHeading = textNode(20, 'Semi Bold', figmaRgb('#0065A8'), 'Notes', 'MIN');
    notesHeading.layoutGrow = 1;
    notesHeaderFrame.appendChild(notesHeading);
    notesFrame.appendChild(notesHeaderFrame);

    notes.forEach((item) => {
      const description = textNode(18, 'Regular', figmaRgb('#131313'), item.content, 'STRETCH', 28);
      notesFrame?.appendChild(description);
    });
  }

  if (tags && tags.length !== 0) {
    tags.forEach((text) => {
      const tagFrame = createTagFrame(name);
      const tag = textNode(16, 'Medium', figmaRgb('#131313'), text);
      tagFrame.appendChild(tag);
      tagsFrame.appendChild(tagFrame);
    });
  }

  referenceFrame.appendChild(refHeading);
  if (references && references.length !== 0) {
    references.forEach((item) => {
      const linkFrame = createlinkFrame(name);
      const link = textNode(18, 'Regular', figmaRgb('#0084DC'), item.title);
      link.setRangeHyperlink(0, item.title.length, {type: 'URL', value: item.url});
      link.setRangeTextDecoration(0, item.title.length, 'UNDERLINE');
      const icon = injectSVG(linkIcon, '24', '#7B5F00');
      icon.name = `_${name}-icon`;
      linkFrame.appendChild(link);
      linkFrame.appendChild(icon);
      linkWrapperFrame.appendChild(linkFrame);
    });
  }
  referenceFrame.appendChild(linkWrapperFrame);

  titleFrame.appendChild(overline);
  titleFrame.appendChild(heading);
  headerFrame.appendChild(titleFrame);
  headerFrame.appendChild(tagsFrame);
  bodyFrame.appendChild(headerFrame);
  bodyFrame.appendChild(descriptionText);

  if (brief && brief.length !== 0) {
    brief.forEach((item) => {
      const calloutFrame = createCalloutFrame(name);
      const title = textNode(18, 'Semi Bold', figmaRgb('#7B5F00'), item.title, 'STRETCH');
      const description = textNode(20, 'Regular', figmaRgb('#131313'), item.description, 'STRETCH', 32);
      calloutFrame.appendChild(title);
      calloutFrame.appendChild(description);
      bodyFrame.appendChild(calloutFrame);
    });
  }

  bodyFrame.appendChild(referenceFrame);
  if (special_cases && footerFrame) {
    bodyFrame.appendChild(footerFrame);
  }
  if (notes && notesFrame) {
    bodyFrame.appendChild(notesFrame);
  }
  wrapperFrame.appendChild(bodyFrame);

  refComp.appendChild(wrapperFrame);

  return refComp;
}
