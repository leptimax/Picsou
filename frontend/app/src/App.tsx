import React, { useState, FC, createContext } from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline, IconButton, PaletteMode } from "@mui/material";
import {Cookies} from "react-cookie"
import {Brightness7, Brightness4, } from "@mui/icons-material";

import { Home } from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";



export const SearchContext = createContext({});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export const App: FC = () => {

  const cookies = new Cookies();
  const [themeMode, setThemeMode] = useState<PaletteMode>(cookies.get("theme") || "dark");

  // const theme = createTheme({
    
  //   palette:{
  //     mode: themeMode,
  //     secondary:{
  //       main: "#5a68e5",
  //       light: "#9196ff",
  //       dark: "#0d3eb2",
  //       contrastText: "#000000",
  //     },
  //     primary:{
  //       main: "#d0d0d0",
  //       light: "#ac6000",
  //       dark: "#ffbe4c",
  //       contrastText: "#000000",
  //     },
  //   },
  //   components: {
  //     MuiAutocomplete:{
  //       styleOverrides:{
  //         popper:{zIndex:1300}
  //       }
  //     },
  //     MuiCard: {
  //       styleOverrides:{
  //         root:{
  //           borderRadius: "14px",
  //         },
  //       },
  //     },
  //     MuiSkeleton:{
  //       styleOverrides:{
  //         root:{
  //           borderRadius:"14px",
  //         },
  //       },
  //     },
  //     MuiDialog:{
  //       styleOverrides:{
  //         paper:{
  //           borderRadius:"14px",
  //         },
  //       },
  //     },
  //     MuiCssBaseline:{
  //       styleOverrides:{
  //         body:{
  //           background:
  //             themeMode === 'light' ? 'linear-gradient(to left bottom, #ffbe4c, #7375c1)'
  //                                   : 'linear-gradient(to left bottom, #ac6000, #0b2362)',
  //         },//#1bc652 #fce325
  //       },//#0e962b #b3a921
  //     },
  //   },

  // });



  return (
    // <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
      <IconButton color="inherit" sx={{position: "fixed", right:25, top:25, zIndex: 5}} onClick={() => {
        let newTheme: PaletteMode = themeMode === "dark" ? "light" : "dark";
        setThemeMode(newTheme);
        cookies.set("theme", newTheme);
      }}>
        {cookies.get("theme") === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
        <QueryClientProvider client={queryClient}>
          <Router>
            {/* <QueryParamProvider ReactRouterRoute={Route}> */}
            <Container
            
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
                <Container className="test">
                {/* <SideBar onAuthUpdate={onAuthUpdate}/> */}
                <Switch>
                  <Route exact path="/" component={() => <Home />} />
                  </Switch>
                </Container>
            </Container>
          </Router>
        </QueryClientProvider>
      </CssBaseline>
    // </ThemeProvider>
  );
};

export default App;
