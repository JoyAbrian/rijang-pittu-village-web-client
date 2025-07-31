import Navbar from "../components/layouts/Navbar";
import LoginPageFragment from "../components/fragments/Login_Page_Fragment";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";

const LoginPage = () => {
    useEffect(() => {
        document.title = "Login | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <LoginPageFragment />
            <Footer />
        </>
    );
}

export default LoginPage