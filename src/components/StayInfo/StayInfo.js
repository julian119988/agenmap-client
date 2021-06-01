import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../services/db";
import starIcon from "../../images/star.svg";

export default function StayInfo() {
    const [data, setData] = useState(undefined);
    const { id } = useParams();
    useEffect(() => {
        fetchStay();
    }, []);

    async function fetchStay() {
        const response = await db.collection("stays").doc(id).get();
        console.log(response.data());
        setData(response.data());
    }
    return (
        <Main>
            {data === undefined ? (
                <Center>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </Center>
            ) : (
                <>
                    <Container padding>
                        <StayTitle>{data.title}</StayTitle>
                    </Container>
                    <Container center>
                        <StaysImg src={data.photo} alt={data.title} />
                    </Container>
                    <Container row padding>
                        {data.superHost ? (
                            <SuperHost>
                                <SuperHostText>Super Host</SuperHostText>
                            </SuperHost>
                        ) : null}

                        <Container>{data.type}</Container>
                        <StarIcon
                            src={starIcon}
                            alt="Red start icon(rating)"
                        ></StarIcon>
                        <Rating>{data.rating}</Rating>
                    </Container>
                    <Container row padding>
                        <Container>
                            {data.beds === null
                                ? `Beds up to ${data.maxGuests}`
                                : `${data.beds} beds`}
                        </Container>
                        <Container>{`${data.city}, ${data.country}`}</Container>
                    </Container>
                </>
            )}
        </Main>
    );
}
const Main = styled.div`
    min-height: calc(${(props) => props.theme.vh} * 100px);
    display: flex;
    padding-top: calc(${(props) => props.theme.vh} * 10px);
    flex-direction: column;
    align-items: center;
`;
const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: ${(props) => (props.row ? "row" : "column")};
    ${(props) => (props.center ? "align-items: center;" : null)};
    ${(props) => (props.padding ? "padding: 20px;" : null)}
`;
const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
`;
const StaysImg = styled.img`
    border-radius: 24px;
    width: 80%;
    height: 250px;
    object-fit: cover;
    ${(props) => props.theme.image.filter}
    z-index: 0;
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
const StarIcon = styled.img`
    width: calc(${(props) => props.theme.vh} * 2.5px);
    height: calc(${(props) => props.theme.vh} * 2.5px);
`;
const StayTitle = styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
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
