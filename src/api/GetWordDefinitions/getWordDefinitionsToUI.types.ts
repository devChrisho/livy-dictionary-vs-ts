export interface DataToUI {
  headWord: string | null;
  isOffensive: boolean;
  pronunciation: {
    syllabic: string | null;
    sound: string | null;
  };
  defList: {
    id: string | null;
    function: string | null;
    definitions: string[];
    variations: string[] | null;
  }[];
  isMisSpelled: boolean;
  spellingSuggestions: any;
}
