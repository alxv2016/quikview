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
