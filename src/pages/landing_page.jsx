import { useEffect } from "react";
import LandingPageHero from "../components/fragments/Landing_Page/landing_page_hero";
import LandingPageJelajahi from "../components/fragments/Landing_Page/landing_page_jelajahi";
import LandingPageNews from "../components/fragments/Landing_Page/landing_page_news";
import LandingPagePeta from "../components/fragments/Landing_Page/landing_page_peta";
import LandingPageSambutan from "../components/fragments/Landing_Page/landing_page_sambutan";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

const LandingPage = () => {
    useEffect(() => {
        document.title = "Website Resmi Rijang Pittu"
    }, [])
    
    return (
        <>
            <Navbar />
            <LandingPageHero />
            <LandingPageJelajahi />
            <LandingPageSambutan />
            <LandingPagePeta />
            <LandingPageNews />
            <Footer />
        </>
    );
}

export default LandingPage