import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { ResultsSectionPropsType } from "./ResultsSection.types";
import numbersToWords from "number-to-words";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ResultsSection = ({ definition, index }: ResultsSectionPropsType) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        p: 1,
        mb: 1,
        backgroundColor: "hsl(255, 48%, 90%)",
        rowGap: 1,
        display: "flex",
        flexDirection: "column",
      }}>
      <Box sx={{ display: "flex", alignItems: "baseline", ml: 0.5 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          {definition.word} {numbersToWords.toOrdinal(index + 1)} homograph
        </Typography>
      </Box>

      {definition.meanings?.map((meaning, index) => {
        return (
          <Box
            key={index}
            sx={{
              borderRadius: 1,
              p: 1,
            }}>
            <Typography>Part of speech: {meaning.partOfSpeech}</Typography>
            {meaning.definitions?.map((definition, index) => {
              return (
                <Accordion
                  key={index}
                  sx={{ backgroundColor: "hsl(255, 48%, 91%)" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      {numbersToWords.toOrdinal(index + 1)} meaning:{" "}
                      {definition.definition}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Example: "{definition.example}"</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        );
      })}
    </Paper>
  );
};

export default ResultsSection;
