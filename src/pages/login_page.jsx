import Navbar from "../components/layouts/Navbar";
import LoginPageFragment from "../components/fragments/Login_Page_Fragment";
import Footer from "../components/layouts/Footer";

const LoginPage = () => {
    return (
        <>
            <Navbar />
            <LoginPageFragment />
            <Footer />
        </>
    );
}

export default LoginPage