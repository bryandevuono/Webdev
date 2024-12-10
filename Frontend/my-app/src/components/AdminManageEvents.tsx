import {useEffect, useState} from 'react';
import { getAllEvents } from '../api/Events';
import Calendar from './Calendar';
import { CalendarEvent } from './EventCalendar';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import EventPopUp from './EventPopUp';

const AdminManageEvents = (): JSX.Element => {
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);
    const [currentEvent, setCurrentEvent] = useState<BigCalendarEvent | undefined>(undefined);

    const getEvents = async () => {
        const AllEvents = await getAllEvents();
        setEvents(AllEvents as CalendarEvent[]);
    };
    
    const handleEventClick = (event: BigCalendarEvent) => {
        setCurrentEvent(event);
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
    <>
        <h1 className='admin-dashboard-text'>Click on one of the event titles to edit:</h1>
        <Calendar 
            events={events} 
            className="admin-events" 
            view="agenda" 
            onSelectEvent={(event) => handleEventClick(event)}
            toolbar={false}
        />
        {currentEvent && <EventPopUp currentEvent={currentEvent} popupToggle={true}/>}
    </>
    );
}

export default AdminManageEvents;