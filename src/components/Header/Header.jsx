import styled from "styled-components";
import { useLocation } from "react-router-dom";
import trackit from "../../assets/TrackIt.png"
import useAuth from "../../hooks/auth";

export default function Header() {
    const { userAuth } = useAuth();
    const location = useLocation();

    const hideHeader = location.pathname === "/" || location.pathname === "/cadastro";
    if (hideHeader) {
        return null;
    }

    return (
        <ContainerHeader data-test="header">
            <img src={trackit} alt="TrackIt" />
            {userAuth && <User src={userAuth.image} alt={userAuth.name} data-test="avatar"/>}
        </ContainerHeader>
    )
}
const ContainerHeader = styled.div`
    width: 100%;
    height: 70px;

    padding: 0px 18px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    position: fixed;
    top: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;

`


const User = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%; 
    display: block;
`
