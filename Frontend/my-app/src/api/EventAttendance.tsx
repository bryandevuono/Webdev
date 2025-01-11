import { Event } from "react-big-calendar"
import moment from "moment";

export const getEventAttendees = async (eventId: string): Promise<string[]> => {
    const response = await fetch(`/api/eventattendance/${eventId}/attendees`);
    if (!response.ok) {
        throw new Error("Failed to fetch attendees");
    }
    return response.json();
};