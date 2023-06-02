
import logo from "../../assets/logo.png"
import { PageContainer, ButtonStyled, FormStyled, Input, StyledLink } from "../../components/InicialPages/exportPages.jsx"
import axios from "axios";
import { BASE_URL } from "../../constants/apis";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import useAuth from "../../hooks/auth";

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const { userAuth, login } = useAuth();
    console.log(userAuth.token)


    useEffect(() => {
        if (userAuth && userAuth.token) {
          navigate("/hoje");
        }
      }, []);

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function loginUser(e) {
        e.preventDefault()
        setIsLoading(true);

        const body = { ...form }

        axios.post(`${BASE_URL}/auth/login`, body)
            .then(res => {
                console.log(res.data)
                login(res.data)
                setIsLoading(false);
                navigate('/hoje')
            })
            .catch(() => {
                alert('Erro, tente novamente');
                setIsLoading(false);
            })
    }

    return (
        <PageContainer>
            <img src={logo} />
            <FormStyled onSubmit={loginUser}>
                <Input
                    placeholder="email"
                    name="email"
                    onChange={handleForm}
                    value={form.email}
                    required
                    disabled={isLoading}
                />
                <Input
                    placeholder="senha"
                    name="password"
                    onChange={handleForm}
                    value={form.password}
                    required
                    disabled={isLoading}
                />
                <ButtonStyled type="submit" disabled={isLoading}>
                    {isLoading 
                        ? (<ThreeDots 
                        height="80" 
                        width="80" 
                        radius="9"
                        color="#FFFFFF" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                         />) 
                        : ("Entrar")}
                </ButtonStyled>
            </FormStyled>
            <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
        </PageContainer>
    )
}


