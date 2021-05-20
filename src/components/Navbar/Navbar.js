import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContext, UserContext } from "../../App";
import image from "../../images/mapa512.png";
import hambugerIcon from "../../images/menu-icon.svg";
import { Link } from "react-router-dom";
import { logOut } from "../../services/auth";
import closeIcon from "../../images/close.svg";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [display, setDisplay] = useState("none");
    const [displayGray, setDisplayGray] = useState("none");
    const [animationGray, setAnimationGray] = useState(appear);
    const [animation, setAnimation] = useState({
        animation: grow,
        type: "ease-out",
    });
    const themeMode = useContext(ThemeContext);
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
        <Row themeMode={themeMode}>
            <Container>
                <Logo src={image} />
                <Title themeMode={themeMode}>
                    <Link to="/">agenmap</Link>
                </Title>
            </Container>
            <HamburgerImage image={hambugerIcon} onClick={showMenu} />
            <Menu show={display} animation={animation} themeMode={themeMode}>
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
                                themeMode={themeMode}
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
                </LittleMenu>
            </Menu>
            <GrayMenuSide
                display={displayGray}
                animation={animationGray}
                onClick={showMenu}
            />
        </Row>
    );
}
const LogOutButton = styled.button`
    position: relative;
    height: 5vh;
    width: 50%;
    color: ${(props) => props.themeMode.button.color}
    background-color: ${(props) => props.themeMode.button.backgroundColor}
    border-radius: 3vh;
    border: none;
    cursor: pointer;
`;
const CloseIcon = styled.div`
    outline: none;
    border: none;
    cursor: pointer;
    width: 5vh;
    height: 5vh;
    background-image: url(${(props) => props.image});
    background-size: contain;
    background-repeat: no-repeat;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    color: ${(props) => props.themeMode.navbar.color};
    position: absolute;
    top: 0;
    width: 100%;
    height: 10%;
    align-items: center;
    padding-left: 5%;
    padding-right: 5%;
`;
const Title = styled.h3`
    margin: 0;
    margin-left: 2vh;
    padding: 0;
    a {
        margin: 0;
        padding: 0;
        text-decoration: none;
        color: ${(props) => props.themeMode.title.color};
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
    width: 4vh;
    height: 4vh;
`;
const HamburgerImage = styled.div`
    width: 4vh;
    height: 4vh;
    background-image: url(${(props) => props.image});
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    margin-top: 2vh;
`;
const grow = keyframes`
    from{
        width:0%;
        height: 0%;
        display: none;
    }
    to{
        width: 60vw;
        height: 100vh;
    }
`;
const shrink = keyframes`
    from{
        width: 60vw;
        height: 100vh;
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
    height: 100vh;
    display: ${(props) => props.display};
    animation: 0.3s ${(props) => props.animation} linear;
    background-color: black;
    opacity: 0.5;
`;

const Menu = styled.div`
    display: ${(props) => props.show};
    animation: 0.3s ${(props) => props.animation.animation}
        ${(props) => props.animation.type};
    position: absolute;
    width: 60vw;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 1;
    div {
        color: black;
    }
    a {
        margin: 0;
        padding: 0;
        text-decoration: none;
        font-size: 20px;
        width: fit-content;
        color: ${(props) => props.themeMode.title.color};
    }
`;
