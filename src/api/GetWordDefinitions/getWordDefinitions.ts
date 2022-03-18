import axios, { AxiosResponse } from "axios";
import { GetWordDefinitionsPayload } from "./getWordDefinitionsFromAPI.types";
import { DataToUI } from "./getWordDefinitionsToUI.types";

const DICTIONARY_URL = `https://www.dictionaryapi.com/api/v3/references/sd2/json/`;
const getWordDefinitions = async (
  word: string,
  signal: AbortSignal,
): Promise<any> => {
  try {
    const response = await axios.get<GetWordDefinitionsPayload[]>(
      `${DICTIONARY_URL}${word}?key=${process.env.REACT_APP_API_KEY}`,
      { signal },
    );

    console.log("raw response:", response);
    const parsedResponse = parseResponse(response);
    const filteredResponse = filterResponse(parsedResponse, word);
    console.log("filtered response:", filteredResponse);

    if (!response.data) {
      const errMsg = `Data is null or undefined`;
      console.error(errMsg);
      throw new Error(errMsg);
    } else {
      console.log("raw:", response.data);
      const filteredResults = response.data.filter((item) => {
        const parsedHw = item.hwi.hw?.replaceAll("*", "");
        return parsedHw === word;
      });

      console.log("filtered:", filteredResults);

      if (filteredResults.length !== 0) {
      }
      const parsedResponse = filteredResults.map((item) => {
        console.log("starting to parse response");
        const proArray = () => {
          console.log("starting to parse pronunciation");
          const proItem = item.hwi.prs[0];
          const subDirectory = () => {
            console.log("sound parsing");
            const sound = proItem.sound.audio;
            const bixPattern = /^bix/g;
            const notWordPattern = /^W/g;
            const ggPatern = /^gg/g;
            if (sound && bixPattern.test(sound)) {
              return "bix";
            }
            if (sound && ggPatern.test(sound)) {
              return "gg";
            }
            if (sound && notWordPattern.test(sound)) {
              return "number";
            }
            return sound?.charAt(0);
          };

          console.log("subdirectory:", subDirectory());
          return {
            pronunciation: proItem.mw,
            sound: `https://media.merriam-webster.com/audio/prons/en/us/wav/${subDirectory()}/${
              proItem.sound.audio
            }.wav`,
          };
        };

        console.log("proArray:", proArray());

        const data = {
          id: item.meta.id || null,
          headWord: item.hwi.hw || null,
          functionalLabel: item.fl || null,
          isOffensive: item.meta.offensive,
          stems: item.meta.stems || null,
          pronunciations: proArray() || null,
          shortDefinitions: item.shortdef || null,
          definitions: item.def || null,
        };

        console.log("data:", data);

        return data;
      });

      console.log("parsed:", parsedResponse);

      return parsedResponse;
    }
  } catch (error) {
    return [];
  }
};

const parseResponse = <T>(response: AxiosResponse<T>): T => {
  if (response.data === null || response.data === undefined) {
    const errMsg = `Data is null or undefined`;
    console.error(errMsg);
    throw new Error(errMsg);
  } else {
    return response.data;
  }
};

const filterResponse = (
  parsedResponse: GetWordDefinitionsPayload[],
  word: string,
) => {
  const filteredResults = parsedResponse.filter((item) => {
    const parsedHw = item.hwi.hw?.replaceAll("*", "");
    return parsedHw === word;
  });
  return filteredResults;
};

export default getWordDefinitions;
