import { useEffect, useState } from "react";
import db from "../../services/db";
import styled, { keyframes } from "styled-components";
import searchIcon from "../../images/search.svg";
import CloseIcon from "../../services/CloseIconColorChanger";
import SearchIconColorChanger from "../../services/SearchIconColorChanger";
import pinIcon from "../../images/pin.svg";
import Loader from "react-loader-spinner";

export default function Home() {
    const [location, setLocation] = useState();
    const [openMenu, setOpenMenu] = useState(false);
    const [display, setDisplay] = useState("none");
    const [animationGray, setAnimationGray] = useState(appear);
    const [animationMenu, setAnimationMenu] = useState(slideDown);
    const [changeColor, setChangeColor] = useState({
        color: "gray;",
    });
    const [stays, setStays] = useState([]);
    const [filteredStays, setFilteredStays] = useState([]);

    useEffect(async () => {
        const data = await fetchData();
        data.forEach((element) => {
            const arrayPlusId = element.data();
            arrayPlusId["id"] = element.id;
            setStays((stays) => [...stays, arrayPlusId]);
        });
    }, []);
    useEffect(() => {
        filterRepeatedStays();
    }, [stays]);

    function filterRepeatedStays() {
        let finalArray = [];
        stays.map((item) => {
            let isNew = true;
            for (let index = 0; index <= finalArray.length; index++) {
                if (finalArray[index] === `${item.city}, ${item.country}`) {
                    isNew = false;
                }
                if (isNew && finalArray.length === index) {
                    finalArray.push(`${item.city}, ${item.country}`);
                    break;
                }
            }
        });
        setFilteredStays(finalArray);
    }
    function setLocationOnClick(event) {
        setLocation(event.target.lastChild.nodeValue);
    }
    async function fetchData() {
        return await db.collection("stays").get();
    }

    function checkLocation() {
        if (location !== "Add location") {
            setChangeColor({
                color: "black;",
            });
        } else {
            setChangeColor({
                color: "gray;",
            });
        }
    }
    useEffect(() => {
        if (openMenu) {
            setDisplay("flex");
            setAnimationGray(appear);
            setAnimationMenu(slideDown);
        } else {
            setTimeout(() => {
                setDisplay("none");
            }, 280);
            setAnimationGray(disappear);
            setAnimationMenu(slideUp);
        }
    }, [openMenu]);

    return (
        <Main>
            <Menu display={display} animation={animationMenu}>
                <CloseAndTitle>
                    <Title>Edit your search</Title>
                    <CloseIconDiv onClick={() => setOpenMenu(!openMenu)}>
                        <CloseIcon color={"black"} />
                    </CloseIconDiv>
                </CloseAndTitle>
                <SearchPillMenu>
                    <LocationDivMenu>
                        <Subtitle>location</Subtitle>
                        <LocationInput
                            type="text"
                            placeholder="Add location"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                        ></LocationInput>
                    </LocationDivMenu>
                    <GuestsDivMenu>
                        <Subtitle>guests</Subtitle>
                        <GuestInput placeholder="Add guests"></GuestInput>
                    </GuestsDivMenu>
                </SearchPillMenu>
                <LocationListDiv>
                    {filteredStays[0] ? (
                        <LocationList>
                            {filteredStays.map((item, index) => (
                                <LocationItemList
                                    key={index}
                                    onClick={setLocationOnClick}
                                >
                                    <img
                                        src={pinIcon}
                                        style={{ width: "4vh", height: "4vh" }}
                                    ></img>
                                    {item}
                                </LocationItemList>
                            ))}
                        </LocationList>
                    ) : (
                        <Center>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={80}
                                width={80}
                            />
                        </Center>
                    )}
                </LocationListDiv>
                <SearchButtonMenu onClick={filterRepeatedStays}>
                    <SearchIconColorChanger color="white" />
                    Search
                </SearchButtonMenu>
            </Menu>
            <GrayMenuDown
                display={display}
                animation={animationGray}
                onClick={() => setOpenMenu(!openMenu)}
            ></GrayMenuDown>
            <SearchPill>
                <LocationDiv onClick={() => setOpenMenu(!openMenu)}>
                    <Location changeColor={changeColor}>{location}</Location>
                </LocationDiv>
                <Guests type="number" placeholder="Add guests" />
                <SearchButton
                    type="submit"
                    value=" "
                    image={searchIcon}
                    onClick={() => console.log(stays)}
                />
            </SearchPill>
            {stays[0] ? (
                <Content>ASD</Content>
            ) : (
                <Center>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </Center>
            )}
        </Main>
    );
}
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    min-height: 100%;
`;
const Content = styled.div``;
const LocationItemList = styled.li`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
`;
const LocationList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    max-height: 44vh;
`;

