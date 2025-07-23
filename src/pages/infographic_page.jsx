import Navbar from "../components/layouts/Navbar";
import InfographicPagePeople from "../components/fragments/Infographic_Page/infographic_page_people";
import InfographicPageBuilding from "../components/fragments/Infographic_Page/infographic_page_building";
import Footer from "../components/layouts/Footer";

const InfographicPage = () => {
    return (
        <>
            <Navbar />
            <InfographicPagePeople />
            <InfographicPageBuilding />
            <Footer />
        </>
    );
}

export default InfographicPage;