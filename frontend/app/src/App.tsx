import React, { useState, FC, createContext, useEffect } from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline, IconButton, PaletteMode } from "@mui/material";
import {Cookies} from "react-cookie"
import {Brightness7, Brightness4, } from "@mui/icons-material";

import { Home } from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { Test } from "./components/Test";
import { SideBar } from "./components/Sidebar";
import { Authentication } from "./components/AuthenticationPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { RefreshToken } from "./utils/Auth";
import { AddTransaction } from "./components/AddTransaction";


export const AuthContext = createContext({});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export const App: FC = () => {

  const cookies = new Cookies();
  const [themeMode, setThemeMode] = useState<PaletteMode>(cookies.get("theme") || "dark");

  const [user,setUser] = useState(undefined)
  const [connect,setConnect] = useState(false)
  console.log("dans le App : ", process.env["REACT_APP_API_KEY"])



  useEffect(() => {
    const tempInfo = JSON.parse(localStorage.getItem("user"))
    if(tempInfo === null){
      setConnect(false)
    }
    else{
      setUser(tempInfo)
      setConnect(true)
    }
    console.log(tempInfo === null)
  },[])


  RefreshToken()


  

  const theme = createTheme({
    
    palette:{
      mode: themeMode,
      secondary:{
        main: "#5a68e5",
        light: "#9196ff",
        dark: "#0d3eb2",
        contrastText: "#000000",
      },
      primary:{
        main: "#d0d0d0",
        light: "#ac6000",
        dark: "#ffbe4c",
        contrastText: "#000000",
      },
    },
    components: {
      MuiAutocomplete:{
        styleOverrides:{
          popper:{zIndex:1300}
        }
      },
      MuiCard: {
        styleOverrides:{
          root:{
            borderRadius: "14px",
          },
        },
      },
      MuiSkeleton:{
        styleOverrides:{
          root:{
            borderRadius:"14px",
          },
        },
      },
      MuiDialog:{
        styleOverrides:{
          paper:{
            borderRadius:"14px",
          },
        },
      },
      MuiCssBaseline:{
        styleOverrides:{
          body:{
            background:
              
              themeMode === 'light' ? 'linear-gradient(to left bottom, #ffbe4c, #7375c1)'
                                    : 'linear-gradient(to left bottom, #ac6000, #0b2362)',
          },//#1bc652 #fce325
        },//#0e962b #b3a921
      },
    },

  });



  return (
    <ThemeProvider theme={theme}>
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
                backgroundRepeat:"no-repeat",
                backgroundAttachment:"fixed !important",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
              <AuthContext.Provider value={{user}}>
                {connect ? (
                <Container className="test">
                  <SideBar setConnect={setConnect}/>
                  <Switch>
                    <Route exact path="/" component={() => <Home />} />
                    <Route exact path="/add" component={() => <AddTransaction /> }/>
                    <Route exact path="/test" component={() => <Test /> }/>
                  </Switch>
                </Container> 
                ) : (
                
                  <Authentication setUser={setUser} setConnect={setConnect}/>
                  )
                  
              }
              </AuthContext.Provider>
            </Container>
          </Router>
        </QueryClientProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
