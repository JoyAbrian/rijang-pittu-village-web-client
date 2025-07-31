import Navbar from "../components/layouts/Navbar";
import NewsPageFragment from "../components/fragments/News_Page_Fragment";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";

const NewsPage = () => {
    useEffect(() => {
        document.title = "Berita | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <NewsPageFragment />
            <Footer />
        </>
    );
}

export default NewsPage;