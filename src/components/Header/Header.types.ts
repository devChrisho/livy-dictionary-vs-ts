import { Dispatch, SetStateAction } from "react";

export interface HeaderPropsType {
  word: string;
  setDefinitions: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setWord: Dispatch<SetStateAction<string>>;
  setWordSearched: Dispatch<SetStateAction<string>>;
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}
