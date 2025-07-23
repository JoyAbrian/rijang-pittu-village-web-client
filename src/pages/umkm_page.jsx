import UMKMPageFragment from "../components/fragments/UMKM_Page_Fragment";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

const UMKMPage = () => {
    return (
        <>
            <Navbar />
            <UMKMPageFragment />
            <Footer />
        </>
    );
}

export default UMKMPage