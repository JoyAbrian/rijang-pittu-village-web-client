import { useEffect, useState } from "react";
import Modal from "../../elements/Modal/Modal";
import ConfirmationModal from "../../elements/Modal/ConfirmationModal";
import { PlusCircle } from "react-bootstrap-icons";
import DashboardNewsCard from "../../elements/DashboardNewsCard";
import NewsForm from "../../elements/Modal/NewsForm";
import useNews from "../../../hooks/useNews"; // Correct path to your useNews hook

const DashboardNews = () => {
    useEffect(() => {
        document.title = "Berita | Dashboard Rijang Pittu"
    }, []);

    const token = localStorage.getItem('token'); 
    
    const {
        newsList,
        error,
        addNews,
        updateNews,
        deleteNews,
        uploadNewsImage,
        deleteImage,
    } = useNews();

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentNewsItem, setCurrentNewsItem] = useState(null);
    const [viewingNewsItem, setViewingNewsItem] = useState(null); 

    const [newsToDeleteId, setNewsToDeleteId] = useState(null);
    const [newsToDeleteImageUrl, setNewsToDeleteImageUrl] = useState(null); 
    
    const handleAddNews = () => {
        setCurrentNewsItem(null);
        setIsFormModalOpen(true);
    };

    const handleEditNews = (news) => {
        setCurrentNewsItem(news);
        setIsFormModalOpen(true);
    };

    const handleDeleteNews = (news) => {
        setNewsToDeleteId(news.id);
        setNewsToDeleteImageUrl(news.image_url);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!newsToDeleteId || !token) {
            console.error("Missing news ID or token for deletion.");
            alert("Gagal menghapus: ID berita atau token tidak tersedia.");
            setIsConfirmationModalOpen(false);
            return;
        }

        const dbDeleteResult = await deleteNews(newsToDeleteId, token);

        if (dbDeleteResult.success) {
            console.log(dbDeleteResult.msg);
            if (newsToDeleteImageUrl) {
                const fileDeleteResult = await deleteImage(newsToDeleteImageUrl, token);
                if (fileDeleteResult.success) {
                    console.log("Image file also deleted:", fileDeleteResult.msg);
                } else {
                    console.warn("Failed to delete news image file:", fileDeleteResult.msg);
                    alert("Berita berhasil dihapus dari daftar, tetapi gagal menghapus file gambar dari server.");
                }
            }
        } else {
            console.error("Failed to delete news item:", dbDeleteResult.msg);
            alert(dbDeleteResult.msg);
        }

        setIsConfirmationModalOpen(false);
        setNewsToDeleteId(null);
        setNewsToDeleteImageUrl(null);
    };

    const handleViewNews = (news) => {
        setViewingNewsItem(news);
        setIsViewModalOpen(true);
    };

    const handleSaveNews = async ({ title, date, content, imageFile, imageUrl }) => {
        if (!token) {
            alert("Autentikasi diperlukan untuk menambahkan/mengedit berita.");
            return;
        }
        let finalImageUrl = imageUrl;

        if (imageFile) {
            const uploadResult = await uploadNewsImage(imageFile, token);
            if (!uploadResult.success) {
                alert("Gagal mengunggah gambar: " + uploadResult.msg);
                        return;
            }
            finalImageUrl = uploadResult.url;

            // If updating and a new image is uploaded, consider deleting the old one
            if (currentNewsItem && currentNewsItem.image_url && currentNewsItem.image_url !== finalImageUrl) {
                const oldImageDeleteResult = await deleteImage(currentNewsItem.image_url, token);
                if (!oldImageDeleteResult.success) {
                    console.warn("Failed to delete old news image file:", oldImageDeleteResult.msg);
                }
            }
        } else if (!imageUrl && !currentNewsItem) {
            finalImageUrl = "https://placehold.co/800x400/CCCCCC/333333?text=No+Image";
        }

        const payload = {
            title,
            date: date,
            content,
            image_url: finalImageUrl,
        };
    
        let result;
        if (currentNewsItem) {
            result = await updateNews(currentNewsItem.id, payload, token);
        } else {
            result = await addNews(payload, token);
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
                        <h2 className="text-xl font-semibold text-gray-800">Daftar Berita</h2>
                        <button
                            onClick={handleAddNews}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                        >
                            <PlusCircle className="mr-2" size={20} /> Tambah Berita
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsList.length === 0 ? (
                            <p className="text-gray-600 col-span-full text-center">Belum ada berita.</p>
                        ) : (
                            newsList.map((news) => (
                                <DashboardNewsCard
                                    key={news.id}
                                    news={{
                                        id: news.id,
                                        title: news.title,
                                        date: news.date ? new Date(news.date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
                                        image: news.image_url,
                                        content: news.content,
                                        image_url: news.image_url,
                                        published_date: news.date,
                                    }}
                                    handleEditNews={() => handleEditNews(news)}
                                    handleDeleteNews={() => handleDeleteNews(news)}
                                    handleViewNews={() => handleViewNews(news)}
                                />
                            ))
                        )}
                    </div>
                </main>
            </div>

            <NewsForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={currentNewsItem ? "Edit Berita" : "Tambah Berita Baru"}
                newsData={currentNewsItem}
                onSubmit={handleSaveNews}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Apakah Anda yakin ingin menghapus berita "${currentNewsItem?.title}" ini?`}
            />

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title={viewingNewsItem?.title}
            >
                {viewingNewsItem && (
                    <div className="text-gray-800">
                        <img
                            src={viewingNewsItem.image_url}
                            alt={viewingNewsItem.title}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Image+Not+Found"; }}
                        />
                        <p className="text-sm text-gray-600 mb-4">{viewingNewsItem.published_date ? new Date(viewingNewsItem.published_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</p>
                        <div dangerouslySetInnerHTML={formatContentForDisplay(viewingNewsItem.content)} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardNews;