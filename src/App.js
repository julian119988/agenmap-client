import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";
import styled from "styled-components";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
import "./app.scss";

const theme = {
  dark: {
    info: {
      color: "gray;",
    },
    button: {
      backgroundColor: "white;",
    },
    title: {
      color: "rgba(235, 87, 87, 0.9);",
    },
    backgroundColor: "black;",
    color: "white;",
  },
  light: {
    info: {
      color: "gray;",
    },
    button: {
      backgroundColor: "rgba(235, 87, 87, 0.9);",
    },
    title: {
      color: "black;",
    },
    backgroundColor: "white;",
    color: "black;",
  },
};

export const ThemeContext = createContext(theme);

export function App() {
  const [selectedTheme, setSelectedTheme] = useState(theme.light);
  const [image, setImage] = useState(sun);

  function changeTheme() {
    console.log(selectedTheme === theme.light);
    if (selectedTheme === theme.light) {
      setSelectedTheme(theme.dark);
      setImage(moon);
    } else {
      setSelectedTheme(theme.light);
      setImage(sun);
    }
  }

  return (
    <ThemeContext.Provider value={selectedTheme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={() => <Login changeTheme={changeTheme} />}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
      <ThemeButton
        onClick={changeTheme}
        img={image}
        selectedTheme={selectedTheme}
      ></ThemeButton>
    </ThemeContext.Provider>
  );
}

const ThemeButton = styled.button`
  outline: none;
  position: fixed;
  bottom: 10%;
  right: 10%;
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: 3vh;
  background-position: center;
  background-color: ${(props) => props.selectedTheme.button.backgroundColor};
`;
