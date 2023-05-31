import { PageContainer, ButtonStyled, FormStyled, Input, StyledLink } from "../../components/InicialPages/exportPages.jsx"
import logo from "../../assets/logo.png"

export default function RegisterPage(){
    return (
        <PageContainer>
            <img src={logo} />
            <FormStyled>
                <Input placeholder="email" />
                <Input placeholder="senha" />
                <Input placeholder="nome" />
                <Input placeholder="foto" />
                <ButtonStyled>Cadastrar</ButtonStyled>
            </FormStyled>
            <StyledLink>Já tem uma conta? Faça login!</StyledLink>
        </PageContainer>
    )
}