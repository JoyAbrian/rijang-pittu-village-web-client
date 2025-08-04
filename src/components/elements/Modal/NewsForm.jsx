import { useEffect, useState } from "react";
import Modal from "./Modal";

const NewsForm = ({ isOpen, onClose, title, newsData, onSubmit }) => {
    const [newsTitle, setNewsTitle] = useState('');
    const [newsDate, setNewsDate] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [existingImageUrl, setExistingImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (newsData) {
                setNewsTitle(newsData.title || '');
                setNewsDate(newsData.published_date ? new Date(newsData.published_date).toISOString().split('T')[0] : '');
                setNewsContent(newsData.content || '');
                setExistingImageUrl(newsData.image_url || '');
                setImagePreview(newsData.image_url || '');
                setImageFile(null);
                setImageError('');
            } else {
                setNewsTitle('');
                setNewsDate('');
                setNewsContent('');
                setExistingImageUrl('');
                setImageFile(null);
                setImagePreview('');
                setImageError('');
            }
        }
    }, [isOpen, newsData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setImageError('Tipe file tidak disupport. Harap unggah file JPG, PNG, atau JPEG.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setImageError('Ukuran Gambar Melebihi 5MB.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            setImageError('');
            setImageFile(file);
            setExistingImageUrl('');

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(newsData?.image_url || '');
            setExistingImageUrl(newsData?.image_url || '');
            setImageError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newsTitle.trim() || !newsDate.trim() || !newsContent.trim()) {
            alert('Judul, tanggal, dan konten tidak boleh kosong.');
            return;
        }

        onSubmit({
            id: newsData?.id || null,
            title: newsTitle,
            date: newsDate,
            content: newsContent,
            imageFile,
            imageUrl: imageFile ? '' : existingImageUrl,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="newsTitle" className="block text-gray-700 text-sm font-bold mb-2">Judul Berita</label>
                    <input
                        type="text"
                        id="newsTitle"
                        name="title"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newsDate" className="block text-gray-700 text-sm font-bold mb-2">Tanggal</label>
                    <input
                        type="date"
                        id="newsDate"
                        name="date"
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newsImage" className="block text-gray-700 text-sm font-bold mb-2">Unggah Gambar</label>
                    <input
                        type="file"
                        id="newsImage"
                        name="image"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                    {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                    {(imagePreview || (newsData && newsData.image_url && !imageFile)) && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar:</p>
                            <img
                                src={imagePreview || newsData.image_url}
                                alt="Pratinjau"
                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                    console.error("Gagal memuat pratinjau gambar:", e.target.src);
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Gambar+Tidak+Ditemukan";
                                    setImageError("Gambar tidak dapat dimuat. Mungkin rusak atau URL tidak valid.");
                                }}
                            />
                        </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                        Maksimal 5MB. Format: JPG, PNG, JPEG.
                    </p>
                </div>
                <div className="mb-6">
                    <label htmlFor="newsContent" className="block text-gray-700 text-sm font-bold mb-2">Konten Berita</label>
                    <textarea
                        id="newsContent"
                        name="content"
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        rows="8"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tulis konten berita di sini. Gunakan baris kosong untuk paragraf baru."
                        required
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">
                        Gunakan dua baris kosong untuk membuat paragraf baru.
                    </p>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default NewsForm;