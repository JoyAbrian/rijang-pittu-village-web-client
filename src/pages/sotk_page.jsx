import Navbar from "../components/layouts/Navbar";
import SOTKPageFragment from "../components/fragments/Profile_Page/SOTK_Page_Fragment";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";

const SOTKPage = () => {
    useEffect(() => {
        document.title = "SOTK | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <SOTKPageFragment />
            <Footer />
        </>
    );
}

export default SOTKPage