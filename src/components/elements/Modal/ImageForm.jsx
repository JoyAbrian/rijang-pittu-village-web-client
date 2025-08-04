import { useEffect, useState } from "react";
import Modal from "./Modal";

const ImageForm = ({ isOpen, onClose, imageData, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (imageData) {
                setTitle(imageData.title);
                setImageUrl(imageData.imageUrl || '');
                setImagePreview(imageData.imageUrl || '');
                setImageFile(null);
                setImageError('');
            } else {
                setTitle('');
                setImageUrl('');
                setImageFile(null);
                setImagePreview('');
                setImageError('');
            }
        }
    }, [imageData, isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setImageError('Tipe file tidak valid. Hanya JPG, PNG, JPEG yang diizinkan.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setImageError('Ukuran gambar melebihi batas 5MB.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            setImageError('');
            setImageFile(file);
            setImageUrl('');

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); 
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(imageData ? imageData.imageUrl : '');
            setImageUrl(imageData ? imageData.imageUrl : '');
            setImageError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Judul tidak boleh kosong.');
            return;
        }

        onSubmit({
            id: imageData?.id,
            title,
            imageFile,
            imageUrl: imageFile ? '' : imageUrl,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={imageData ? 'Edit Gambar Galeri' : 'Tambah Gambar Baru'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Gambar</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Gambar (Max 5MB, JPG/PNG/JPEG)</label>
                    <input
                        type="file"
                        id="image"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                    {(imagePreview || (imageData && imageData.imageUrl && !imageFile)) && (
                        <div className="mt-4 flex justify-center">
                            <img src={imagePreview || imageData.imageUrl} alt="Pratinjau Gambar" className="w-48 h-32 object-cover rounded-lg border-2 border-indigo-300" />
                        </div>
                    )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                        {imageData ? 'Simpan Perubahan' : 'Tambah Gambar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ImageForm;