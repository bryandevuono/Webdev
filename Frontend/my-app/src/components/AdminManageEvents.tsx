import {useEffect, useState} from 'react';
import { getAllEvents } from '../api/Events';
import Calendar from './Calendar';
import { CalendarEvent } from './EventCalendar';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import EventPopUp from '../pop-up/EventPopUp';

const AdminManageEvents = (): JSX.Element => {
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);

    const getEvents = async () => {
        const AllEvents = await getAllEvents();
        setEvents(AllEvents as CalendarEvent[]);
    };
    
    const handleEventClick = (event: BigCalendarEvent) => {
        console.log(event);
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
    <>
        <Calendar 
            events={events} 
            className="admin-events" 
            view="agenda" 
            onSelectEvent={(event) => handleEventClick(event)}
            toolbar={false}
        />
        <EventPopUp/>
    </>
    );
}

export default AdminManageEvents;