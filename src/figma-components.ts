import {Successcriterion} from './data/wcag.interface';
import {figmaRgb, injectSVG, stroke, textNode} from './figma-utils';

const linkIcon = `<svg width="$size$" height="$size$" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.4 18 5 16.6 14.6 7H6V5h12v12h-2V8.4L6.4 18Z" fill="$color$"/></svg>`;
const infoIcon = `<svg width="$size$" height="$size$" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.667 22.667h2.666v-8h-2.666v8ZM16 12c.378 0 .695-.128.95-.383a1.29 1.29 0 0 0 .383-.95 1.29 1.29 0 0 0-.383-.95 1.29 1.29 0 0 0-.95-.384 1.29 1.29 0 0 0-.95.384 1.29 1.29 0 0 0-.383.95c0 .377.127.694.383.95.256.255.572.383.95.383Zm0 17.333c-1.844 0-3.578-.35-5.2-1.05a13.465 13.465 0 0 1-4.233-2.85c-1.2-1.2-2.15-2.61-2.85-4.233-.7-1.622-1.05-3.355-1.05-5.2 0-1.844.35-3.578 1.05-5.2.7-1.622 1.65-3.033 2.85-4.233 1.2-1.2 2.61-2.15 4.233-2.85 1.622-.7 3.356-1.05 5.2-1.05 1.845 0 3.578.35 5.2 1.05 1.622.7 3.033 1.65 4.233 2.85 1.2 1.2 2.15 2.61 2.85 4.233.7 1.622 1.05 3.356 1.05 5.2 0 1.845-.35 3.578-1.05 5.2a13.465 13.465 0 0 1-2.85 4.233c-1.2 1.2-2.61 2.15-4.233 2.85-1.622.7-3.355 1.05-5.2 1.05Zm0-2.666c2.978 0 5.5-1.034 7.567-3.1 2.066-2.067 3.1-4.59 3.1-7.567 0-2.978-1.034-5.5-3.1-7.567-2.067-2.066-4.59-3.1-7.567-3.1-2.978 0-5.5 1.034-7.567 3.1-2.066 2.067-3.1 4.59-3.1 7.567 0 2.978 1.034 5.5 3.1 7.567 2.067 2.066 4.59 3.1 7.567 3.1Z" fill="$color$"/></svg>`;
const noteIcon = `<svg width="$size$" height="$size$" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.667 25.333h12v-6.666h6.666v-12H6.667v18.666Zm0 2.667a2.568 2.568 0 0 1-1.884-.783A2.568 2.568 0 0 1 4 25.333V6.667c0-.734.261-1.361.783-1.884A2.568 2.568 0 0 1 6.667 4h18.666c.734 0 1.361.261 1.884.783.522.523.783 1.15.783 1.884V20l-8 8H6.667Zm2.666-9.333V16H16v2.667H9.333Zm0-5.334v-2.666h13.334v2.666H9.333Z" fill="$color$"/></svg>`;

