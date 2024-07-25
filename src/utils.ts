import {Criterion, Guideline, Successcriterion} from './data/wcag.interface';

export function extractSuccessCriteria(dataset: Criterion[]) {
  let result: Successcriterion[] = [];

  function traverse(node: any): void {
    if (Array.isArray(node)) {
      node.forEach((item) => traverse(item));
    } else if (typeof node === 'object' && node !== null) {
      if (node.hasOwnProperty('success_criteria')) {
        result = result.concat(node.success_criteria);
      }
      Object.values(node).forEach((value) => traverse(value));
    }
  }

  traverse(dataset);
  return result;
}

export function extractGuidelines(dataset: Guideline[]) {
  let result: Successcriterion[] = [];

  function traverse(node: any): void {
    if (Array.isArray(node)) {
      node.forEach((item) => traverse(item));
    } else if (typeof node === 'object' && node !== null) {
      if (node.hasOwnProperty('success_criteria')) {
        result = result.concat(node.success_criteria);
        // result = result.concat(
        //   node.guidelines.map((guideline: Guideline) => {
        //     const {success_criteria, ...rest} = guideline;
        //     return rest;
        //   })
        // );
      }
      Object.values(node).forEach((value) => traverse(value));
    }
  }

  traverse(dataset);
  return result;
}

/* Converts Hex to HSL values */
export function hexToHSL(hex: string) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length == 4) {
    r = Number('0x' + hex[1] + hex[1]);
    g = Number('0x' + hex[2] + hex[2]);
    b = Number('0x' + hex[3] + hex[3]);
  } else if (hex.length == 7) {
    r = Number('0x' + hex[1] + hex[2]);
    g = Number('0x' + hex[3] + hex[4]);
    b = Number('0x' + hex[5] + hex[6]);
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

/* Converts HSL to Hex values */
export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/* Inject SVG with custom color and size */
export function processSVG({icon, color, size}: {icon: string; color: string; size: string}): string {
  return icon.replace(/\$size\$/g, size).replace(/\$color\$/g, color);
}

/* Deep clone */
export function clone(val: any): any {
  const type = typeof val;
  if (
    type === 'undefined' ||
    type === 'number' ||
    type === 'string' ||
    type === 'boolean' ||
    type === 'symbol' ||
    val === null
  ) {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(clone);
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      const obj: any = {};
      for (const key in val) {
        obj[key] = clone(val[key]);
      }
      return obj;
    }
  }

  throw 'unknown';
}
