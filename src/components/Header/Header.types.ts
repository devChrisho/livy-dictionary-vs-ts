import { GetWordDefinitionsPayload } from "../../api/GetWordDefinitions/getWordDefinitionsFromAPI.types";
import { Dispatch, SetStateAction } from "react";

export interface HeaderPropsType {
  setDefinitions: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
