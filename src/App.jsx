import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import axios from "axios";
import Header from "./components/Header/Header";
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/AuthContext";
import TodayPage from "./pages/TodayPage/TodayPage";
import Footer from "./components/Footer/Footer";



export default function App() {
    // axios.defaults.headers.common['Authorization'] = '0DXVhdb7qaf1gSnqLj8ImUay'
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/cadastro' element={<RegisterPage />} />
                    <Route path='/hoje' element={<TodayPage />} />
                    <Route path='/habitos' element={<HabitsPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthContextProvider>
    )
}