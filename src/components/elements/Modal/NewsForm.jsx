import { useEffect, useState } from "react";
import Modal from "./Modal";

const NewsForm = ({ isOpen, onClose, title, formData, handleChange, handleSaveNews }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (formData.image) {
                setImagePreview(formData.image);
            } else {
                setImagePreview('');
            }
            setImageError('');
            setImageFile(null);
        }
    }, [isOpen, formData.image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setImageError('Tipe file tidak disupport. Harap unggah file JPG, PNG, atau JPEG.');
                setImageFile(null);
                setImagePreview('');
                handleChange({ target: { name: 'image', value: '' } });
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5 MB
            if (file.size > maxSize) {
                setImageError('Ukuran Gambar Melebihi 5MB.');
                setImageFile(null);
                setImagePreview('');
                handleChange({ target: { name: 'image', value: '' } });
                return;
            }

            setImageError('');
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                handleChange({ target: { name: 'image', value: reader.result } });
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(formData.image || '');
            setImageError('');
            handleChange({ target: { name: 'image', value: formData.image || '' } });
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <form onSubmit={handleSaveNews}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Judul Berita</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Tanggal</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Unggah Gambar</label>
                    <input
                        type="file"
                        id="image"
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
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar:</p>
                            <img
                                src={imagePreview}
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
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Konten Berita</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
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