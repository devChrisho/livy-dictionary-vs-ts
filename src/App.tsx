import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { GetWordDefinitionsApiToUI } from "./api/GetWordDefinitions/getWordDefinitions.types";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/navigation/ScrollToTop";

function App() {
  const theme = useTheme();
  const [definitions, setDefinitions] = useState<GetWordDefinitionsApiToUI>({
    payload: null,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);

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
      }}>
      <ScrollToTop />
      <Header setDefinitions={setDefinitions} setIsLoading={setIsLoading} />
      <Body definitions={definitions} isLoading={isLoading} />
    </Box>
  );
}

export default App;
