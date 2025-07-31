import Navbar from "../components/layouts/Navbar";
import EventPageFragment from "../components/fragments/Event_Page_Fragment";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";

const EventPage = () => {
    useEffect(() => {
        document.title = "Acara | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <EventPageFragment />
            <Footer />
        </>
    );
}

export default EventPage;