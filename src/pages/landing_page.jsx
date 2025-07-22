import LandingPageHero from "../components/fragments/Landing_Page/landing_page_hero";
import LandingPageJelajahi from "../components/fragments/Landing_Page/landing_page_jelajahi";
import LandingPagePeta from "../components/fragments/Landing_Page/landing_page_peta";
import LandingPageSambutan from "../components/fragments/Landing_Page/landing_page_sambutan";
import Navbar from "../components/layouts/Navbar";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <LandingPageHero />
            <LandingPageJelajahi />
            <LandingPageSambutan />
            <LandingPagePeta />
        </>
    );
}

export default LandingPage