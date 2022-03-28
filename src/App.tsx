import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/navigation/ScrollToTop";
import MWLogo from "./lib/assets/images/MWLogo.svg";

function App() {
  const theme = useTheme();
  const [definitions, setDefinitions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState("");
  const [wordSearched, setWordSearched] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = (event: string, reason: string) => {
    if (reason && reason === "backdropClick") return;
    setOpenDialog(!openDialog);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: { lg: 820 },
        margin: "0 auto",
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[800],
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 2, lg: 0 },
      }}>
      <ScrollToTop />
      <Header
        setDefinitions={setDefinitions}
        setIsLoading={setIsLoading}
        word={word}
        setWord={setWord}
        setWordSearched={setWordSearched}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <Body
        setDefinitions={setDefinitions}
        setIsLoading={setIsLoading}
        definitions={definitions}
        isLoading={isLoading}
        wordSearched={wordSearched}
        setWordSearched={setWordSearched}
      />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        onBackdropClick={() => {}}
        sx={{ p: 1 }}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            This app is created and dedicated to my eldest daughter, Elivia Ho.
            It is named Livy's Dictionary(LD). ❤️{" "}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            App is created using React and MUI.
          </Typography>
          <img
            src={MWLogo}
            alt="MWLogo"
            height={"50px"}
            width={"50px"}
            style={{ float: "left", marginRight: 10 }}
          />
          <Typography sx={{}}>Powered by Merriam Webster API.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(!openDialog);
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
