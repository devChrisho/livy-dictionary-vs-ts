import { Box, Paper, Typography } from "@mui/material";
import { CircleLoader } from "react-spinners";
import getWordDefinitions from "../../api/GetWordDefinitions/getWordDefinitions";
import { BodyProps } from "./Body.types";
import IntroSection from "./IntroSection/IntroSection";
import HearingIcon from "@mui/icons-material/Hearing";

let controller: AbortController;
const Body = ({
  setDefinitions,
  setIsLoading,
  definitions,
  isLoading,
  wordSearched,
  setWordSearched,
}: BodyProps) => {
  const onSubmit = async (word: string) => {
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;

    const response = await getWordDefinitions(word, signal);
    setDefinitions(response);
    setIsLoading(false);
    setWordSearched(word);
  };

  const audio = new Audio(
    definitions?.pronunciation.sound ? definitions.pronunciation.sound : "",
  );

  const startAudio = () => {
    audio.play();
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircleLoader />
        </Box>
      ) : definitions?.isMisSpelled ? (
        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                display: "inline-block",
                fontWeight: "bold",
                textDecoration: "italics",
              }}>
              "{wordSearched}"
            </Typography>{" "}
            <Typography sx={{ display: "inline-block" }}>
              {" "}
              could not be found
            </Typography>
          </Box>
          <Typography>Did you mean: </Typography>
          {definitions.spellingSuggestions.map(
            (item: string, index: number) => {
              return (
                <Typography
                  key={item}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    display: "inline-block",
                    marginLeft: "5px",
                  }}
                  onClick={() => onSubmit(item)}>
                  {item}
                  {index !== definitions.spellingSuggestions.length - 1
                    ? ","
                    : "."}{" "}
                </Typography>
              );
            },
          )}
        </Box>
      ) : definitions?.headWord === null ? (
        <Box>
          <Typography>Unable to find word. Please try another word</Typography>
        </Box>
      ) : definitions ? (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Word: {definitions.headWord}
          </Typography>
          <Typography sx={{ display: "inline-block" }}>
            Syllabic: {definitions.pronunciation.syllabic}
          </Typography>

          <HearingIcon
            onClick={startAudio}
            sx={{
              display: "inline-block",
              marginLeft: 2,
              cursor: "help",
              color: "green",
            }}
          />
          {definitions.defList.map((item) => {
            return (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  m: 1,
                }}>
                <Typography>{item.function}</Typography>
                <ol>
                  {item.definitions.map((definition, index) => {
                    return (
                      <li
                        key={"definition" + index}
                        style={{ color: "#775093" }}>
                        {definition}
                      </li>
                    );
                  })}
                </ol>
              </Paper>
            );
          })}
          <Typography></Typography>

          <IntroSection />
        </Box>
      ) : null}
    </>
  );
};

export default Body;
