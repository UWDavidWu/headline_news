import Searchbar from "./Searchbar";
import Categorybar from "./Categorybar";
import LoginForm from "./LoginForm";
import { UserContext } from "../../App";
import { useContext, useState } from "react";

import { styled,useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  Stack,
} from "@mui/material";



import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightRoundSharpIcon from "@mui/icons-material/NightlightRoundSharp";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import UserAvatar from "./UserIcon";
import CountrySelector from "./CountrySelector";



const Appbar = ({ onButtonClick, preferMode, query, setQuery }) => {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "flex-start",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    "@media all": {
      minHeight: 125,
    },
  }));

  return (
    <Box sx={{ flexGrow: 1, display: "block" }}>
      <AppBar position="fixed" color="primary">
        <StyledToolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2}>
            {loading ? (
              <CircularProgress sx={{ mr: 1 }} size={24} />
            ) : (
              <NewspaperIcon sx={{ fontSize: "2rem", paddingRight: "10px" }} />
            )}
            <Typography variant="h6" component="div">
              News
            </Typography>
          </Stack>
          
          <Searchbar  query={query} setQuery={setQuery} />

          <Stack direction="row" spacing={2}>
          
            <CountrySelector />
            
            <Tooltip title={preferMode ? "Light Mode" : "Dark Mode"}>
              <IconButton onClick={onButtonClick}>
                {preferMode ? (
                  <Brightness7Icon />
                ) : (
                  <NightlightRoundSharpIcon />
                )}
              </IconButton>
            </Tooltip>

            {user ? <UserAvatar /> : <LoginForm />}
          </Stack>

          <Categorybar />
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