interface FramePadding {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

interface FrameOptions {
  name: string;
  flexDirection: 'VERTICAL' | 'HORIZONTAL';
  alignItems?: 'MIN' | 'CENTER' | 'STRETCH' | 'MAX' | 'INHERIT';
  justifyContent?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  alignSelf?: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE';
  flexGrow?: 'FIXED' | 'AUTO';
  flexShrink?: 'FIXED' | 'AUTO';
  gap?: number;
  overflowHidden?: boolean;
  backgroundColor?: string;
  padding?: number | FramePadding;
  borderRadius?: number;
}

interface CalloutFrameOptions {
  name: string;
  icon: string;
  color: string;
  borderColor: string;
  titleText: string;
}

function createAutoLayoutFrame({
  name,
  flexDirection,
  alignItems = 'STRETCH',
  justifyContent = 'MIN',
  alignSelf = 'MIN',
  flexGrow = 'AUTO',
  flexShrink = 'AUTO',
  gap = 0,
  overflowHidden = false,
  backgroundColor,
  padding,
  borderRadius,
}: FrameOptions): FrameNode {
  const frame = figma.createFrame();
  frame.name = name;
  frame.layoutMode = flexDirection;
  frame.layoutAlign = alignItems;
  frame.primaryAxisAlignItems = justifyContent;
  frame.counterAxisAlignItems = alignSelf;
  frame.primaryAxisSizingMode = flexGrow;
  frame.counterAxisSizingMode = flexShrink;
  frame.itemSpacing = gap;
  frame.clipsContent = overflowHidden;
  frame.fills = [];

  if (backgroundColor) {
    frame.fills = [{type: 'SOLID', color: figmaRgb(backgroundColor)}];
  }
  if (padding) {
    if (typeof padding === 'number') {
      frame.paddingLeft = padding;
      frame.paddingTop = padding;
      frame.paddingRight = padding;
      frame.paddingBottom = padding;
    } else {
      frame.paddingLeft = padding.left ?? 0;
      frame.paddingTop = padding.top ?? 0;
      frame.paddingRight = padding.right ?? 0;
      frame.paddingBottom = padding.bottom ?? 0;
    }
  }
  if (borderRadius) {
    frame.cornerRadius = borderRadius;
  }
  return frame;
}

function createComponentNode({name, flexDirection = 'VERTICAL'}: FrameOptions): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = name;
  componentNode.layoutMode = flexDirection;
  componentNode.primaryAxisAlignItems = 'MIN';
  componentNode.counterAxisAlignItems = 'MIN';
  componentNode.primaryAxisSizingMode = 'AUTO';
  componentNode.counterAxisSizingMode = 'FIXED';
  componentNode.fills = [];
  return componentNode;
}

function createCalloutFrame({name, icon, color, borderColor, titleText}: CalloutFrameOptions): FrameNode {
  const frameNode = createAutoLayoutFrame({
    name: `_${name}__callout`,
    flexDirection: 'VERTICAL',
    gap: 24,
    padding: {left: 24},
  });
  stroke(frameNode, 'CENTER', 4, figmaRgb(borderColor), 1, ['LEFT']);

  const headerFrame = createAutoLayoutFrame({
    name: `_${name}__callout-header`,
    flexDirection: 'HORIZONTAL',
    alignSelf: 'CENTER',
    flexGrow: 'FIXED',
    gap: 8,
  });

  const iconNode = injectSVG(icon, '32', color);
  iconNode.name = `_${name}-icon`;
  headerFrame.appendChild(iconNode);

  const headingTextNode = textNode(20, 'Semi Bold', figmaRgb(color), titleText);
  headingTextNode.layoutGrow = 1;
  headerFrame.appendChild(headingTextNode);
  frameNode.appendChild(headerFrame);
  return frameNode;
}

function renderContentFrames(
  parentFrame: FrameNode,
  items: {title?: string; description: string}[],
  color: string
): void {
  const currentColor = '#131313';
  items.forEach((item) => {
    const contentWrapperFrame = createAutoLayoutFrame({
      name: `_${parentFrame.name}-content`,
      flexDirection: 'VERTICAL',
      gap: 12,
    });
    if (item.title) {
      const headingTextNode = textNode(18, 'Semi Bold', figmaRgb(color), item.title, 'STRETCH');
      contentWrapperFrame.appendChild(headingTextNode);
    }
    const descriptionTextNode = textNode(18, 'Regular', figmaRgb(currentColor), item.description, 'STRETCH', 28);
    contentWrapperFrame.appendChild(descriptionTextNode);
    parentFrame.appendChild(contentWrapperFrame);
  });
}

