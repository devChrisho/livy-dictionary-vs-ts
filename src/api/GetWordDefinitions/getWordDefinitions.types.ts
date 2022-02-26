export interface GetWordDefinitionsApiToUI {
  payload: GetWordDefinitionsPayload[] | null;
  error: errorType | null;
}

export interface GetWordDefinitionsPayload {
  word: string;
  phonetic: string | null;
  origin: string | null;
  meanings: meaningType[] | null;
}

export interface meaningType {
  definitions: definitionType[] | null;
  partOfSpeech: string | null;
}

export interface definitionType {
  antonyms: string[] | null;
  definition: string | null;
  example: string | null;
  synonyms: string[] | null;
}

export interface errorType {
  message: string | null;
  resolution: string | null;
  title: string | null;
}
