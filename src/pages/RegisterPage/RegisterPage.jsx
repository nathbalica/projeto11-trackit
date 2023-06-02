import { PageContainer, ButtonStyled, FormStyled, Input, StyledLink } from "../../components/InicialPages/exportPages.jsx"
import logo from "../../assets/logo.png"
import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../../constants/apis.jsx"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"



export default function RegisterPage() {
    const [form, setForm] = useState({ email: '', name: '', image: '', password: '' })
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault()

        setIsLoading(true);

        const body = { ...form }
        
        axios.post(`${BASE_URL}/auth/sign-up`, body)
            .then(res => {
                console.log(res.data)
                setIsLoading(false);
                navigate("/");
            })
            .catch(() => {
                setIsLoading(false);
                alert('Erro, tente novamente');
            })
    }


    return (
        <PageContainer>
            <img src={logo} />
            <FormStyled onSubmit={register}>
                <Input
                    placeholder="email"
                    name="email"
                    onChange={handleForm}
                    value={form.email}
                    required
                    disabled={isLoading}
                    data-test="email-input"
                />
                <Input
                    placeholder="senha"
                    name="password"
                    onChange={handleForm}
                    value={form.password}
                    required
                    disabled={isLoading}
                    data-test="password-input"
                />
                <Input
                    placeholder="nome"
                    name="name"
                    onChange={handleForm}
                    value={form.name}
                    required
                    disabled={isLoading}
                    data-test="user-name-input"
                />
                <Input
                    placeholder="foto"
                    name="image"
                    onChange={handleForm}
                    value={form.image}
                    required
                    disabled={isLoading}
                    data-test="user-image-input"
                />
                <ButtonStyled type="submit" disabled={isLoading}  data-test="signup-btn">
                    {
                        isLoading 
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
                        : ("Cadastrar")
                    }

                </ButtonStyled>
            </FormStyled>
            <StyledLink to="/" data-test="login-link">
                Já tem uma conta? Faça login!
            </StyledLink>
        </PageContainer>
    )
}