import { useEffect } from "react";
import db from "../../services/db";
import styled from "styled-components";
import searchIcon from "../../images/search.svg";

export default function Home() {
    async function fetchData() {
        db.collection("stays")
            .where("city", "==", "Helsinki")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            });
    }

    return (
        <Main>
            <SearchPill>
                <Location type="text" />
                <Guests type="text" />
                <SearchButton type="submit" value=" " image={searchIcon} />
            </SearchPill>
        </Main>
    );
}
const Main = styled.div`
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
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
const Location = styled.div`
    border-radius: 16px;
    border: none;
    border-right: 1px solid #f2f2f2;
    width: 46%;
    height: 100%;
    border-radius: 16px 0 0 16px;
    outline: none;
`;
const Guests = styled.input`
    left: 46%;
    width: 35%;
    height: 100%;
    border: none;
    border-right: 1px solid #f2f2f2;
    border-radius: 16px 0 0 16px;
    outline: none;
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
