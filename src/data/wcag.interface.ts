/* https://github.com/tenon-io/wcag-as-json/blob/master/wcag.json */

export interface Criterion {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  guidelines: Guideline[];
}

export interface Guideline {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  references: Reference[];
  success_criteria?: Successcriterion[];
}

export interface Successcriterion {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  level: string;
  brief?: Brief[];
  special_cases?: Specialcase[] | null;
  notes?: Note[] | null;
  references: Reference[];
  tags?: string[];
}

export interface Brief {
  title: string;
  description: string;
}

export interface Note {
  content: string;
}

export interface Specialcase {
  type: string;
  title?: string;
  description?: string;
}

export interface Reference {
  title: string;
  url: string;
}
