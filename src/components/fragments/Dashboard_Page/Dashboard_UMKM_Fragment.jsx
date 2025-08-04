import { useEffect, useState } from "react";
import { ClockFill, GeoAltFill, Instagram, Map, PlusCircle, TagFill, TelephoneFill } from "react-bootstrap-icons";
import DashboardUMKMCard from "../../elements/DashboardUMKMCard";
import UMKMForm from "../../elements/Modal/UMKMForm";
import ConfirmationModal from "../../elements/Modal/ConfirmationModal";
import Modal from "../../elements/Modal/Modal";
import useUMKM from "../../../hooks/useUMKM";

const DashboardUMKM = () => {
    useEffect(() => {
        document.title = "UMKM | Dashboard Rijang Pittu";
    }, []);

    const token = localStorage.getItem('token');

    const {
        umkm,
        categories,
        error,
        addUMKM,
        updateUMKM,
        deleteUMKM,
        uploadUMKMImage,
        deleteImage,
    } = useUMKM();

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentUmkmItem, setCurrentUmkmItem] = useState(null);
    const [viewingUmkmItem, setViewingUmkmItem] = useState(null);

    const [umkmToDeleteId, setUmkmToDeleteId] = useState(null);
    const [umkmToDeleteImageUrl, setUmkmToDeleteImageUrl] = useState(null);

    const handleAddUmkm = () => {
        setCurrentUmkmItem(null);
        setIsFormModalOpen(true);
    };

    const handleEditUmkm = (umkm) => {
        setCurrentUmkmItem(umkm);
        setIsFormModalOpen(true);
    };

    const handleDeleteUmkm = (umkm) => {
        setUmkmToDeleteId(umkm.id);
        setUmkmToDeleteImageUrl(umkm.image_url);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!umkmToDeleteId || !token) {
            console.error("Missing UMKM ID or token for deletion.");
            alert("Gagal menghapus: ID UMKM atau token tidak tersedia.");
            setIsConfirmationModalOpen(false);
            return;
        }

        const dbDeleteResult = await deleteUMKM(umkmToDeleteId, token);

        if (dbDeleteResult.success) {
            console.log(dbDeleteResult.msg);
            if (umkmToDeleteImageUrl) {
                const fileDeleteResult = await deleteImage(umkmToDeleteImageUrl, token);
                if (fileDeleteResult.success) {
                    console.log("Image file also deleted:", fileDeleteResult.msg);
                } else {
                    console.warn("Failed to delete UMKM image file:", fileDeleteResult.msg);
                    alert("UMKM berhasil dihapus dari daftar, tetapi gagal menghapus file gambar dari server.");
                }
            }
        } else {
            console.error("Failed to delete UMKM item:", dbDeleteResult.msg);
            alert(dbDeleteResult.msg);
        }

        setIsConfirmationModalOpen(false);
        setUmkmToDeleteId(null);
        setUmkmToDeleteImageUrl(null);
    };

    const handleViewUmkm = (umkm) => {
        setViewingUmkmItem(umkm);
        setIsViewModalOpen(true);
    };

    const handleSaveUmkm = async (formDataFromForm) => {
        if (!token) {
            alert("Autentikasi diperlukan untuk menambahkan/mengedit UMKM.");
            return;
        }

        let finalImageUrl = formDataFromForm.imageUrl;

        if (formDataFromForm.imageFile) {
            const uploadResult = await uploadUMKMImage(formDataFromForm.imageFile, token);
            if (!uploadResult.success) {
                alert("Gagal mengunggah gambar: " + uploadResult.msg);
                return;
            }
            finalImageUrl = uploadResult.url;

            if (currentUmkmItem && currentUmkmItem.image_url && currentUmkmItem.image_url !== finalImageUrl) {
                const oldImageDeleteResult = await deleteImage(currentUmkmItem.image_url, token);
                if (!oldImageDeleteResult.success) {
                    console.warn("Failed to delete old UMKM image file:", oldImageDeleteResult.msg);
                }
            }
        } else if (!formDataFromForm.imageUrl && !currentUmkmItem) {
            finalImageUrl = "https://placehold.co/800x400/CCCCCC/333333?text=No+Image";
        }

        const categoryObject = categories.find(cat => cat.type_name === formDataFromForm.category);
        const categoryId = categoryObject ? categoryObject.id : null;

        const payload = {
            name: formDataFromForm.name,
            category_id: categoryId,
            image_url: finalImageUrl,
            description: formDataFromForm.description,
            price_min: formDataFromForm.priceRangeStart,
            price_max: formDataFromForm.priceRangeEnd,
            open_time: formDataFromForm.openingHoursStart,
            close_time: formDataFromForm.openingHoursEnd,
            address: formDataFromForm.address,
            contact: formDataFromForm.contact,
            instagram: formDataFromForm.instagramUsername,
            google_maps: formDataFromForm.googleMaps,
        };

        let result;
        if (currentUmkmItem) {
            result = await updateUMKM(currentUmkmItem.id, payload, token);
        } else {
            result = await addUMKM(payload, token);
        }

        if (!result.success) {
            alert(result.msg);
        }

        setIsFormModalOpen(false);
    };

    const formatContentForDisplay = (text) => {
        if (!text) return { __html: '' };
        const htmlContent = text.split('\n\n').map(paragraph => `<p class="mb-4">${paragraph.replace(/\n/g, '<br/>')}</p>`).join('');
        return { __html: htmlContent };
    };

    if (error) {
        return <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center text-red-600 text-lg">Error: {error}</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100 font-inter">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Daftar UMKM</h2>
                        <button
                            onClick={handleAddUmkm}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                        >
                            <PlusCircle className="mr-2" size={20} /> Tambah UMKM
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {umkm.length === 0 ? (
                            <p className="text-gray-600 col-span-full text-center">Belum ada data UMKM.</p>
                        ) : (
                            umkm.map((item) => (
                                <DashboardUMKMCard
                                    key={item.id}
                                    umkm={{
                                        id: item.id,
                                        name: item.name,
                                        category: categories.find(cat => cat.id === item.category_id)?.type_name || 'Unknown',
                                        image: item.image_url,
                                        description: item.description,
                                        priceRangeStart: item.price_min,
                                        priceRangeEnd: item.price_max,
                                        openingHoursStart: item.open_time,
                                        openingHoursEnd: item.close_time,
                                        address: item.address,
                                        contact: item.contact,
                                        instagramUsername: item.instagram,
                                        googleMaps: item.google_maps,
                                        category_id: item.category_id,
                                        image_url: item.image_url,
                                        price_min: item.price_min,
                                        price_max: item.price_max,
                                        open_time: item.open_time,
                                        close_time: item.close_time,
                                        instagram: item.instagram,
                                        Maps: item.google_maps,
                                    }}
                                    handleEditUmkm={() => handleEditUmkm(item)}
                                    handleDeleteUmkm={() => handleDeleteUmkm(item)}
                                    handleViewUmkm={() => handleViewUmkm(item)}
                                />
                            ))
                        )}
                    </div>
                </main>
            </div>

            <UMKMForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={currentUmkmItem ? "Edit UMKM" : "Tambah UMKM Baru"}
                umkmData={currentUmkmItem} 
                onSubmit={handleSaveUmkm}
                categories={categories}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Apakah Anda yakin ingin menghapus UMKM "${currentUmkmItem?.name}" ini?`}
            />

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title={viewingUmkmItem?.name}
            >
                {viewingUmkmItem && (
                    <div className="text-gray-800">
                        <img
                            src={viewingUmkmItem.image_url}
                            alt={viewingUmkmItem.name}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Gambar+Tidak+Ditemukan"; }}
                        />
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <TagFill className="mr-2 text-orange-500" /> Kategori: {categories.find(cat => cat.id === viewingUmkmItem.category_id)?.name || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <TagFill className="mr-2 text-green-500" /> Harga: Rp{viewingUmkmItem.price_min} - Rp{viewingUmkmItem.price_max}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <ClockFill className="mr-2 text-purple-500" /> Jam Buka: {viewingUmkmItem.open_time} - {viewingUmkmItem.close_time}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <GeoAltFill className="mr-2 text-blue-500" /> Alamat: {viewingUmkmItem.address}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <TelephoneFill className="mr-2 text-teal-500" /> Kontak: {viewingUmkmItem.contact}
                        </p>
                        {viewingUmkmItem.instagram && (
                            <p className="text-sm text-gray-600 mb-2 flex items-center">
                                <Instagram className="mr-2 text-pink-500" /> Instagram: <a href={`https://www.instagram.com/${viewingUmkmItem.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@{viewingUmkmItem.instagram}</a>
                            </p>
                        )}
                        {viewingUmkmItem.Maps && (
                            <p className="text-sm text-gray-600 mb-4 flex items-center">
                                <Map className="mr-2 text-red-500" /> Google Maps: <a href={viewingUmkmItem.Maps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat di Peta</a>
                            </p>
                        )}
                        <h4 className="text-md font-semibold text-gray-900 mb-2">Deskripsi:</h4>
                        <div dangerouslySetInnerHTML={formatContentForDisplay(viewingUmkmItem.description)} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardUMKM;