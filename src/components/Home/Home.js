import { useEffect, useRef, useState } from "react";
import db from "../../services/db";
import styled, { keyframes } from "styled-components";
import searchIcon from "../../images/search.svg";
import CloseIcon from "../../services/CloseIconColorChanger";
import SearchIconColorChanger from "../../services/SearchIconColorChanger";
import PinIcon from "../../services/PinIconColorChanger";
import Loader from "react-loader-spinner";
import starIcon from "../../images/star.svg";
import startSearch from "../../images/startSearch.svg";

export default function Home() {
    const [guests, setGuests] = useState(0);
    const [location, setLocation] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const [display, setDisplay] = useState("none");
    const [animationGray, setAnimationGray] = useState(appear);
    const [animationMenu, setAnimationMenu] = useState(slideDown);
    const [stays, setStays] = useState([]);
    const [filteredStays, setFilteredStays] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [displayStays, setDisplayStays] = useState();
    const [notFound, setNotFound] = useState(null);
    const [theme, setTheme] = useState({
        crossIcon: "black",
        pinIcon: "#4f4f4f",
    });
    const buttonRef = useRef();
    const locationRef = useRef();

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

    useEffect(() => {
        filterSearchResults();
    }, [location]);
    function filterRepeatedStays() {
        let finalArray = [];
        stays.map((item) => {
            let isNew = true;
            for (let index = 0; index <= finalArray.length; index++) {
                if (
                    finalArray[index]?.city === item.city &&
                    finalArray[index]?.country === item.country
                ) {
                    isNew = false;
                }
                if (isNew && finalArray.length === index) {
                    finalArray.push({ city: item.city, country: item.country });
                    break;
                }
            }
        });
        setFilteredStays(finalArray);
    }

    function changeThemeManually() {
        let currentTheme = localStorage.getItem("agenmapTheme");
        if (currentTheme === "dark") {
            setTheme({
                crossIcon: "rgba(235,87,87,0.9)",
                pinIcon: "aliceblue",
            });
        } else {
            setTheme({
                crossIcon: "black",
                pinIcon: "#4f4f4f",
            });
        }
    }

    function filterSearchResults() {
        const tempArray = [];
        filteredStays.map((item) => {
            if (
                !(
                    item.city
                        .toLowerCase()
                        .search(location.toLocaleLowerCase()) === -1
                )
            ) {
                tempArray.push(item);
            } else if (
                !item.country.toLowerCase().search(location.toLocaleLowerCase())
            ) {
                tempArray.push(item);
            } else if (
                location.toLocaleLowerCase() ===
                `${item.city.toLowerCase()}, ${item.country.toLowerCase()}`
            ) {
                tempArray.push(item);
            }
        });
        setSearchResults(tempArray);
    }
    function currentSearchResults(e) {
        e.preventDefault();
        let tempArray = [];
        if (location && guests) {
            if (openMenu) {
                setOpenMenu(!openMenu);
            }
            searchResults.map((item) => {
                stays.map((totalStays) => {
                    if (
                        item.city === totalStays.city &&
                        item.country === totalStays.country &&
                        totalStays.maxGuests >= guests
                    ) {
                        tempArray.push(totalStays);
                    }
                });
            });
            if (tempArray[0] === undefined) {
                setDisplayStays(undefined);
                setNotFound(location);
            } else {
                setNotFound(undefined);
                setDisplayStays(tempArray);
            }
        } else {
            console.log("Ingrese ubicacion y cantidad de huespedes");
        }
    }

    function setLocationOnClick(event) {
        if (event.target.nodeName === "LI") {
            setLocation(event.target.textContent);
        } else if (event.target.nodeName === "rect") {
            setLocation(
                event.target.ownerSVGElement.parentElement.nextSibling
                    .textContent
            );
        } else if (event.target.nodeName === "path") {
            setLocation(
                event.target.ownerSVGElement.parentElement.nextSibling
                    .textContent
            );
        } else if (event.target.nodeName === "circle") {
            setLocation(
                event.target.ownerSVGElement.parentElement.nextSibling
                    .textContent
            );
        }
    }
    async function fetchData() {
        return await db.collection("stays").get();
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
        changeThemeManually();
    }, [openMenu]);

    function maxGuests(event) {
        if (event.target.value.length >= 2) {
            event.target.value = event.target.value.slice(0, 2);
        }
    }

    function focusLocation() {
        locationRef.current.focus();
    }

    return (
        <Main>
            <Menu
                display={display}
                animation={animationMenu}
                onAnimationEnd={focusLocation}
            >
                <CloseAndTitle>
                    <Title>Edit your search</Title>
                    <CloseIconDiv onClick={() => setOpenMenu(!openMenu)}>
                        <CloseIcon color={theme.crossIcon} />
                    </CloseIconDiv>
                </CloseAndTitle>
                <SearchPillMenu>
                    <Form
                        onSubmit={currentSearchResults}
                        style={{ flexDirection: "column" }}
                    >
                        <LocationDivMenu>
                            <Subtitle>location</Subtitle>
                            <LocationInputMenu
                                type="text"
                                placeholder="Add location"
                                value={location}
                                onChange={(event) =>
                                    setLocation(event.target.value)
                                }
                                ref={locationRef}
                            ></LocationInputMenu>
                        </LocationDivMenu>
                        <GuestsDivMenu>
                            <Subtitle>guests</Subtitle>
                            <GuestInput
                                placeholder="Add guests"
                                type="number"
                                onInput={maxGuests}
                                onChange={(event) =>
                                    setGuests(event.target.value)
                                }
                                value={guests || undefined}
                            ></GuestInput>
                        </GuestsDivMenu>
                        <input type="submit" hidden ref={buttonRef}></input>
                    </Form>
                </SearchPillMenu>
                <LocationListDiv>
                    {searchResults[0] ? (
                        <LocationList>
                            {searchResults.map((item, index) => (
                                <LocationItemList
                                    key={index}
                                    onClick={setLocationOnClick}
                                >
                                    <PinIconDiv>
                                        <PinIcon color={theme.pinIcon} />
                                    </PinIconDiv>

                                    {`${item.city}, ${item.country}`}
                                </LocationItemList>
                            ))}
                        </LocationList>
                    ) : filteredStays[0] ? (
                        <LocationList>
                            {filteredStays.map((item, index) => (
                                <LocationItemList
                                    key={index}
                                    onClick={setLocationOnClick}
                                >
                                    <PinIconDiv>
                                        <PinIcon color={theme.pinIcon} />
                                    </PinIconDiv>
                                    {`${item.city}, ${item.country}`}
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
                <SearchButtonMenu onClick={() => buttonRef.current.click()}>
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
                <Form onSubmit={currentSearchResults}>
                    <LocationInput
                        type="text"
                        value={location}
                        onClick={() => {
                            setOpenMenu(!openMenu);
                        }}
                        placeholder="Add location"
                        readonly
                    ></LocationInput>
                    <Guests
                        type="number"
                        placeholder="Add guests"
                        onInput={maxGuests}
                        onChange={(event) => setGuests(event.target.value)}
                        value={guests || undefined}
                    />
                    <SearchButton type="submit" image={searchIcon} value="" />
                </Form>
            </SearchPill>
            {displayStays ? (
                <Content>
                    {displayStays.map((item) => {
                        return (
                            <Card key={item.id} className="hoverable">
                                <StaysImg src={item.photo} alt={item.title} />
                                <Container
                                    style={{
                                        width: "100%",
                                        marginTop: "2vh",
                                        marginBottom: "1vh",
                                    }}
                                >
                                    {item.superHost ? (
                                        <SuperHost>
                                            <SuperHostText>
                                                Super host
                                            </SuperHostText>
                                        </SuperHost>
                                    ) : null}
                                    <Container style={{ marginRight: "auto" }}>
                                        <BedsAndType>
                                            {item.type}
                                            {item.beds === null
                                                ? null
                                                : ` . ${item.beds} beds`}
                                        </BedsAndType>
                                    </Container>
                                    <Container
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <StarIcon
                                            src={starIcon}
                                            alt="Red start icon(rating)"
                                        ></StarIcon>
                                        <Rating
                                            style={{
                                                margin: 0,
                                                marginLeft: "8px",
                                            }}
                                        >
                                            {item.rating}
                                        </Rating>
                                    </Container>
                                </Container>
                                <Container style={{ width: "100%" }}>
                                    <StayTitle>{item.title}</StayTitle>
                                </Container>
                            </Card>
                        );
                    })}
                </Content>
            ) : (
                <Center style={{ flexDirection: "column" }}>
                    <StartSearch
                        src={startSearch}
                        alt="houses and a magnifying glass"
                    ></StartSearch>
                    <NotFoundOrStartSearchText>
                        {notFound
                            ? `No results found for "${notFound}"`
                            : "Start searching"}
                    </NotFoundOrStartSearchText>
                </Center>
            )}
        </Main>
    );
}

const PinIconDiv = styled.div`
    display: flex;
    width: calc(${(props) => props.theme.vh} * 3px);
    height: calc(${(props) => props.theme.vh} * 3px);
    margin-right: calc(${(props) => props.theme.vh} * 1.5px);
`;
const StarIcon = styled.img`
    width: calc(${(props) => props.theme.vh} * 2.5px);
    height: calc(${(props) => props.theme.vh} * 2.5px);
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
const Form = styled.form`
    display: flex;
    width: 100%;
    height: 100%;
`;
const NotFoundOrStartSearchText = styled.h2`
    margin: 0;
    color: ${(props) => props.theme.button.backgroundColor};
    width: 70vw;
    text-align: center;
    animation: 0.3s ${appear} ease;
`;

const StartSearch = styled.img`
    width: calc(${(props) => props.theme.vh} * 50px);
    height: calc(${(props) => props.theme.vh} * 50px);
    @media (max-width: 500px) {
        width: 80vw;
        height: 80vw;
    }
`;
const SuperHostText = styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    text-transform: uppercase;
    color: ${(props) => props.theme.superHost.color};
    margin: 0;
`;
const SuperHost = styled.div`
    padding-top: calc(${(props) => props.theme.vh} * 1px);
    padding-bottom: calc(${(props) => props.theme.vh} * 1px);
    padding-left: calc(${(props) => props.theme.vh} * 2px);
    padding-right: calc(${(props) => props.theme.vh} * 2px);
    margin-right: calc(${(props) => props.theme.vh} * 1.5px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.superHost.borderColor};
    border-radius: 12px;
`;
const StayTitle = styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin: 0;
    color: ${(props) => props.theme.stayTitle.color};
`;
const Rating = styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${(props) => props.theme.superHost.color};
`;
const BedsAndType = styled.h2`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${(props) => props.theme.info.color};
`;
const StaysImg = styled.img`
    border-radius: 24px;
    width: 100%;
    height: 250px;
    object-fit: cover;
    ${(props) => props.theme.image.filter}
    z-index: 0;
`;
const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
const Container = styled.div`
    display: flex;
    flex-direction: row;
`;
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    min-height: 100%;
`;
const Content = styled.div`
    margin-top: 10%;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
    justify-content: center;
    grid-gap: calc(${(props) => props.theme.vh} * 5px);
`;
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
    color: ${(props) => props.theme.li.color};
    height: calc(${(props) => props.theme.vh} * 4px);
    width: 100%;
    margin-top: calc(${(props) => props.theme.vh} * 1.5px);
`;
const LocationList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    max-height: calc(${(props) => props.theme.vh} * 44px);
`;

const LocationListDiv = styled.div`
    width: 80%;
    flex: 1;
    margin: calc(${(props) => props.theme.vh} * 2px) auto
        calc(${(props) => props.theme.vh} * 2px) auto;
    padding: 0;
`;

const SearchButtonMenu = styled.button`
    margin-top: auto;
    width: 35vw;
    height: calc(${(props) => props.theme.vh} * 7px);
    background: rgba(235, 87, 87, 0.9);
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    border: none;
    outline: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: calc(${(props) => props.theme.vh} * 3px);
    color: ${(props) => props.theme.button.color};
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
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
`;
const LocationInputMenu = styled.input`
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
`;
const LocationDivMenu = styled.div`
    width: 100%;
    height: calc(${(props) => props.theme.vh} * 10px);
    border-bottom: 1px solid #f2f2f2;
    padding: calc(${(props) => props.theme.vh} * 3px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const GuestsDivMenu = styled.div`
    width: 100%;
    height: calc(${(props) => props.theme.vh} * 10px);
    padding: calc(${(props) => props.theme.vh} * 3px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const SearchPillMenu = styled.div`
    width: 90%;
    height: calc(${(props) => props.theme.vh} * 20px);
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(${(props) => props.theme.vh} * 2px);
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
    border: 2px solid ${(props) => props.theme.borderColor};
`;
const CloseIconDiv = styled.div`
    outline: none;
    border: none;
    cursor: pointer;
    width: calc(${(props) => props.theme.vh} * 3px);
    height: calc(${(props) => props.theme.vh} * 3px);
    background-image: url(${(props) => props.image});
    background-size: contain;
    background-repeat: no-repeat;
`;
const CloseAndTitle = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding-left: calc(${(props) => props.theme.vh} * 2px);
    padding-right: calc(${(props) => props.theme.vh} * 2px);
    padding-top: calc(${(props) => props.theme.vh} * 2px);
`;
const Title = styled.h5`
    margin: 0;
    padding: 0;
    font-family: Mulish, san-serif;
    font-style: normal;
    font-weight: bold;
    color: ${(props) => props.theme.title.editColor};
`;

const Menu = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: ${(props) => props.display};
    width: 100vw;
    height: calc(${(props) => props.theme.vh} * 85px);
    animation: 0.3s ${(props) => props.animation} ease-in;
    z-index: 1;
    background-color: ${(props) => props.theme.backgroundColor};
    flex-direction: column;
`;
const GrayMenuDown = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: calc(${(props) => props.theme.vh} * 15px);
    display: ${(props) => props.display};
    animation: 0.3s ${(props) => props.animation} linear;
    background-color: ${(props) => props.theme.color};
    opacity: 0.5;
`;

const Main = styled.div`
    padding-top: calc(${(props) => props.theme.vh} * 10px);
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
`;
const SearchPill = styled.div`
    margin-top: calc(${(props) => props.theme.vh} * 3px);
    width: 80%;
    height: calc(${(props) => props.theme.vh} * 10px);
    background: #ffffff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
    border: 2px solid ${(props) => props.theme.borderColor};
`;
const LocationInput = styled.input`
    text-align: center;
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
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
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
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
`;
const SearchButton = styled.input`
    margin: 0;
    padding: 0;
    width: 19%;
    height: 100%;
    border-radius: 0 16px 16px 0;
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.input.backgroundColor};
    color: ${(props) => props.theme.input.color};
    background-image: url(/static/media/search.6facb5f7.svg);
    background-size: calc(${(props) => props.theme.vh} * 5px);
    background-position: center center;
    background-repeat: no-repeat;
`;
