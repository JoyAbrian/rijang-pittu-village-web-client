import ScrollToTop from "../components/layouts/ScrollToTop";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};

export default RootLayout;