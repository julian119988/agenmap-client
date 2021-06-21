import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import StayInfo from "./components/StayInfo/StayInfo";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import themes from "./config/themes";
import Navbar from "./components/Navbar/Navbar";
import { useUserLoggedin } from "./services/auth";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Profile from "./components/Profile/Profile";

export const UserContext = createContext();

const GlobalStyle = createGlobalStyle`


html,
body,
#root {
    min-height: calc(${(props) => props.theme.vh} * 100px);
    height: 100%;
    height: -moz-available;
    height: -webkit-fill-available;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.backgroundColor};
}
* {
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
}


`;

export function App() {
  const [theme, setSelectedTheme] = useState(themes.light);
  const [image, setImage] = useState(sun);
  const [userLoggedIn, setUserLoggedIn] = useState(undefined);
  const user = useUserLoggedin();

  function changeTheme() {
    if (theme === themes.light) {
      setSelectedTheme(themes.dark);
      setImage(moon);
      localStorage.setItem("agenmapTheme", "dark");
    } else {
      setSelectedTheme(themes.light);
      setImage(sun);
      localStorage.setItem("agenmapTheme", "light");
    }
  }
  function retrieveSelectedTheme() {
    let currentTheme = localStorage.getItem("agenmapTheme");
    if (currentTheme === "dark") {
      setSelectedTheme(themes.dark);
      setImage(moon);
    }
  }
  useEffect(() => {
    retrieveSelectedTheme();
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      setUserLoggedIn(user);
    }
  }, [user]);

  return (
    <UserContext.Provider value={userLoggedIn}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <ReactNotification />
          <Navbar changeTheme={changeTheme} image={image} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/stay/:id" component={StayInfo} />
            <Route path="/profile/:id" component={Profile} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
