import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../services/db";
import starIcon from "../../images/star.svg";
import PinIcon from "../../services/PinIconColorChanger";
import homeIcon from "../../images/homeIcon.svg";
import bedIcon from "../../images/bed.svg";

export default function StayInfo() {
  const [data, setData] = useState(undefined);
  const { id } = useParams();
  useEffect(() => {
    fetchStay(); // eslint-disable-next-line
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
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </Center>
      ) : (
        <>
          <Container padding width>
            <StayTitle>{data.title}</StayTitle>
          </Container>
          <Container center width>
            <StaysImg src={data.photo} alt={data.title} />
          </Container>
          <Container row padding center width between>
            {data.superHost ? (
              <SuperHost>
                <SuperHostText>Super Host</SuperHostText>
              </SuperHost>
            ) : null}

            <Container row center>
              <StarIcon src={starIcon} alt="Red start icon(rating)"></StarIcon>
              <Rating>{data.rating}</Rating>
            </Container>
          </Container>
          <Container padding width row center>
            <Container style={{ width: "25px", height: "25px" }}>
              <img src={homeIcon} alt="House icon" />
            </Container>
            <Type style={{ marginLeft: "7px" }}>{data.type}</Type>
          </Container>
          <Container row padding width between center>
            <Container row center>
              <Container style={{ width: "25px", height: "25px" }}>
                <img src={bedIcon} alt="Bed icon" />
              </Container>
              <Type style={{ marginLeft: "7px" }}>
                {data.beds === null
                  ? `Beds up to ${data.maxGuests}`
                  : `${data.beds} beds`}
              </Type>
            </Container>
            <Container row center>
              <Container style={{ width: "25px", height: "25px" }}>
                <PinIcon color="rgba(235,87,87,0.9)" />
              </Container>
              <Type
                style={{ marginLeft: "4px" }}
              >{`${data.city}, ${data.country}`}</Type>
            </Container>
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
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  ${(props) => (props.center ? "align-items: center;" : null)};
  ${(props) => (props.padding ? "padding: 15px 30px 15px 30px;" : null)}
  ${(props) => (props.width ? "width: 100%;" : null)}
  ${(props) => (props.between ? "justify-content: space-between;" : null)}
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
  width: 90%;
  height: 250px;
  object-fit: cover;
  ${(props) => props.theme.image.filter}
  z-index: 0;
  margin: 10px 0 10px 0;
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
  margin-left: 7px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${(props) => props.theme.superHost.color};
`;
const Type = styled.h2`
  display: flex;
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${(props) => props.theme.info.color};
`;
