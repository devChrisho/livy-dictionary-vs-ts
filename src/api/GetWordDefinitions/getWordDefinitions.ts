import axios from "axios";
import { GetWordDefinitionsPayload } from "./getWordDefinitionsFromAPI.types";

const getWordDefinitions = async (
  word: string,
  signal: AbortSignal,
): Promise<any> => {
  try {
    const response = await axios.get<GetWordDefinitionsPayload[]>(
      `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${process.env.REACT_APP_API_KEY}`,
      { signal },
    );
    console.log(response);

    if (response.data === null || response.data === undefined) {
      const errMsg = `Data is null or undefined`;
      console.error(errMsg);
      throw new Error(errMsg);
    } else {
      console.log("raw:", response.data);
      const filteredResults = response.data.filter((item) => {
        return item.hwi.hw === word;
      });

      console.log("filtered:", filteredResults);
      return filteredResults;
    }
  } catch (error) {
    return [];
  }
};

export default getWordDefinitions;
