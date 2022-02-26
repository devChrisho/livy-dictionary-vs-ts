import { GetWordDefinitionsApiToUI } from "./../../api/GetWordDefinitions/getWordDefinitions.types";
import { Dispatch, SetStateAction } from "react";

export interface HeaderPropsType {
  setDefinitions: Dispatch<SetStateAction<GetWordDefinitionsApiToUI>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
