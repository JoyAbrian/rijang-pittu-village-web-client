import Navbar from "../components/layouts/Navbar";
import NewsDetailPageFragment from "../components/fragments/News_Detail_Page_Fragment";
import Footer from "../components/layouts/Footer";

const NewsDetailPage = () => {
    return (
        <>
            <Navbar />
            <NewsDetailPageFragment />
            <Footer />
        </>
    );
}

export default NewsDetailPage