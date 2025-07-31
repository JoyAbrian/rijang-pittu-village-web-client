import Navbar from "../components/layouts/Navbar";
import GalleryPageFragment from "../components/fragments/Gallery_Page_Fragment";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";

const GalleryPage = () => {
    useEffect(() => {
        document.title = "Galeri | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <GalleryPageFragment />
            <Footer />
        </>
    );
}

export default GalleryPage;