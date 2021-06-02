import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../../App";
import image from "../../images/mapa512.png";
import hambugerIcon from "../../images/menu-icon.svg";
import { Link } from "react-router-dom";
import { logOut } from "../../services/auth";
import closeIcon from "../../images/close.svg";
import ThemeButton from "../ThemeButton";
import logOutSvg from "../../images/logout.svg";

export default function Navbar(props) {
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState("none");
  const [displayGray, setDisplayGray] = useState("none");
  const [animationGray, setAnimationGray] = useState(appear);
  const [animation, setAnimation] = useState({
    animation: grow,
    type: "ease-out",
  });
  function clickChangeTheme(event) {
    if (event.target.localName === "div") {
      event.target.firstChild.click();
    } else if (event.target.localName === "h2") {
      event.target.previousElementSibling.click();
    }
  }

  const user = useContext(UserContext);

  function showMenu() {
    if (isOpen) {
      setTimeout(() => {
        setDisplayGray("none");
        setDisplay("none");
      }, 280);
      setOpen(false);
      setAnimation({ animation: shrink, type: "ease-in" });
      setAnimationGray(disappear);
    } else {
      setOpen(true);
      setDisplayGray("flex");
      setDisplay("flex");
      setAnimation({ animation: grow, type: "ease-out" });
      setAnimationGray(appear);
    }
  }

  return (
    <Row>
      <Container>
        <Logo src={image} alt="agenmap logo" />
        <Title>
          <Link to="/">agenmap</Link>
        </Title>
      </Container>
      <HamburgerImage image={hambugerIcon} onClick={showMenu} />
      <Menu show={display} animation={animation}>
        <LittleMenu>
          <CloseIcon onClick={showMenu} image={closeIcon} />
          <Link to="/" onClick={showMenu}>
            Home
          </Link>
          {user ? (
            <>
              <Link to="/" onClick={showMenu}>
                Profile
              </Link>
              <LogOutButton
                src={logOutSvg}
                onClick={() => {
                  showMenu();
                  logOut();
                }}
                to="/login"
              >
                Log Out
              </LogOutButton>
            </>
          ) : (
            <Link onClick={showMenu} to="/login">
              Login
            </Link>
          )}
          <ChangeThemeDiv onClick={clickChangeTheme}>
            <ThemeButton changeTheme={props.changeTheme} image={props.image} />
            <ChangeThemeText>Theme</ChangeThemeText>
          </ChangeThemeDiv>
        </LittleMenu>
      </Menu>
      <PcRightSideMenu>
        {user ? (
          <>
            <Link to="/" onClick={showMenu}>
              Profile
            </Link>
            <LogOutButton
              src={logOutSvg}
              onClick={() => {
                showMenu();
                logOut();
              }}
              to="/login"
            >
              Log Out
            </LogOutButton>
          </>
        ) : (
          <Link onClick={showMenu} to="/login">
            Login
          </Link>
        )}
        <ChangeThemeDiv onClick={clickChangeTheme}>
          <ThemeButton changeTheme={props.changeTheme} image={props.image} />
          <ChangeThemeText>Theme</ChangeThemeText>
        </ChangeThemeDiv>
      </PcRightSideMenu>
      <GrayMenuSide
        display={displayGray}
        animation={animationGray}
        onClick={showMenu}
      />
    </Row>
  );
}
const PcRightSideMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    color: ${(props) => props.theme.color};
  }
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-size: 20px;
    width: fit-content;
    color: ${(props) => props.theme.title.color};
  }
  @media (max-width: 899px) {
    display: none;
  }
`;
const ChangeThemeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ChangeThemeText = styled.h2`
  font-size: 20px;
  margin: 0;
  color: rgba(235, 87, 87, 0.9);
  text-align: center;
  font-weight: 400;
  margin-left: 8px;
`;
const LogOutButton = styled.button`
  position: relative;
  height: calc(${(props) => props.theme.vh} * 5px);
  width: 50%;
  color: ${(props) => props.theme.button.color};
  background-color: ${(props) => props.theme.button.backgroundColor};
  border-radius: calc(${(props) => props.theme.vh} * 3px);
  border: none;
  cursor: pointer;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: calc(${(props) => props.theme.vh} * 2px)
    calc(${(props) => props.theme.vh} * 2px);
  background-position-y: center;
  background-position-x: 10px;
  @media (min-width: 900px) {
    height: calc(${(props) => props.theme.vh} * 5px);
    width: calc(${(props) => props.theme.vh} * 15px);
    margin-right: 20px;
    margin-left: 20px;
    background-size: calc(${(props) => props.theme.vh} * 3px)
      calc(${(props) => props.theme.vh} * 3px);
  }
`;
const CloseIcon = styled.div`
  outline: none;
  border: none;
  cursor: pointer;
  width: calc(${(props) => props.theme.vh} * 5px);
  height: calc(${(props) => props.theme.vh} * 5px);
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.navbar.color};
  position: absolute;
  top: 0;
  width: 100%;
  height: calc(${(props) => props.theme.vh} * 10px);
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
`;
const Title = styled.h3`
  margin: 0;
  margin-left: calc(${(props) => props.theme.vh} * 2px);
  padding: 0;
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: ${(props) => props.theme.title.color};
  }
`;
const LittleMenu = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
`;
const Logo = styled.img`
  width: calc(${(props) => props.theme.vh} * 4px);
  height: calc(${(props) => props.theme.vh} * 4px);
`;
const HamburgerImage = styled.div`
  width: calc(${(props) => props.theme.vh} * 4px);
  height: calc(${(props) => props.theme.vh} * 4px);
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-top: calc(${(props) => props.theme.vh} * 2px);
  @media (min-width: 900px) {
    display: none;
  }
`;
const grow = keyframes`
    from{
        width:0%;
        height: 0%;
        display: none;
    }
    to{
        width: 60vw;
        height: calc(${(props) => props.theme.vh} * 100px);;
    }
`;
const shrink = keyframes`
    from{
        width: 60vw;
        height: calc(${(props) => props.theme.vh} * 100px);
    }
    to{
        width: 0%;
        height: 0%;
        display: none;
    }
`;
const appear = keyframes`
    from{
        opacity:0;
    }
    to{
        opacity:0.5;
    }
`;
const disappear = keyframes`
    from{
        opacity:0.5;
    }
    to{
        opacity:0;
    }
`;

const GrayMenuSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40vw;
  height: calc(${(props) => props.theme.vh} * 100px);
  display: ${(props) => props.display};
  animation: 0.3s ${(props) => props.animation} linear;
  background-color: ${(props) => props.theme.color};
  opacity: 0.5;
  z-index: 1;
  @media (min-width: 900px) {
    display: none;
  }
`;
// prettier-ignore
const Menu = styled.div`
    display: ${(props) => props.show};
    animation: 0.3s ${(props) => props.animation.animation} ${(props) => props.animation.type};
    position: absolute;
    width: 60vw;
    height: calc(${(props) => props.theme.vh} * 100px);
    top: 0;
    right: 0;
    background-color: ${props => props.theme.backgroundColor};
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 2;
    div {
        color: ${(props) => props.theme.color};
    }
    a {
        margin: 0;
        padding: 0;
        text-decoration: none;
        font-size: 20px;
        width: fit-content;
        color: ${(props) => props.theme.title.color};
    }
    @media(min-width: 900px){
        display: none;
    }
`;
