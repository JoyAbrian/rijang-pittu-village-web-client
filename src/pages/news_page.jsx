import Navbar from "../components/layouts/Navbar";
import NewsPageFragment from "../components/fragments/News_Page_Fragment";
import Footer from "../components/layouts/Footer";

const NewsPage = () => {
    return (
        <>
            <Navbar />
            <NewsPageFragment />
            <Footer />
        </>
    );
}

export default NewsPage;