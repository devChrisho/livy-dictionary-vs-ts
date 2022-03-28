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
import Logo from "../../lib/assets/images/livy.svg";
import InfoIcon from "@mui/icons-material/Info";
import { HeaderPropsType } from "./Header.types";
import getWordDefinitions from "../../api/GetWordDefinitions/getWordDefinitions";

let controller: AbortController;
const Header = ({
  word,
  setDefinitions,
  setIsLoading,
  setWord,
  setWordSearched,
  openDialog,
  setOpenDialog,
}: HeaderPropsType) => {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const onSubmit = async () => {
    setWordSearched(word);
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
          autoComplete="off"
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
            if (event.key.toLowerCase() === "enter" && word) {
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
                  if (word) {
                    setIsLoading(true);
                    onSubmit();
                  }
                }}
                onMouseDown={handleMouseDown}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <InfoIcon
        sx={{
          color: theme.palette.grey[600],
          transition: "all 0.5s ease",
          fontSize: { xs: "20px", sm: "30px" },
          cursor: "pointer",
          ":hover": {
            color: "#5338A1",
            transition: "all 0.5s ease",
          },
        }}
        onClick={() => {
          setOpenDialog(!openDialog);
        }}
      />
    </Box>
  );
};

export default Header;
