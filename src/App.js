import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
import "./app.scss";
import theme from "./config/themes";
import Navbar from "./components/Navbar/Navbar";
import { useUserLoggedin } from "./services/auth";
export const ThemeContext = createContext(theme);
export const UserContext = createContext();

export function App() {
    const [selectedTheme, setSelectedTheme] = useState(theme.light);
    const [image, setImage] = useState(sun);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const user = useUserLoggedin();

    function changeTheme() {
        if (selectedTheme === theme.light) {
            setSelectedTheme(theme.dark);
            setImage(moon);
        } else {
            setSelectedTheme(theme.light);
            setImage(sun);
        }
    }

    function isUserLoggedIn(newUser) {
        setUserLoggedIn(newUser);
    }

    useEffect(() => {
        isUserLoggedIn(user);
    }, [user]);
    return (
        <ThemeContext.Provider value={selectedTheme}>
            <UserContext.Provider value={userLoggedIn}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/login"
                            render={() => (
                                <Login
                                    changeTheme={changeTheme}
                                    addUser={userLoggedIn}
                                />
                            )}
                        />
                        <Redirect to="/" />
                    </Switch>

                    <ThemeButton
                        onClick={changeTheme}
                        img={image}
                        selectedTheme={selectedTheme}
                    ></ThemeButton>
                </Router>
            </UserContext.Provider>
        </ThemeContext.Provider>
    );
}

const ThemeButton = styled.button`
    @media (max-width: 768px) {
        display: none;
    }
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
