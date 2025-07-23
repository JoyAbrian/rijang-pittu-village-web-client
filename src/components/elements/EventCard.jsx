const getStatusClass = (eventDate, startTime, endTime) => {
    const now = new Date();
    const eventDateTimeStart = new Date(`${eventDate}T${startTime}`);
    const eventDateTimeEnd = new Date(`${eventDate}T${endTime}`);
    const today = new Date().toISOString().split("T")[0];

    if (eventDate < today) return "bg-gray-200 text-gray-800";
    if (eventDate === today && now < eventDateTimeStart) return "bg-yellow-100 text-yellow-800";
    if (eventDate === today && now >= eventDateTimeStart && now <= eventDateTimeEnd) return "bg-green-100 text-green-800";
    if (eventDate > today) return "bg-blue-100 text-blue-800";

    return "bg-white";
};

const EventCard = ({ name, location, eventDate, startTime, endTime }) => {
    const statusClass = getStatusClass(eventDate, startTime, endTime);

    return (
        <div className={`rounded-xl shadow-md p-4 ${statusClass}`}>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-700">📍 {location}</p>
            <p className="text-sm mt-1">📅 {eventDate}</p>
            <p className="text-sm">⏰ {startTime} - {endTime}</p>
        </div>
    );
};

export default EventCard;  