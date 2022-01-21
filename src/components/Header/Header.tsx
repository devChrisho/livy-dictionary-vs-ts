import { Box, Typography, useTheme } from "@mui/material";
import Logo from "../../lib/assets/images/livy.svg";

const Header = () => {
  const theme = useTheme();
  return (
    <Box
      p={1}
      sx={{
        height: 75,
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.primary,
      }}>
      <Box component="img" src={Logo} alt="logo" sx={{ height: 75 }} />

      <Typography sx={{ fontSize: 36, color: "primary" }}>
        Livy's Dictionary
      </Typography>
    </Box>
  );
};

export default Header;
