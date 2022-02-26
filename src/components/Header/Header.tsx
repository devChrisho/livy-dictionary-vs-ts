import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Logo from "../../lib/assets/images/livy.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import { keyframes } from "@mui/system";
import { HeaderPropsType } from "./Header.types";
import getWordDefinitions from "../../api/GetWordDefinitions/getWordDefinitions";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

let controller: AbortController;
const Header = ({ setDefinitions, setIsLoading }: HeaderPropsType) => {
  const theme = useTheme();
  const [word, setWord] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const onSubmit = async () => {
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;

    const response = await getWordDefinitions(word, signal);
    setDefinitions(response);
    setWord("");
    setIsLoading(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      p={1}
      sx={{
        height: { xs: 60, sm: 75 },
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        pt: 2,
        borderBottom: `1px solid hsla(200, 65%, 75%, 1)`,
      }}>
      <Box
        component="img"
        src={Logo}
        alt="logo"
        sx={{ height: { xs: 40, sm: 60 } }}
      />

      <FormControl sx={{ m: 1, flex: { xs: 1, sm: 0.5 } }} variant="outlined">
        <InputLabel htmlFor="word-search">Word Search</InputLabel>

        <OutlinedInput
          id="word-search"
          label="Word Search"
          type={"text"}
          value={word}
          autoFocus={true}
          sx={{
            borderRadius: 30,
          }}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key.toLowerCase() === "enter") {
              setIsLoading(true);
              onSubmit();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => {
                  setIsLoading(true);
                  onSubmit();
                }}
                onMouseDown={handleMouseDown}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <SettingsIcon
        sx={{
          color: theme.palette.grey[600],
          transition: "all 0.5s ease",
          fontSize: { xs: "20px", sm: "30px" },
          cursor: "pointer",
          animation: `${spin} 15s infinite linear`,
          animationPlayState: "paused",
          ":hover": {
            color: "#5338A1",
            transition: "all 0.5s ease",
            animationPlayState: "running",
          },
        }}
      />
    </Box>
  );
};

export default Header;
