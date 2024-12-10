import {useEffect, useState} from 'react';
import { getAllEvents } from '../api/Events';
import Calendar from './Calendar';
import { CalendarEvent } from './EventCalendar';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import EventPopUp from './EventPopUp';

const AdminManageEvents = (): JSX.Element => {
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);
    const [currentEvent, setCurrentEvent] = useState<BigCalendarEvent | undefined>(undefined);
    const [showPopup, setShowPopup] = useState(false);

    const getEvents = async () => {
        const AllEvents = await getAllEvents();
        setEvents(AllEvents as CalendarEvent[]);
    };
    
    const handleEventClick = (event: BigCalendarEvent) => {
        setCurrentEvent(event);
        setShowPopup(true);
    }

    const handleSlotClick = (slotInfo: any) => {
        console.log('Selected slot:', slotInfo);
        // Add your logic here to handle slot click
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
    <>
        <h1 className='admin-dashboard-text'>Click on one of the event titles to edit an event:</h1>
        <Calendar    
            selectable
            onSelectSlot={(event) => handleSlotClick(event)}
            events={events} 
            className="admin-events" 
            view="agenda" 
            onSelectEvent={(event) => handleEventClick(event)}
            toolbar={false}
        />
        {showPopup ? <EventPopUp setShowPopup={setShowPopup} currentEvent={currentEvent}/> : null}
    </>
    );
}

export default AdminManageEvents;