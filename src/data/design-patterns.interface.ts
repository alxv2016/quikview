interface DesignPatterns {
  patterns: Pattern[];
}

interface Pattern {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  design_pattern: DesignPattern;
}

interface DesignPattern {
  title: string;
  descriptions: string[];
  notes: PatternNotes;
  Examples: PatternExample[];
  functionality: Functionality;
  acceptance_criteria: AcceptanceCriteria;
}

interface AcceptanceCriteria {
  title: string;
  requirements: Requirement[];
}

interface Requirement {
  property: string;
  critiera?: string;
  notes: string[] | null;
  criteria?: string;
}

interface Functionality {
  title: string;
  description: string | null;
  interactions: Interaction[] | null;
}

interface Interaction {
  keys: string;
  actions: string[];
}

interface PatternExample {
  title: string;
  description: string;
  url: string;
}

interface PatternNotes {
  title: string;
  description: string;
  terms: Term[];
}

interface Term {
  title: string;
  description: string;
}
