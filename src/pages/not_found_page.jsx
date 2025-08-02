import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";
import NotFoundFragment from "../components/fragments/Not_Found_Fragment";

const NotFoundPage = () => {
    useEffect(() => {
        document.title = "404 | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <NotFoundFragment/>
            <Footer />
        </>
    );
}

export default NotFoundPage;