const LocationListDiv = styled.div`
    width: 80%;
    flex: 1;
    margin: 2vh auto 2vh auto;
    padding: 0;
`;

const SearchButtonMenu = styled.button`
    margin-top: auto;
    width: 35vw;
    height: 7vh;
    background: rgba(235, 87, 87, 0.9);
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    border: none;
    outline: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3vh;
    color: white;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 5% 0 5%;
`;
const Subtitle = styled.h3`
    font-family: Mulish;
    font-style: normal;
    font-weight: 800;
    font-size: 9px;
    line-height: 11px;
    text-transform: uppercase;
    margin: 0;
`;
const GuestInput = styled.input`
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
`;
const LocationInput = styled.input`
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
`;
const LocationDivMenu = styled.div`
    width: 100%;
    height: 10vh;
    border-bottom: 1px solid #f2f2f2;
    padding: 5% 10% 5% 10%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const GuestsDivMenu = styled.div`
    width: 100%;
    height: 10vh;
    padding: 5.4% 10% 5% 10%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const SearchPillMenu = styled.div`
    width: 90%;
    height: 20vh;
    background: #ffffff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2vh;
`;
const CloseIconDiv = styled.div`
    outline: none;
    border: none;
    cursor: pointer;
    width: 3vh;
    height: 3vh;
    background-image: url(${(props) => props.image});
    background-size: contain;
    background-repeat: no-repeat;
`;
const CloseAndTitle = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2vh;
    padding-right: 2vh;
    padding-top: 2vh;
`;
const Title = styled.h5`
    margin: 0;
    padding: 0;
    font-family: Mulish, san-serif;
    font-style: normal;
    font-weight: bold;
`;
const slideDown = keyframes`
    from{
        transform: translateY(-100%);
    }
    to{
        transform: translateY(0%);
    }
`;
const slideUp = keyframes`
from{
    transform: translateY(0%);
}
to{
    transform: translateY(-100%);
}`;
const Menu = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: ${(props) => props.display};
    width: 100vw;
    height: 85vh;
    animation: 0.3s ${(props) => props.animation} ease-in;
    z-index: 1;
    background-color: white;
    flex-direction: column;
`;
const GrayMenuDown = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 15vh;
    display: ${(props) => props.display};
    animation: 0.3s ${(props) => props.animation} linear;
    background-color: black;
    opacity: 0.5;
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
const Location = styled.p`
    margin: 0;
    padding: 0;
    width: fit-content;
    color: ${(props) => props.changeColor.color}
    font-size: 13px;
`;
const Main = styled.div`
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    min-height: 100vh;
`;
const SearchPill = styled.div`
    margin-top: 3vh;
    width: 80%;
    height: 10vh;
    background: #ffffff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    display: flex;
    flex-direction: row;
`;
const LocationDiv = styled.div`
    border-radius: 16px;
    border: none;
    border-right: 1px solid #f2f2f2;
    width: 46%;
    height: 100%;
    border-radius: 16px 0 0 16px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Guests = styled.input`
    left: 46%;
    width: 35%;
    height: 100%;
    border: none;
    border-right: 1px solid #f2f2f2;
    border-radius: 16px 0 0 16px;
    outline: none;
    text-align: center;
`;
const SearchButton = styled.input`
    margin: 0;
    padding: 0;
    width: 19%;
    height: 100%;
    border-radius: 0 16px 16px 0;
    outline: none;
    border: none;
    background-color: white;
    background-image: url(/static/media/search.6facb5f7.svg);
    background-size: 5vh;
    background-position: center center;
    background-repeat: no-repeat;
`;
