import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import GlobalStyle from "./style/GlobalStyle";
import ResetStyle from "./style/ResetStyle"

export default function App() {
    return (
        <>
            <ResetStyle />
            <GlobalStyle />
            <div>
                <Routes>
                    <Route path='/' element={<LoginPage />}/>
                    <Route path='/cadastro' element={<RegisterPage />}/>
                    <Route path='/habitos' element={<HabitsPage />}/>
                </Routes>
            </div>
        </>
    )
}