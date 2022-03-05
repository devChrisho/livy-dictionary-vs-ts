export interface GetWordDefinitionsPayload {
  meta: {
    id: string | null;
    uuid: string | null;
    src: string | null;
    sections: string | null;
    stems: string[] | null;
    offensive: boolean;
  };
  hom: number;
  hwi: {
    hw: string | null;
    prs: Pronunciation[];
  };
  fl: string | null;
  def: Definitions[] | null;
  history: History;
  shortdef: string[];
}

export interface History {
  pl: string | null;
  pt: [string[]];
}

export interface Definitions {
  sseq: SSEQ[][];
}

export interface SSEQ {
  [index: string]: {
    sn: string | null;
    dt: [string[], [string, { t: string | null }[]]];
  };
}

export interface Pronunciation {
  mw: string | null;
  sound: {
    audio: string | null;
  };
}
