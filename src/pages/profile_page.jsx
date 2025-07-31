import { useEffect } from "react";
import ProfilePageGallery from "../components/fragments/Profile_Page/profile_page_gallery";
import ProfilePageSOTK from "../components/fragments/Profile_Page/profile_page_sotk";
import ProfilePageVisiMisi from "../components/fragments/Profile_Page/profile_page_visimisi";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

const ProfilePage = () => {
    useEffect(() => {
        document.title = "Profil Kelurahan | Website Resmi Rijang Pittu"
    }, [])

    return (
        <>
            <Navbar />
            <ProfilePageVisiMisi />
            <ProfilePageSOTK />
            <ProfilePageGallery />
            <Footer />
        </>
    );
}

export default ProfilePage