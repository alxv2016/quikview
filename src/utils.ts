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

export function generateUniqueId(length: number): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2);
  const id = `${timestamp}-${random}`;

  if (length <= id.length) {
    return id.substr(0, length);
  }

  // If the desired length is longer than the generated ID,
  // repeat the random part to meet the length requirement
  const extraLength = length - id.length;
  const extraRandom = Math.random().toString(36).substr(2, extraLength);

  return id + extraRandom;
}
