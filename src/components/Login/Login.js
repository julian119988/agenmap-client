import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import facebook from "../../images/facebook.svg";
import twitter from "../../images/twitter.png";
import github from "../../images/github.png";
import google from "../../images/google.png";
import {
  googleAuth,
  facebookAuth,
  twitterAuth,
  githubAuth,
  emailAuth,
} from "../../services/auth";
import Loader from "react-loader-spinner";

export default function Login() {
  const [data, setData] = useState();

  const user = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    console.log(user);
  }, [user]);
  function handleSubmit(e) {
    e.preventDefault();
    emailAuth(data);
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
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </Center>
      ) : user === null ? (
        <Center>
          <Card>
            <Container style={{ justifyContent: "center" }}>
              <Titulo>Login</Titulo>
            </Container>
            <Column style={{ height: "auto" }}>
              <Container
                style={{
                  flexDirection: "column",
                  paddingLeft: "30px",
                  paddingRight: "30px",
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
                    style={{ marginTop: "16px" }}
                    ref={passwordRef}
                    onChange={handleChange}
                  />
                  <SubmitInput type="submit" value="Log in" />
                </Form>
              </Container>
              <Container
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "24px",
                }}
              >
                <Info>
                  <LS.NavFixedItemLink>
                    <Link to={"#"} style={{ fontSize: "16px" }}>
                      Forgot your password?
                    </Link>
                  </LS.NavFixedItemLink>
                </Info>
                <Info style={{ fontSize: "16px" }}>Or</Info>
                <Info>
                  <LS.NavFixedItemLink>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "16px",
                      }}
                    >
                      Have an account?
                    </p>
                    <Link to="/signup" style={{ fontSize: "16px" }}>
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
                  fontSize: "16px",
                  marginBottom: "16px",
                }}
              >
                Log in with social media
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <MediaIcons
                  alt="Facebook logo"
                  src={facebook}
                  onClick={facebookAuth}
                />
                <MediaIcons
                  alt="Google logo"
                  src={google}
                  onClick={googleAuth}
                />
                <MediaIcons
                  alt="Twitter logo"
                  src={twitter}
                  onClick={twitterAuth}
                />
                <MediaIcons
                  alt="Github logo"
                  src={github}
                  onClick={githubAuth}
                />
              </Row>
            </Column>
          </Card>
        </Center>
      ) : (
        <Redirect to="/" />
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
  color: ${(props) => props.theme.title.color};
  margin: 0;
  text-align: center;
`;
const Card = styled.div`
  border-radius: calc(${(props) => props.theme.vh} * 5px);
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  max-width: 600px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: calc(${(props) => props.theme.vh} * 100px);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
`;

const SubmitInput = styled.input`
  border-radius: calc(${(props) => props.theme.vh} * 5px);
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  margin-top: calc(${(props) => props.theme.vh} * 3px);
  padding: calc(${(props) => props.theme.vh} * 1px) 0
    calc(${(props) => props.theme.vh} * 1px) 0;

  cursor: pointer;
  background-color: ${(props) => props.theme.button.backgroundColor};
  color: ${(props) => props.theme.button.color};
`;
const Input = styled.input`
  border-radius: calc(${(props) => props.theme.vh} * 5px);
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  padding-left: calc(${(props) => props.theme.vh} * 2px);
  padding-right: calc(${(props) => props.theme.vh} * 2px);
  padding: calc(${(props) => props.theme.vh} * 1px)
    calc(${(props) => props.theme.vh} * 2px)
    calc(${(props) => props.theme.vh} * 1px)
    calc(${(props) => props.theme.vh} * 2px);
  text-align: center;
  background-color: ${(props) => props.theme.input.backgroundColor};
  color: ${(props) => props.theme.input.color};
  border: 2px solid ${(props) => props.theme.borderColor};
`;
const Separator = styled.hr`
  margin: 0;
  width: 80%;
  height: 1px;
  border: none;
  background-color: ${(props) => props.theme.info.color};
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
  color: ${(props) => props.theme.info.color};
`;
const Info = styled.span`
  color: ${(props) => props.theme.info.color};
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
    color: ${(props) => props.theme.linkColor};
  }
`;
const MediaIcons = styled.img`
  cursor: pointer;
  width: calc(${(props) => props.theme.vh} * 5px);
  height: calc(${(props) => props.theme.vh} * 5px);
`;
