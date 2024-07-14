export interface WCAGRefs {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  version: string;
  supporting_docs: SupportingDoc[];
}

export interface SupportingDoc {
  ref_id: string;
  title: string;
  description: string;
  url: string;
}
