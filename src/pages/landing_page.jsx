import LandingPageHero from "../components/fragments/Landing_Page/landing_page_hero";
import LandingPageJelajahi from "../components/fragments/Landing_Page/landing_page_jelajahi";
import Navbar from "../components/layouts/Navbar";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <LandingPageHero />
            <LandingPageJelajahi />
        </>
    );
}

export default LandingPage