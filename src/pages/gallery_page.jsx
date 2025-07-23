import Navbar from "../components/layouts/Navbar";
import GalleryPageFragment from "../components/fragments/Gallery_Page_Fragment";
import Footer from "../components/layouts/Footer";

const GalleryPage = () => {
    return (
        <>
            <Navbar />
            <GalleryPageFragment />
            <Footer />
        </>
    );
}

export default GalleryPage;