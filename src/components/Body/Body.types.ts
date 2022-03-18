import { DataToUI } from "./../../api/GetWordDefinitions/getWordDefinitionsToUI.types";
export interface BodyProps {
  definitions: DataToUI[];
  isLoading: boolean;
}
