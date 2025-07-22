import LandingPageHero from "../components/fragments/Landing_Page/landing_page_hero";
import LandingPageJelajahi from "../components/fragments/Landing_Page/landing_page_jelajahi";
import LandingPageSambutan from "../components/fragments/Landing_Page/landing_page_sambutan";
import Navbar from "../components/layouts/Navbar";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <LandingPageHero />
            <LandingPageJelajahi />
            <LandingPageSambutan />
        </>
    );
}

export default LandingPage