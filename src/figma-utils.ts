import {processSVG, clone} from './utils';

export function injectSVG(icon: string, size: string, color: string) {
  return figma.createNodeFromSvg(processSVG({icon, color, size}));
}

export function notify(message: string) {
  figma.notify(message, {timeout: 275});
}

/* Load Figma fonts */
export async function loadFonts(fonts: Array<FontName>) {
  const promises = fonts.map((font) => figma.loadFontAsync(font));
  await Promise.all(promises);
  return fonts;
}

export const figmaRgb = figma.util.rgb;

export function stroke(
  node: FrameNode | ComponentNode | InstanceNode,
  strokeAlign: 'OUTSIDE' | 'CENTER' | 'INSIDE',
  weight: number,
  color: RGB,
  opacity: number,
  sides?: string[],
  vector?: boolean
) {
  const strokes = node.strokes.concat();
  strokes.push({
    blendMode: 'NORMAL',
    color,
    opacity,
    type: 'SOLID',
    visible: true,
  });
  node.strokeWeight = sides ? 0 : weight;
  node.strokeAlign = strokeAlign;
  if (vector) {
    node.strokeWeight = weight;
  }

  if (!vector && sides && sides.length !== 0) {
    sides.forEach((side) => {
      switch (true) {
        case side === 'TOP':
          node.strokeTopWeight = weight;
          break;
        case side === 'RIGHT':
          node.strokeLeftWeight = weight;
          break;
        case side === 'BOTTOM':
          node.strokeBottomWeight = weight;
          break;
        case side === 'LEFT':
          node.strokeLeftWeight = weight;
          break;
      }
    });
  }
  node.strokes = strokes;
  return node;
}

export function textNode(
  size: number,
  weight: string,
  color: RGB,
  characters: string,
  align?: 'STRETCH' | 'MIN' | 'MAX' | null,
  lineHeight?: number | null
) {
  const textNode = figma.createText();
  textNode.fontName = {family: 'Inter', style: weight};
  if (align) {
    textNode.layoutAlign = align;
  }
  if (lineHeight) {
    textNode.lineHeight = {
      value: lineHeight,
      unit: 'PIXELS',
    };
  }
  textNode.characters = characters;
  textNode.fontSize = size;
  textNode.fills = [{type: 'SOLID', color}];
  return textNode;
}

function preventCollision(name: string, spacing: number): void {
  // Get the existing elements with the specified name and type on the current page
  const existingElements = figma.currentPage.findChildren((n) => n.name === name && n.type === 'INSTANCE');
  // Iterate over each object in the existingElements array
  for (let i = 0; i < existingElements.length; i++) {
    const node1 = existingElements[i];
    const node1BoundingRec = node1.absoluteBoundingBox as Rect;
    // Compare the current object with every other object in the array, excluding itself
    for (let j = 0; j < existingElements.length; j++) {
      if (i === j) continue;

      const node2 = existingElements[j];
      const node2BoundingRec = node2.absoluteBoundingBox as Rect;
      // Calculate the distance between the two objects
      const dx = node2BoundingRec.x - node1BoundingRec.x;
      const dy = node2BoundingRec.y - node1BoundingRec.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if the distance is less than the sum of their radii (half of their heights)
      if (distance < node2BoundingRec.height / 2 + node1BoundingRec.height / 2) {
        // Adjust the y position of the colliding object to prevent overlap
        node2.y = node1BoundingRec.y + node2BoundingRec.height + spacing;
      }
    }
  }
}

export function createInstance(node: ComponentNode): InstanceNode {
  const nodeInstance = node.createInstance();
  node.remove();
  return nodeInstance;
}

function nodeFill(fills: any, color: RGB | RGBA): any {
  const newFills = clone(fills);
  newFills[0].color = color;
  return newFills;
}

function scrollAndZoomIntoView(instance: BaseNode[], message: string) {
  figma.viewport.scrollAndZoomIntoView(instance);
  figma.notify(message);
}

function handleSelectionChange(): SceneNode | null {
  const selections = figma.currentPage.selection;
  if (selections.length !== 0) {
    return selections[0];
  }
  return null;
}
