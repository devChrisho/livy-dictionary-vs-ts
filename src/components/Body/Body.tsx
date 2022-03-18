import { Box, Paper, Typography } from "@mui/material";
import { CircleLoader } from "react-spinners";
import { BodyProps } from "./Body.types";
import IntroSection from "./IntroSection/IntroSection";
import HearingIcon from "@mui/icons-material/Hearing";

const Body = ({ definitions, isLoading }: BodyProps) => {
  //   const audio = new Audio(definitions[0].pronunciations?.sound || "");

  //   const startAudio = () => {
  //     audio.play();
  //   };

  return (
    <>
      {isLoading ? (
        <CircleLoader />
      ) : definitions.length !== 0 ? (
        <Box>
          <Paper>
            <Typography>
              Word: {definitions[0].headWord?.replaceAll("*", "")}
            </Typography>

            {/* <HearingIcon onClick={startAudio} /> */}

            {/* <Typography>
              Syllables: {definitions[0].headWord?.replaceAll("*", " - ")}
            </Typography> */}
            {/* {definitions[0].pronunciations && (
              <Typography>
                Pronunciation: {definitions[0].pronunciations.pronunciation}
              </Typography>
            )} */}
          </Paper>
          <IntroSection />
        </Box>
      ) : null}
    </>
  );
};

export default Body;
