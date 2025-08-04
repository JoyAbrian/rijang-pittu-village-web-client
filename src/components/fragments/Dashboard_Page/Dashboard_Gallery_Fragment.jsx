import { useEffect, useState } from "react";
import DashboardImageCard from "../../elements/DashboardImageCard";
import ImageForm from "../../elements/Modal/ImageForm";
import ConfirmationModal from '../../elements/Modal/ConfirmationModal';
import { PlusCircle } from "react-bootstrap-icons";
import useGallery from "../../../hooks/useGallery"; 

const DashboardGallery = () => {
    useEffect(() => {
        document.title = "Galeri | Dashboard Rijang Pittu";
    }, []);

    const token = localStorage.getItem('token');

    const {
        gallery,
        error,
        addGallery,
        updateGallery,
        deleteGallery,
        uploadGalleryImage, 
        deleteImage
    } = useGallery();

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [imageToDeleteId, setImageToDeleteId] = useState(null);
    const [imageToDeleteUrl, setImageToDeleteUrl] = useState(null);

    const handleAddImage = () => {
        setCurrentImage(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (id) => {
        const imageToEdit = gallery.find((image) => image.id === id);
        setCurrentImage(imageToEdit ? { ...imageToEdit, imageUrl: imageToEdit.image_url } : null);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (id, imageUrl) => {
        setImageToDeleteId(id);
        setImageToDeleteUrl(imageUrl);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!imageToDeleteId || !token) {
            console.error("Missing ID or token for deletion.");
            alert("Gagal menghapus: ID gambar atau token tidak tersedia.");
            setIsConfirmModalOpen(false);
            return;
        }

        const dbDeleteResult = await deleteGallery(imageToDeleteId, token);

        if (dbDeleteResult.success) {
            console.log(dbDeleteResult.msg);
            if (imageToDeleteUrl) {
                const fileDeleteResult = await deleteImage(imageToDeleteUrl, token);
                if (fileDeleteResult.success) {
                    console.log("Image file also deleted:", fileDeleteResult.msg);
                } else {
                    console.warn("Failed to delete image file:", fileDeleteResult.msg);
                    alert("Gambar berhasil dihapus dari galeri, tetapi gagal menghapus file gambar dari server.");
                }
            }
        } else {
            console.error("Failed to delete gallery item:", dbDeleteResult.msg);
            alert(dbDeleteResult.msg);
        }

        setIsConfirmModalOpen(false);
        setImageToDeleteId(null);
        setImageToDeleteUrl(null);
    };

    const handleFormSubmit = async ({ title, imageFile, imageUrl }) => {
        if (!token) {
            alert("Autentikasi diperlukan untuk menambahkan/mengedit galeri.");
            return;
        }

        let finalImageUrl = imageUrl;

        if (imageFile) {
            const uploadResult = await uploadGalleryImage(imageFile, token);
            if (!uploadResult.success) {
                alert("Gagal mengunggah gambar: " + uploadResult.msg);
                return;
            }
            finalImageUrl = uploadResult.url;

            if (currentImage && currentImage.image_url && currentImage.image_url !== finalImageUrl) {
                const oldImageDeleteResult = await deleteImage(currentImage.image_url, token);
                if (!oldImageDeleteResult.success) {
                    console.warn("Failed to delete old image file:", oldImageDeleteResult.msg);
                }
            }
        } else if (!imageUrl && !currentImage) {
            finalImageUrl = "https://placehold.co/400x300/A0A0A0/FFFFFF?text=No+Image";
        }


        const payload = {
            title,
            image_url: finalImageUrl,
        };

        let result;
        if (currentImage) {
            result = await updateGallery(currentImage.id, payload, token);
        } else {
            result = await addGallery(payload, token);
        }

        if (!result.success) {
            alert(result.msg);
        }

        setIsFormModalOpen(false);
    };

    if (error) {
        return <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center text-red-600 text-lg">Error: {error}</div>;
    }

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
                {gallery.length === 0 ? (
                    <p className="text-gray-600 col-span-full text-center">Belum ada gambar di galeri.</p>
                ) : (
                    gallery.map((image) => (
                        <DashboardImageCard
                            key={image.id}
                            image={{ id: image.id, title: image.title, imageUrl: image.image_url }}
                            onEdit={() => handleEdit(image.id)}
                            onDelete={() => handleDeleteClick(image.id, image.image_url)}
                        />
                    ))
                )}
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