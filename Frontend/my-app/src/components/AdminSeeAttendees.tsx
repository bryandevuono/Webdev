import { useEffect, useState } from 'react';
import { getAllEvents } from '../api/Events';
import { getEventAttendees } from '../api/EventAttendance';
import { getUserData } from '../api/Users';
import Calendar from './Calendar';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import { CalendarEvent } from './EventCalendar';
import UserListPopup from './UserListPopup';

interface OfficeEvent extends BigCalendarEvent {
    eventId: string;
}

const AdminSeeAttendees = (): JSX.Element => {
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);
    const [currentEvent, setCurrentEvent] = useState<OfficeEvent | undefined>(undefined);
    const [attendees, setAttendees] = useState<string[]>([]);
    const [userNames, setUserNames] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const getEvents = async () => {
        try {
            const allEvents = await getAllEvents();
            if (!Array.isArray(allEvents)) {
                throw new Error('Invalid event data');
            }
            setEvents(allEvents as CalendarEvent[]);
        } catch (err: unknown) {
            console.error("Error fetching events:", err);
            setError("Failed to fetch events. Please try again later.");
        }
    };

    const handleEventClick = async (event: BigCalendarEvent) => {
        try {
            const eventTitle = typeof event.title === 'string' ? event.title : '';
            const eventAttendees = await getEventAttendees(eventTitle);

            if (!Array.isArray(eventAttendees)) {
                throw new Error('Invalid attendees data');
            }

            const userIds = eventAttendees.map((attendee) => attendee.userId);
            setAttendees(userIds);
            setCurrentEvent({ ...event, kind: "event", eventId: (event as OfficeEvent).eventId } as OfficeEvent);

            const userDetails = await Promise.all(userIds.map(async (userId) => {
                try {
                    const userInfo = await getUserData(userId);
                    console.log(`User data for ID ${userId}:`, userInfo);
                    return `${userInfo.firstName} ${userInfo.lastName}`;
                } catch (userError) {
                    console.error(`Error fetching user data for ID ${userId}:`, userError);
                    return "Unknown User";
                }
            }));

            setUserNames(userDetails);
            setIsPopupOpen(true);
        } catch (err: unknown) {
            console.error("Error fetching attendees or user data:", err);
            setError("Failed to fetch attendees. Please try again later.");
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className='admin-dashboard'>
            <h1 className='admin-dashboard-text'>Click on one of the event titles to see the attendees:</h1>
            {error && <div className="error-msg"><i className="fa fa-exclamation-triangle"></i>{error}</div>}
            
            <Calendar    
                events={events} 
                className="admin-events" 
                defaultView="agenda" 
                onSelectEvent={(event) => handleEventClick(event)}
                toolbar={false}
                selectable={true} 
            />

            <UserListPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                users={userNames}
                eventTitle={typeof currentEvent?.title === 'string' ? currentEvent.title : ''}
            />
        </div>
    );
};

export default AdminSeeAttendees;