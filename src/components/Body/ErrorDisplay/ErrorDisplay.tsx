import { Paper, Icon, Typography } from "@mui/material";
import { ErrorDisplayProps } from "./ErrorDisplay.types";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorDisplay = () => {
  return (
    <>
      <Paper
        sx={{
          padding: 1,
          margin: 1,
          backgroundColor: "hsl(320, 100%, 94.11764705882352%)",
        }}>
        <Icon>
          <ErrorOutlineIcon />
        </Icon>
        <Typography sx={{ fontWeight: "bold" }}>{"No word found"}</Typography>
        <Typography>
          {
            "This word cannot be found in the dictionary. Please check the spelling and try again"
          }
        </Typography>
      </Paper>
    </>
  );
};

export default ErrorDisplay;
