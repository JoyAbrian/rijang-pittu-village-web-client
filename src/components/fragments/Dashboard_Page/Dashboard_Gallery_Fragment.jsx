import { useEffect, useState } from "react";
import DashboardImageCard from "../../elements/DashboardImageCard";
import ImageForm from "../../elements/Modal/ImageForm";
import ConfirmationModal from '../../elements/Modal/ConfirmationModal';
import { PlusCircle } from "react-bootstrap-icons";

const DashboardGallery = () => {
    useEffect(() => {
        document.title = "Galeri | Dashboard Rijang Pittu"
    }, [])

    const [galleryImages, setGalleryImages] = useState([
        { id: 'g1', title: 'Pemandangan Kantor Kelurahan', imageUrl: 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=Kantor+Kelurahan' },
        { id: 'g2', title: 'Kegiatan Sosialisasi Warga', imageUrl: 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=Sosialisasi+Warga' },
        { id: 'g3', title: 'Peringatan Hari Kemerdekaan', imageUrl: 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=Hari+Kemerdekaan' },
        { id: 'g4', title: 'Gotong Royong Bersama', imageUrl: 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=Gotong+Royong' },
        { id: 'g5', title: 'Seminar Program Kerja KKN UNHAS', imageUrl: 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=KKN+UNHAS' },
        { id: 'g6', title: 'Jumat Bersih', imageUrl: 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=Jumat+Bersih' },
    ]);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [imageToDeleteId, setImageToDeleteId] = useState(null);

    const handleAddImage = () => {
        setCurrentImage(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (id) => {
        const imageToEdit = galleryImages.find((image) => image.id === id);
        setCurrentImage(imageToEdit);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setImageToDeleteId(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        setGalleryImages(galleryImages.filter((image) => image.id !== imageToDeleteId));
        setIsConfirmModalOpen(false);
        setImageToDeleteId(null);
    };

    const handleFormSubmit = (newImage) => {
        if (currentImage) {
            setGalleryImages(galleryImages.map((image) =>
                image.id === newImage.id ? newImage : image
            ));
        } else {
            setGalleryImages([...galleryImages, newImage]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-inter">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Dashboard Galeri</h2>
                <button
                    onClick={handleAddImage}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
                >
                    <PlusCircle className="mr-2" size={20} /> Tambah Gambar
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                    <DashboardImageCard
                        key={image.id}
                        image={image}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </div>

            <ImageForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                imageData={currentImage}
                onSubmit={handleFormSubmit}
            />

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                message="Anda yakin ingin menghapus gambar ini dari galeri?"
            />
        </div>
    );
};

export default DashboardGallery;