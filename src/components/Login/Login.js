import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext, UserContext } from "../../App";
import styled from "styled-components";
import { Link } from "react-router-dom";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import github from "../../images/github.png";
import google from "../../images/google.png";
import {
    googleAuth,
    facebookAuth,
    twitterAuth,
    githubAuth,
    logOut,
} from "../../services/auth";
import Loader from "react-loader-spinner";

export default function Login() {
    const [data, setData] = useState();
    const themeMode = useContext(ThemeContext);
    const user = useContext(UserContext);
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
    }
    function handleChange() {
        setData({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });
    }

    return (
        <>
            {user === undefined ? (
                <Center>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </Center>
            ) : user === null ? (
                <Center>
                    <Card>
                        <Container style={{ justifyContent: "center" }}>
                            <Titulo themeMode={themeMode}>Login</Titulo>
                        </Container>
                        <Column style={{ height: "auto" }}>
                            <Container
                                style={{
                                    flexDirection: "column",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                }}
                            >
                                <Form onSubmit={handleSubmit}>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        ref={emailRef}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        style={{ marginTop: "2vh" }}
                                        ref={passwordRef}
                                        onChange={handleChange}
                                    />
                                    <SubmitInput
                                        type="submit"
                                        value="Log in"
                                        themeMode={themeMode}
                                    />
                                </Form>
                            </Container>
                            <Container
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "3vh",
                                }}
                            >
                                <Info themeMode={themeMode}>
                                    <LS.NavFixedItemLink>
                                        <Link
                                            to={"#"}
                                            style={{ fontSize: "2vh" }}
                                        >
                                            Forgot your password?
                                        </Link>
                                    </LS.NavFixedItemLink>
                                </Info>
                                <Info
                                    themeMode={themeMode}
                                    style={{ fontSize: "2vh" }}
                                >
                                    Or
                                </Info>
                                <Info themeMode={themeMode}>
                                    <LS.NavFixedItemLink>
                                        <p
                                            style={{
                                                margin: "0",
                                                fontSize: "2vh",
                                            }}
                                        >
                                            Have an account?
                                        </p>
                                        <Link
                                            to={"#"}
                                            style={{ fontSize: "2vh" }}
                                        >
                                            Sign up here
                                        </Link>
                                    </LS.NavFixedItemLink>
                                </Info>
                            </Container>
                        </Column>

                        <Separator />
                        <Column>
                            <Row
                                style={{
                                    fontSize: "2vh",
                                    color: "gray",
                                    marginBottom: "2vh",
                                }}
                            >
                                Log in with social media
                            </Row>
                            <Row>
                                <MediaIcons
                                    src={facebook}
                                    alt="Facebook logo"
                                    onClick={facebookAuth}
                                />
                                <MediaIcons
                                    src={google}
                                    alt="Google logo"
                                    onClick={googleAuth}
                                />
                                <MediaIcons
                                    src={twitter}
                                    alt="Twitter logo"
                                    onClick={twitterAuth}
                                />
                                <MediaIcons
                                    src={github}
                                    alt="Github logo"
                                    onClick={githubAuth}
                                />
                            </Row>
                        </Column>
                    </Card>
                </Center>
            ) : (
                <Center>
                    <LogOut onClick={logOut}>Log out</LogOut>
                    <LogOut onClick={() => console.log(user)}>Log user</LogOut>
                </Center>
            )}
        </>
    );
}
const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const Container = styled.div`
    display: flex;
    width: 100%;
`;

const Titulo = styled.h2`
  color: ${(props) => props.themeMode.title.color}
  margin: 0;
  text-align: center;
`;
const Card = styled.div`
    border-radius: 5vh;
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
`;
const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    height: 100%;
`;

const SubmitInput = styled.input`
    border-radius: 5vh;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border: none;
    outline: none;
    margin-top: 3vh;
    padding: 1vh 0 1vh 0;

    cursor: pointer;
    background-color: ${(props) => props.themeMode.button.backgroundColor};
    color: ${(props) => props.themeMode.button.color};
`;
const Input = styled.input`
    border-radius: 5vh;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border: none;
    outline: none;
    padding-left: 2vh;
    padding-right: 2vh;
    padding: 1vh 2vh 1vh 2vh;
`;
const Separator = styled.hr`
    margin: 0;
    width: 80%;
    height: 1px;
    border: none;
    background-color: gray;
    opacity: 0.3;
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 70%;
`;
const Info = styled.span`
    color: ${(props) => props.themeMode.info.color};
    margin: 0;
`;
const LS = {};
LS.NavFixedItemLink = styled.div`
    display: flex;
    flex-direction: column;
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
`;
const MediaIcons = styled.img`
    cursor: pointer;
    width: 5vh;
    height: 5vh;
`;
const LogOut = styled.button``;
