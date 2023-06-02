import styled from "styled-components";

const Input = styled.input `

    width: 300px;
    height: 45px;
    border-radius: 5px;
    margin-bottom: 6px;
    padding: 10px;

    pointer-events: ${(props) => props.disabled ? "none" : "all"};
    background-color: ${(props) => props.disabled ? "#F2F2F2" : "#FFFFFF"};
    color: ${(props) => props.disabled ? "#AFAFAF" : "#666666"};
    border: 1px solid #D5D5D5;

    
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    
    &::placeholder{
    color: #DBDBDB;
  }
`

export default Input