import Searchbar from "./Searchbar";
import Categorybar from "./Categorybar";
import LoginForm from "./LoginForm";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import logo from "../../asset/icon/logo_icon.png";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  Stack,
  Icon,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightRoundSharpIcon from "@mui/icons-material/NightlightRoundSharp";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import UserAvatar from "./UserIcon";
import CountrySelector from "./CountrySelector";

const Appbar = ({ onButtonClick, preferMode }) => {
  const { user } = useContext(UserContext);

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
      <AppBar
        position="fixed"
        sx={{
          ...(!preferMode && { backgroundColor: "whitesmoke", color: "black" }),
        }}
      >
        <StyledToolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2}>
            {loading ? (
              <CircularProgress sx={{ mr: 1 }} size={24} />
            ) : (
              <Icon size={24}>
                <NewspaperIcon />
                {/* <img src={logo} alt="" /> */}
              </Icon>
            )}
            <Typography variant="h6" component="div">
              Headlines Now
            </Typography>
          </Stack>

          <Searchbar />

          <Stack direction="row" spacing={2}>
            <CountrySelector />

            <Tooltip title={preferMode ? "Light Mode" : "Dark Mode"}>
              <IconButton onClick={onButtonClick} color="inherit">
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
