import { GetWordDefinitionsPayload } from "../../../api/GetWordDefinitions/getWordDefinitions.types";

export interface ResultsSectionPropsType {
  definition: GetWordDefinitionsPayload;
  index: number;
}
