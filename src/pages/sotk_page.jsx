import Navbar from "../components/layouts/Navbar";
import SOTKPageFragment from "../components/fragments/Profile_Page/SOTK_Page_Fragment";
import Footer from "../components/layouts/Footer";

const SOTKPage = () => {
    return (
        <>
            <Navbar />
            <SOTKPageFragment />
            <Footer />
        </>
    );
}

export default SOTKPage