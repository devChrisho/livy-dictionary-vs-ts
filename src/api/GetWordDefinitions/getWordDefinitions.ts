import axios, { AxiosResponse } from "axios";
import { GetWordDefinitionsPayload } from "./getWordDefinitionsFromAPI.types";
import { DataToUI } from "./getWordDefinitionsToUI.types";

const DICTIONARY_URL = `https://www.dictionaryapi.com/api/v3/references/sd2/json/`;
const getWordDefinitions = async (
  word: string,
  signal: AbortSignal,
): Promise<DataToUI> => {
  try {
    const response = await axios.get<GetWordDefinitionsPayload[]>(
      `${DICTIONARY_URL}${word}?key=${process.env.REACT_APP_API_KEY}`,
      { signal },
    );

    const parsedResponse = parseResponse(response);
    if (parsedResponse[0].hwi) {
      const filteredResponse = filterResponse(parsedResponse, word);
      console.log({ filteredResponse });
      const mappedResponse = mapResponse(filteredResponse);
      return mappedResponse;
    } else {
      return {
        headWord: null,
        isOffensive: false,
        pronunciation: {
          syllabic: null,
          sound: null,
        },
        defList: [
          {
            id: null,
            function: null,
            definitions: [],
            variations: null,
          },
        ],
        isMisSpelled: true,
        spellingSuggestions: parsedResponse,
      };
    }
  } catch (error) {
    return {
      headWord: null,
      isOffensive: false,
      pronunciation: {
        syllabic: null,
        sound: null,
      },
      defList: [
        {
          id: null,
          function: null,
          definitions: [],
          variations: null,
        },
      ],
      isMisSpelled: false,
      spellingSuggestions: null,
    };
  }
};

const mapResponse = (itemsList: GetWordDefinitionsPayload[]): DataToUI => {
  return {
    headWord: itemsList[0].hwi.hw
      ? itemsList[0].hwi.hw.replaceAll("*", "")
      : null,
    isOffensive: itemsList[0].meta.offensive,
    pronunciation: proArray(itemsList[0]),
    defList: mapDefList(itemsList),
    isMisSpelled: false,
    spellingSuggestions: null,
  };
};

const mapDefList = (itemsList: GetWordDefinitionsPayload[]) => {
  return itemsList.map((item) => {
    return {
      id: item.meta.id,
      function: item.fl,
      definitions: item.shortdef,
      variations: item.meta.stems,
    };
  });
};

const parseResponse = <T>(response: AxiosResponse<T>): T => {
  if (!response.data) {
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

const subDirectory = (sound: string) => {
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

const proArray = (item: GetWordDefinitionsPayload) => {
  const proItem = item.hwi.prs[0];
  const sound = proItem.sound.audio || "";

  return {
    syllabic: item.hwi.hw ? item.hwi.hw.replaceAll("*", "-") : "",
    sound: `https://media.merriam-webster.com/audio/prons/en/us/wav/${subDirectory(
      sound,
    )}/${proItem.sound.audio}.wav`,
  };
};

export default getWordDefinitions;
