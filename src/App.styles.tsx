import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      minHeight: "100vh",
      backgroundColor: theme.palette.grey[50],
    },
  });
});

export { useStyles };
