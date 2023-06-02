import styled from "styled-components";

const ButtonStyled = styled.button `
    width: 300px;
    height: 45px;
    border-radius: 5px;
    background: #52B6FF;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: ${(props) => props.disabled ? "none" : "all"};

    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 26px;
    color: #FFFFFF;
    
`

export default ButtonStyled;