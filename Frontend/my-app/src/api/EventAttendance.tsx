import { Event } from "react-big-calendar"
import moment from "moment";

export const getEventAttendees = async (eventId: string): Promise<{ userId: string }[]> => {
    const response = await fetch(`http://localhost:5053/api/eventattendance/${eventId}/attendees`);
    if (!response.ok) {
        throw new Error("Failed to fetch attendees");
    }
    return response.json();
};