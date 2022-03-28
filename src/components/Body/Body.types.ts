import { Dispatch, SetStateAction } from "react";
import { DataToUI } from "./../../api/GetWordDefinitions/getWordDefinitionsToUI.types";
export interface BodyProps {
  setDefinitions: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setWordSearched: Dispatch<SetStateAction<string>>;
  wordSearched: string;
  definitions: DataToUI | null;
  isLoading: boolean;
}
