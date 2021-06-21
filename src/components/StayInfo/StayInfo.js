import { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../services/db";
import starIcon from "../../images/star.svg";
import PinIcon from "../../services/PinIconColorChanger";
import homeIcon from "../../images/homeIcon.svg";
import bedIcon from "../../images/bed.svg";
import { UserContext } from "../../App";
import { store } from "react-notifications-component";

export default function StayInfo() {
  const [data, setData] = useState(undefined);
  const [isSaved, setIsSaved] = useState(null);
  const { id } = useParams();
  const user = useContext(UserContext);

  useEffect(() => {
    fetchStay(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .where("email", "==", user.email)
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
            if (isNew) {
              setIsSaved(false);
            } else {
              setIsSaved(true);
            }
          });
        })
        .catch((error) => console.log(error));
    } else {
      setIsSaved(false);
    } // eslint-disable-next-line
  }, [user]);
  async function fetchStay() {
    const response = await db.collection("stays").doc(id).get();

    setData(response.data());
  }

  function checkUser() {
    if (!user) {
      store.addNotification({
        title: "Error!",
        message: "You need to log in!",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
        },
        slidingEnter: {
          swipe: {
            duration: 400,
            timingFunction: "ease-out",
            delay: 0,
          },
          fade: {
            duration: 400,
            timingFunction: "ease-out",
            delay: 0,
          },
        },
      });
    } else {
      manageStay();
    }
  }
  function saveStay() {
    if (user) {
      setIsSaved(null);
    }
    db.collection("users")
      .where("email", "==", user.email)
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
          if (isNew) {
            db.collection("users")
              .doc(doc.id)
              .set(
                {
                  stays: [...doc.data().stays, id],
                },
                { merge: true }
              )
              .then(() => {
                setIsSaved(true);
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function deleteStay() {
    if (user) {
      setIsSaved(null);
    }
    db.collection("users")
      .where("email", "==", user.email)
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
                setIsSaved(false);
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

  function manageStay() {
    if (isSaved === false) {
      saveStay();
    } else if (isSaved === true) {
      deleteStay();
    }
  }

  return (
    <Main>
      {data === undefined ? (
        <Center>
          <Loader type="TailSpin" color="#00BFFF" />
        </Center>
      ) : (
        <>
          <Container padding width>
            <StayTitle>{data.title}</StayTitle>
          </Container>
          <Container center width>
            <StaysImgDiv>
              <StaysImg src={data.photo} alt={data.title}></StaysImg>
              {isSaved === null ? (
                <LoadingDiv>
                  <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    heigh={25}
                    width={25}
                  />
                </LoadingDiv>
              ) : isSaved ? (
                <SaveButton onClick={checkUser} save></SaveButton>
              ) : (
                <SaveButton onClick={checkUser}></SaveButton>
              )}
            </StaysImgDiv>
          </Container>
          <Container row width>
            <Container half>
              <Container row center width between>
                {data.superHost ? (
                  <SuperHost margin>
                    <SuperHostText>Super Host</SuperHostText>
                  </SuperHost>
                ) : null}
              </Container>
              <Container width row center padding>
                <Container style={{ width: "25px", height: "25px" }}>
                  <img src={homeIcon} alt="House icon" />
                </Container>
                <Type style={{ marginLeft: "7px" }}>{data.type}</Type>
              </Container>
              <Container width row center padding>
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
              </Container>
              <Container width row center padding>
                <Container row center>
                  <Container style={{ width: "25px", height: "25px" }}>
                    <PinIcon color="rgba(235,87,87,0.9)" />
                  </Container>
                  <Type
                    style={{ marginLeft: "4px" }}
                  >{`${data.city}, ${data.country}`}</Type>
                </Container>
              </Container>
            </Container>
            <Container row center half JFlexEnd AFlexStart>
              <Container center row padding>
                <StarIcon
                  src={starIcon}
                  alt="Red start icon(rating)"
                ></StarIcon>
                <Rating>{data.rating}</Rating>
              </Container>
            </Container>
          </Container>
        </>
      )}
    </Main>
  );
}
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
  background-image: url(${(props) => props.save ? props.theme.delete : props.theme.save});
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
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;
const StaysImgDiv = styled.div`
  border-radius: 24px;
  width: 90%;
  max-height: 29vw;
  z-index: 0;
  margin: 10px 0 10px 0;
  position: relative;
  @media (max-width: 900px) {
    max-height: 50vw;
  }
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
