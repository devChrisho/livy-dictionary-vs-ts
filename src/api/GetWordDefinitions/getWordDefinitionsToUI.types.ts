export interface DataToUI {
  id: string | null;
  headWord: string | null;
  functionalLabel: string | null;
  isOffensive: boolean;
  stems: string[] | null;
  pronunciations: {
    pronunciation: string | null;
    sound: string | null;
  } | null;
  shortDefinitions: string[];
  definitions: any;
}
