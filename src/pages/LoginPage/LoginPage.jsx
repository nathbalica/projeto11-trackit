
import logo from "../../assets/logo.png"
import { PageContainer, ButtonStyled, FormStyled, Input, StyledLink } from "../../components/InicialPages/exportPages.jsx"


export default function LoginPage() {
    return (
        <PageContainer>
            <img src={logo} />
            <FormStyled>
                <Input placeholder="email" />
                <Input placeholder="senha" />
                <ButtonStyled>Entrar</ButtonStyled>
            </FormStyled>
            <StyledLink>Não tem uma conta? Cadastre-se!</StyledLink>
        </PageContainer>
    )
}


