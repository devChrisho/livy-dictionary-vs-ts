import axios, { AxiosError } from "axios";
import {
  GetWordDefinitionsApiToUI,
  GetWordDefinitionsPayload,
} from "./getWordDefinitions.types";

const getWordDefinitions = async (
  word: string,
  signal: AbortSignal,
): Promise<GetWordDefinitionsApiToUI> => {
  try {
    const response = await axios.get<GetWordDefinitionsPayload[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      { signal },
    );
    return {
      payload: response.data,
      error: null,
    };
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      return {
        payload: null,
        error: err.response.data,
      };
    } else {
      return { payload: null, error: null };
    }
  }
};

export default getWordDefinitions;
