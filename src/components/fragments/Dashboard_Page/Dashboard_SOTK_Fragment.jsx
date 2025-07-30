import { useState } from 'react';
import { PencilSquare, Trash, PersonPlusFill } from 'react-bootstrap-icons';
import SOTKFormModal from '../../elements/Modal/SOTKMemberForm';
import ConfirmationModal from '../../elements/Modal/ConfirmationModal';

const DashboardSOTK = () => {
    const [sotkMembers, setSotkMembers] = useState([
        {
            id: 1,
            name: 'Hairuddin',
            role: 'Lurah',
            imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Hairuddin',
        },
        {
            id: 2,
            name: 'Andi Sari',
            role: 'Sekretaris',
            imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Andi+Sari',
        },
        {
            id: 3,
            name: 'Sudirman',
            role: 'Bendahara',
            imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Sudirman',
        },
        {
            id: 4,
            name: 'Dewi Lestari',
            role: 'Kepala Seksi Pemerintahan',
            imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Dewi+Lestari',
        },
        {
            id: 5,
            name: 'Budi Santoso',
            role: 'Kepala Seksi Kesejahteraan Sosial',
            imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Budi+Santoso',
        },
        {
            id: 6,
            name: 'Siti Aminah',
            role: 'Kepala Seksi Pelayanan',
            imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Siti+Aminah',
        },
    ]);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);
    const [memberToDeleteId, setMemberToDeleteId] = useState(null);

    const handleAddSOTK = () => {
        setCurrentMember(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (id) => {
        const memberToEdit = sotkMembers.find((member) => member.id === id);
        setCurrentMember(memberToEdit);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setMemberToDeleteId(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        setSotkMembers(sotkMembers.filter((member) => member.id !== memberToDeleteId));
        setIsConfirmModalOpen(false);
        setMemberToDeleteId(null);
    };

    const handleFormSubmit = (newMember) => {
        if (currentMember) {
            setSotkMembers(sotkMembers.map((member) =>
                member.id === newMember.id ? newMember : member
            ));
        } else {
            setSotkMembers([...sotkMembers, newMember]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-inter">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Struktur Organisasi dan Tata Kelola</h2>
                <button
                    onClick={handleAddSOTK}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
                >
                    <PersonPlusFill className="mr-2" /> Tambah SOTK
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sotkMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                        <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-300 flex-shrink-0"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A0A0A0/FFFFFF?text=No+Image" }} // Fallback image
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-gray-600 text-sm">{member.role}</p>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(member.id)}
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                title="Edit"
                            >
                                <PencilSquare size={18} />

                            </button>
                            <button
                                onClick={() => handleDeleteClick(member.id)}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                title="Delete"
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <SOTKFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                memberData={currentMember}
                onSubmit={handleFormSubmit}
            />

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                message="Yakin ingin menghapus SOTK ini?"
            />
        </div>
    );
};

export default DashboardSOTK;