import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import db from "../../services/db";
import { UserContext } from "../../App";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import PinIcon from "../../services/PinIconColorChanger";
import homeIcon from "../../images/homeIcon.svg";
import bedIcon from "../../images/bed.svg";
import starIcon from "../../images/star.svg";

export default function Profile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [stays, setStays] = useState();
  const [r, setR] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => setR(!r), 1000);
  }, [stays]);

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .get()
      .then((document) => {
        setUserInfo(document.data());
        filterStays(document.data().stays).then((response) => {
          setStays(response);
        });
      })
      .catch((error) => console.log(error));
  }, []);

  async function filterStays(totalStays) {
    let tempArray = [];
    db.collection("stays")
      .get()
      .catch((error) => console.log(error))
      .then((query) =>
        query.forEach((stay) => {
          totalStays.forEach((savedStay) => {
            if (stay.id === savedStay) {
              tempArray.push({ stays: stay.data(), id: stay.id });
            }
          });
        })
      );
    return tempArray;
  }

  function checkUser(id) {
    manageStay(id);
  }

  function deleteStay(id) {
    db.collection("users")
      .where("email", "==", userInfo.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let isNew = true;
          doc.data().stays.forEach((element) => {
            if (element === id) {
              isNew = false;
            }
          });
          if (!isNew) {
            let newStays = doc.data().stays;
            let index = newStays.findIndex((element) => element === id);
            newStays.splice(index, 1);
            db.collection("users")
              .doc(doc.id)
              .set(
                {
                  stays: newStays,
                },
                { merge: true }
              )
              .then(() => {
                window.location.reload();
                console.log("Document successfully deleted!");
              })
              .catch((error) => {
                console.error("Error deleting document: ", error);
              });
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function manageStay(id) {
    deleteStay(id);
  }

  return (
    <>
      {user === null ? (
        <Redirect to="/" />
      ) : stays ? (
        <Main>
          {stays.map((data) => (
            <Card>
              <Container padding width>
                <StayTitle>{data.stays.title}</StayTitle>
              </Container>
              <Container center width>
                <StaysImgDiv>
                  <StaysImg
                    src={data.stays.photo}
                    alt={data.stays.title}
                  ></StaysImg>
                  <SaveButton onClick={() => checkUser(data.id)}></SaveButton>
                </StaysImgDiv>
              </Container>
              <Container row width>
                <Container half>
                  <Container row center width between>
                    {data.stays.superHost ? (
                      <SuperHost margin>
                        <SuperHostText>Super Host</SuperHostText>
                      </SuperHost>
                    ) : null}
                  </Container>
                  <Container width row center padding>
                    <Container style={{ width: "25px", height: "25px" }}>
                      <img src={homeIcon} alt="House icon" />
                    </Container>
                    <Type style={{ marginLeft: "7px" }}>{data.stays.type}</Type>
                  </Container>
                  <Container width row center padding>
                    <Container row center>
                      <Container style={{ width: "25px", height: "25px" }}>
                        <img src={bedIcon} alt="Bed icon" />
                      </Container>
                      <Type style={{ marginLeft: "7px" }}>
                        {data.stays.beds === null
                          ? `Beds up to ${data.stays.maxGuests}`
                          : `${data.stays.beds} beds`}
                      </Type>
                    </Container>
                  </Container>
                  <Container width row center padding>
                    <Container row center>
                      <Container style={{ width: "25px", height: "25px" }}>
                        <PinIcon color="rgba(235,87,87,0.9)" />
                      </Container>
                      <Type
                        style={{ marginLeft: "4px" }}
                      >{`${data.stays.city}, ${data.stays.country}`}</Type>
                    </Container>
                  </Container>
                </Container>
                <Container row center half JFlexEnd AFlexStart>
                  <Container center row padding>
                    <StarIcon
                      src={starIcon}
                      alt="Red start icon(rating)"
                    ></StarIcon>
                    <Rating>{data.stays.rating}</Rating>
                  </Container>
                </Container>
              </Container>
            </Card>
          ))}
        </Main>
      ) : (
        <Center>
          <Loader type="TailSpin" color="#00BFFF" />
        </Center>
      )}
    </>
  );
}
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;
// prettier-ignore
const SaveButton = styled.button`
  background-color: ${(props) => props.theme.button.backgroundColor};
  position: absolute;
  bottom: 10%;
  right: 10%;
  border: none;
  outline: none;
  border-radius: 50%;
  width: calc(${(props) => props.theme.vh} * 4px);
  height: calc(${(props) => props.theme.vh} * 4px);
  cursor: pointer;
  border: 1px solid rgb(235, 87, 87);
  background-image: url(${(props) => props.save ? props.theme.save : props.theme.delete});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
`;
const LoadingDiv = styled.div`
  background-color: ${(props) => props.theme.button.backgroundColor};
  position: absolute;
  bottom: 10%;
  right: 10%;
  border: none;
  outline: none;
  border-radius: 50%;
  width: calc(${(props) => props.theme.vh} * 4px);
  height: calc(${(props) => props.theme.vh} * 4px);
  cursor: pointer;
  border: 1px solid rgb(235, 87, 87);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.div`
  min-height: calc(${(props) => props.theme.vh} * 100px);
  display: flex;
  padding-top: calc(${(props) => props.theme.vh} * 10px);
  flex-direction: column;
  align-items: center;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 30px;
`;
const Container = styled.div`
  display: flex;
  top: calc(${(props) => props.theme.vh} * 42.7px);
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  ${(props) => (props.center ? "align-items: center;" : null)};
  ${(props) => (props.padding ? "padding: 15px 30px 15px 30px;" : null)}
  ${(props) => (props.width ? "width: 100%;" : null)}
  ${(props) => (props.between ? "justify-content: space-between;" : null)}
  ${(props) => (props.JFlexEnd ? "justify-content: flex-end;" : null)}
  ${(props) => (props.AFlexStart ? "align-items: flex-start;" : null)}
  ${(props) => (props.left ? "margin-left: auto;" : null)}
  ${(props) =>
    !props.superHost && props.rating ? "position: absolute;" : null}
    ${(props) => (props.half ? "width: 50%;" : null)}
`;

const StaysImgDiv = styled.div`
  border-radius: 24px;
  width: 90%;
  max-height: 30vw;
  z-index: 0;
  margin: 10px 0 10px 0;
  position: relative;
`;
const StaysImg = styled.img`
  ${(props) => props.theme.image.filter}
  object-fit: cover;
  border-radius: 24px;
  width: 100%;
  height: 100%;
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
  ${(props) => (props.margin ? "margin: 15px 30px 15px 30px;" : null)}
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
  margin-top: 0;
  margin-bottom: 0;
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
