import styled from "styled-components";

const Button = styled.button`
    outline: none;
    width: calc(${(props) => props.theme.vh} * 4px);
    height: calc(${(props) => props.theme.vh} * 4px);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-image: url(${(props) => props.img});
    background-repeat: no-repeat;
    background-size: calc(${(props) => props.theme.vh} * 2px);
    background-position: center;
    background-color: ${(props) => props.theme.button.backgroundColor};
`;

export default function ThemeButton(props) {
    return <Button onClick={props.changeTheme} img={props.image}></Button>;
}
