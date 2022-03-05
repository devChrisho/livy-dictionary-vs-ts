import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/navigation/ScrollToTop";

function App() {
  const theme = useTheme();
  const [definitions, setDefinitions] = useState<any>(null);
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
        borderRadius: { xs: 2, lg: 0 },
      }}>
      <ScrollToTop />
      <Header setDefinitions={setDefinitions} setIsLoading={setIsLoading} />
      {/* <Body definitions={definitions} isLoading={isLoading} /> */}
    </Box>
  );
}

export default App;
