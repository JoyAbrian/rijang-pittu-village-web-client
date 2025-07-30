import { CalendarEvent, ClockFill, GeoAltFill, PencilSquare, Trash } from "react-bootstrap-icons";

const DashboardEventCard = ({ event, handleEditEvent, handleDeleteEvent }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-[1.02]">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <GeoAltFill className="mr-2 text-blue-500" /> {event.location}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <CalendarEvent className="mr-2 text-green-500" /> {event.date}
                </p>
                <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <ClockFill className="mr-2 text-purple-500" /> {event.time}
                </p>
                <div className="flex space-x-2 mt-4">
                    <button
                        onClick={() => handleEditEvent(event)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                        title="Edit Acara"
                    >
                        <PencilSquare size={18} />
                    </button>
                    <button
                        onClick={() => handleDeleteEvent(event)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                        title="Hapus Acara"
                    >
                        <Trash size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardEventCard;