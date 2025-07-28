import { useEffect, useState } from "react";
import Modal from "./Modal";

const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 9);
};

const SOTKFormModal = ({ isOpen, onClose, memberData, onSubmit }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        if (memberData) {
            setName(memberData.name);
            setRole(memberData.role);
            setImageUrl(memberData.imageUrl);
            setImagePreview(memberData.imageUrl);
            setImageFile(null);
        } else {
            setName('');
            setRole('');
            setImageUrl('');
            setImageFile(null);
            setImagePreview('');
            setImageError('');
        }
    }, [memberData, isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setImageError('Tipe file tidak disupport.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setImageError('Ukuran Gambar Melebihi 5MB');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            setImageError('');
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(memberData ? memberData.imageUrl : '');
            setImageError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !role.trim()) {
            alert('Nama dan jabatan tidak boleh kosong.');
            return;
        }

        let finalImageUrl = imageUrl;
        if (imageFile) {
            finalImageUrl = imagePreview;
        } else if (!memberData && !imagePreview) {
            finalImageUrl = 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=No+Image';
        }

        const newMember = {
            id: memberData ? memberData.id : generateUniqueId(),
            name,
            role,
            imageUrl: finalImageUrl,
        };
        onSubmit(newMember);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={memberData ? 'Edit SOTK' : 'Tambah SOTK'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Foto (Max 5MB, JPG/PNG/JPEG)</label>
                    <input
                        type="file"
                        id="image"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                    {imagePreview && (
                        <div className="mt-4 flex justify-center">
                            <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover rounded-full border-2 border-indigo-300" />
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
                        {memberData ? 'Simpan Perubahan' : 'Tambahkan'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SOTKFormModal;