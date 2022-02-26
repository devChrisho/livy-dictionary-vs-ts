import { GetWordDefinitionsApiToUI } from "../../api/GetWordDefinitions/getWordDefinitions.types";

export interface BodyPropsType {
  definitions: GetWordDefinitionsApiToUI;
  isLoading: boolean;
}
