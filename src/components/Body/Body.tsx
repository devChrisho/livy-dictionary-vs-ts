import {
  Box,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { BodyPropsType } from "./Body.types";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ResultsSection from "./ResultsSection/ResultsSection";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Body = ({ definitions, isLoading }: BodyPropsType) => {
  const theme = useTheme();

  console.log(definitions);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}>
      {isLoading ? (
        <Paper sx={{ p: 1 }}>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Skeleton animation="wave" sx={{ width: "20ch" }} />
          </Box>
          <Box>
            <Skeleton animation="wave" sx={{ width: "10ch" }} />
            <Skeleton animation="wave" sx={{ width: "25ch" }} />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" sx={{ width: "20ch" }} />
          </Box>
        </Paper>
      ) : definitions.error ? (
        <Paper
          sx={{
            padding: 1,
            margin: 1,
            backgroundColor: "hsl(320, 100%, 94.11764705882352%)",
          }}>
          <Icon>
            <ErrorOutlineIcon />
          </Icon>
          <Typography sx={{ fontWeight: "bold" }}>
            {definitions.error.title}
          </Typography>
          <Typography>{definitions.error.message}</Typography>
          <Typography>{definitions.error.resolution}</Typography>
        </Paper>
      ) : definitions.payload && Array.isArray(definitions.payload) ? (
        <>
          {definitions.payload.length > 1 ? (
            <Paper
              sx={{
                p: 1,
                mb: 1,
                backgroundColor: "hsl(255, 48%, 90%)",
              }}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}>
                {definitions.payload[0].word}
              </Typography>{" "}
              <Typography sx={{ display: "inline" }}>
                has {definitions.payload.length} homographs
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontStyle: "italic",
                }}>
                *homographs are words that are spelt the same but have different
                meanings
              </Typography>
            </Paper>
          ) : null}

          {definitions.payload.map((definition, index) => (
            <ResultsSection
              index={index}
              definition={definition}
              key={definition.word + index}
            />
          ))}
        </>
      ) : (
        <Paper
          sx={{
            backgroundColor: theme.palette.warning.main,
            p: 2,
            mt: 1,
            display: "flex",
            width: { sm: "50%" },
            mx: "auto",
          }}>
          <FlagRoundedIcon sx={{ color: "green", mr: 1 }} />
          <Typography>Type in a word to start your word search</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Body;
