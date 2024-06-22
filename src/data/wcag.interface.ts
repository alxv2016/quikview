/* https://github.com/tenon-io/wcag-as-json/blob/master/wcag.json */

interface RootObject {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  guidelines: Guideline[];
}

interface Guideline {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  references: Reference[];
  success_criteria: Successcriterion[];
}

interface Successcriterion {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  level: string;
  special_cases:
    | (Specialcase | Specialcases2[] | Specialcase[] | Specialcases4[] | null)[]
    | Specialcase[]
    | Specialcase[]
    | Specialcases4[]
    | Specialcases4[]
    | Specialcases4[]
    | null
    | null
    | null
    | null
    | null
    | null
    | null;
  notes: (Note[] | null)[];
  references: Reference[];
}

interface Note {
  content: string;
}

interface Specialcases4 {
  type: string;
  title: string;
}

interface Specialcases2 {
  type: string;
  title: string;
  description?: string;
}

interface Specialcase {
  type: string;
  title: string;
  description: string;
}

interface Reference {
  title: string;
  url: string;
}
