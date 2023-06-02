import styled from "styled-components"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer(){
    const location = useLocation()

    const hideHeader = location.pathname === "/" || location.pathname === "/cadastro";
    if (hideHeader) {
        return null;
    }

    return (
        <ContainerFooter>
            <StyledLink to="/habitos">Hábitos</StyledLink>
            <ContainerProgressBar>
                <CircleProgressBar>
                    <Link to="/hoje">
                        <CircularProgressbar 
                            value={60}
                            text={"Hoje"}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"})}
                        />
                    </Link>
                </CircleProgressBar>
            </ContainerProgressBar>
            <StyledLink>Histórico</StyledLink>
        </ContainerFooter>
    )
}

const ContainerFooter = styled.div `
    width: 100%;
    height: 70px;

    background: #FFFFFF;

    position: fixed;
    bottom: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
`
const ContainerProgressBar = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const CircleProgressBar = styled.div `
    width: 90px;
    height: 90px;

    position: absolute;
    top: -40px;
`
const StyledLink = styled(Link)`
  color: #52B6FF;
  font-size: 18px;
  line-height: 22px;
  margin: 0 36px;
  text-decoration: none;
`;