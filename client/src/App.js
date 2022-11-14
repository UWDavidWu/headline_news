import {
  useState,
  useEffect,
  useMemo,
  createContext,

} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";


import Appbar from "./components/Appbar/Appbar";
import SavedNews from "./pages/SavedNews";
import Home from "./pages/Home";
import CategoryNews from "./pages/CategoryNews";
import BackToTop from "./components/Button/BackToTop";

export const UserContext = createContext();
export const QueryContext = createContext();
export const LoadingContext = createContext();
export const LocationContext = createContext();

// const SERVER_URL = "https://news-api-david.herokuapp.com";
const SERVER_URL = "http://localhost:8000";

function App() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("ca");

  const { enqueueSnackbar } = useSnackbar();
  const trigger = useScrollTrigger();
  const navigate = useNavigate();

  const userInfo = useMemo(() => ({ user, setUser }), [user, setUser]);
  const loadingInfo = useMemo(
    () => ({ loading, setLoading }),
    [loading, setLoading]
  );
  const queryInfo = useMemo(
    () => ({ query, setQuery }),
    [query, setQuery]
  );
  const locationInfo = useMemo(
    () => ({ location, setLocation }),
    [location, setLocation]
  );
  axios.defaults.withCredentials = true
   useEffect(() => {
      axios.get(`/auth/login/success`)
        .then(res => {
          if (res.data.user) {
            setUser(res.data.user);
          }
        }).catch(err => {
          console.log(err);
        })
    }, []);



  useEffect(() => {
    if (query) 
    navigate('/queryNews');
  } , [query]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    //determine if at bottom of the page
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    ) {
      enqueueSnackbar("You've reach the end");
    }
  };

  const handleQueryChange = (e) => setQuery(e.currentTarget.value);

  //determine if user prefers dark mode
  // const [preferMode, setPreferMode] = useState(
  //   useMediaQuery("(prefers-color-scheme: dark)")
  // );

  const [preferMode, setPreferMode] = useState(
   true
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferMode ? "dark" : "light",
        },
      }),
    [preferMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LoadingContext.Provider value={loadingInfo}>
        <UserContext.Provider value={userInfo}>
          <LocationContext.Provider value={locationInfo}>
            <QueryContext.Provider value={queryInfo}>
            <Appbar
              onButtonClick={() => setPreferMode(!preferMode)}
              preferMode={preferMode}
              // loading={loading}
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/saved" element={<SavedNews />} />
              <Route path="/queryNews" element={<CategoryNews q={query} />} />
              <Route
                key="/business"
                path="/business"
                element={<CategoryNews cate="business" />}
              />
              <Route
                key="/entertainment"
                path="/entertainment"
                element={<CategoryNews cate="entertainment" />}
              />
              <Route
                key="/general"
                path="/general"
                element={<CategoryNews cate="general" />}
              />
              <Route path="/health" element={<CategoryNews cate="health" />} />
              <Route
                key="/science"
                path="/science"
                element={<CategoryNews cate="science" />}
              />
              <Route 
                key="/sports"
              path="/sports" 
                
              element={<CategoryNews cate="sports" />} />
              <Route
                key="/technology"
                path="/technology"
                element={<CategoryNews cate="technology" />}
              />
            </Routes>
            </QueryContext.Provider>
          </LocationContext.Provider>
        </UserContext.Provider>
      </LoadingContext.Provider>
      <BackToTop trigger={trigger} />
    </ThemeProvider>
  );
}

export default App;
