import Navbar from "../components/layouts/Navbar";
import EventPageFragment from "../components/fragments/Event_Page_Fragment";
import Footer from "../components/layouts/Footer";

const EventPage = () => {
    return (
        <>
            <Navbar />
            <EventPageFragment />
            <Footer />
        </>
    );
}

export default EventPage;