export function createRefComponent(name: string, data: Successcriterion): ComponentNode {
  const {ref_id, title, tags, description, references, brief, special_cases, notes} = data;
  const refComp = createComponentNode({name, flexDirection: 'VERTICAL'});
  refComp.resize(675, refComp.height);

  const wrapperFrame = createAutoLayoutFrame({
    name: `_${name}__wrapper`,
    flexDirection: 'VERTICAL',
    backgroundColor: '#FFF9E5',
    borderRadius: 12,
  });
  stroke(wrapperFrame, 'CENTER', 1.75, figmaRgb('#FFC300'), 0.6);

  const bodyFrame = createAutoLayoutFrame({
    name: `_${name}__body`,
    flexDirection: 'VERTICAL',
    gap: 44,
    padding: 44,
  });

  const headerFrame = createAutoLayoutFrame({
    name: `_${name}__header`,
    flexDirection: 'VERTICAL',
    gap: 12,
  });

  const titleFrame = createAutoLayoutFrame({
    name: `_${name}-title-group`,
    flexDirection: 'VERTICAL',
    gap: 2,
  });

  const tagsFrame = createAutoLayoutFrame({
    name: `_${name}-tags`,
    flexDirection: 'HORIZONTAL',
    gap: 12,
    flexGrow: 'FIXED',
  });

  const referenceFrame = createAutoLayoutFrame({
    name: `_${name}-callout`,
    flexDirection: 'VERTICAL',
    gap: 8,
  });

  const linkWrapperFrame = createAutoLayoutFrame({
    name: `_${name}-links`,
    flexDirection: 'HORIZONTAL',
    flexGrow: 'FIXED',
    padding: {top: 8},
    gap: 12,
  });

  const overline = textNode(18, 'Semi Bold', figmaRgb('#7B5F00'), `Criteria ${ref_id}`, 'STRETCH');
  const heading = textNode(36, 'Bold', figmaRgb('#131313'), title, 'STRETCH');
  const descriptionText = textNode(20, 'Regular', figmaRgb('#131313'), description, 'STRETCH', 32);
  const refHeading = textNode(18, 'Semi Bold', figmaRgb('#7B5F00'), 'WCAG 2.2 Supporting documents', 'STRETCH');

  if (tags && tags.length > 0) {
    tags.forEach((tagText) => {
      const tagFrame = createAutoLayoutFrame({
        name: `_${name}-tag`,
        flexDirection: 'VERTICAL',
        padding: {left: 12, top: 8, right: 12, bottom: 8},
        backgroundColor: '#FFC300',
        borderRadius: 8,
      });
      const tag = textNode(16, 'Medium', figmaRgb('#131313'), tagText);
      tagFrame.appendChild(tag);
      tagsFrame.appendChild(tagFrame);
    });
  }

  referenceFrame.appendChild(refHeading);

  if (references && references.length > 0) {
    references.forEach((ref) => {
      const linkFrame = createAutoLayoutFrame({
        name: `_${name}-link`,
        flexDirection: 'HORIZONTAL',
        alignSelf: 'CENTER',
        gap: 12,
        backgroundColor: '#F5EDD2',
        padding: {left: 12, top: 4, right: 8, bottom: 4},
        borderRadius: 8,
      });
      const link = textNode(18, 'Regular', figmaRgb('#0084DC'), ref.title);
      link.setRangeHyperlink(0, ref.title.length, {type: 'URL', value: ref.url});
      const icon = injectSVG(linkIcon, '24', '#7B5F00');
      linkFrame.appendChild(link);
      linkFrame.appendChild(icon);
      linkWrapperFrame.appendChild(linkFrame);
    });
    referenceFrame.appendChild(linkWrapperFrame);
  }

  titleFrame.appendChild(overline);
  titleFrame.appendChild(heading);
  headerFrame.appendChild(titleFrame);
  headerFrame.appendChild(tagsFrame);
  bodyFrame.appendChild(headerFrame);
  bodyFrame.appendChild(descriptionText);
  if (brief && brief.length > 0) {
    renderContentFrames(
      bodyFrame,
      brief.map((sc) => ({title: sc.title, description: sc.description!})),
      '#7B5F00'
    );
  }
  bodyFrame.appendChild(referenceFrame);
  wrapperFrame.appendChild(bodyFrame);

  if (special_cases && special_cases.length > 0) {
    const calloutFrame = createCalloutFrame({
      name,
      icon: infoIcon,
      color: '#BE6700',
      borderColor: '#FF9820',
      titleText: 'Exceptions',
    });
    renderContentFrames(
      calloutFrame,
      special_cases.map((sc) => ({title: sc.title, description: sc.description!})),
      '#7B5F00'
    );
    bodyFrame.appendChild(calloutFrame);
  }

  if (notes && notes.length > 0) {
    const notesFrame = createCalloutFrame({
      name,
      icon: noteIcon,
      color: '#0065A8',
      borderColor: '#18A0FB',
      titleText: 'Notes',
    });
    renderContentFrames(
      notesFrame,
      notes.map((note) => ({description: note.content})),
      '#7B5F00'
    );
    bodyFrame.appendChild(notesFrame);
  }

  refComp.appendChild(wrapperFrame);
  return refComp;
}
