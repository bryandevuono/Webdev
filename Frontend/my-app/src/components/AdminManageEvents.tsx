import {useEffect, useState} from 'react';
import { deleteEvent, getAllEvents } from '../api/Events';
import Calendar from './Calendar';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import EventPopUp from './EventPopUp';
import { CalendarEvent } from './EventCalendar';


const AdminManageEvents = (): JSX.Element => {
    const [succes, setSuccess] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);
    const [currentEvent, setCurrentEvent] = useState<string>("");
    const [showPopup, setShowPopup] = useState(false);

    const getEvents = async () => {
        const AllEvents = await getAllEvents();
        setEvents(AllEvents as CalendarEvent[]);
    };
    
    const handleEventClick = (event: BigCalendarEvent) => {
        setCurrentEvent(String(event.title) || "");
        setShowPopup(true);
        setSuccess(false);
    };

    const handleDeleteClick = () => {
        setConfirmDelete(false);
        deleteEvent(currentEvent);
        setSuccess(true);
    };

    useEffect(() => {
        getEvents();
    }, [succes]);

    return (
    <div className='admin-dashboard'>
        <h1 className='admin-dashboard-text'>Click on one of the event titles to edit an event:</h1>
        <Calendar    
            events={events} 
            className="admin-events" 
            view="agenda" 
            onSelectEvent={(event) => handleEventClick(event)}
            toolbar={false}
            onSelectSlot={(event) => handleEventClick(event)}  
            selectable={true} 
        />
        
        {showPopup ? 
            <EventPopUp 
                setSuccess={setSuccess} 
                setShowPopup={setShowPopup} 
                currentEvent={currentEvent}
                setConfirmDelete={setConfirmDelete}
            /> 
        : null}
        
        {succes ? 
            <div className="success-msg">
                <i className="fa fa-check"></i>
                Changes saved!
            </div> 
        : null}

        {confirmDelete ? 
            <div className="popup-overlay">
                <div className="popup-form">
                    <h2>Are you sure you want to delete this event?</h2>
                    <button onClick={() => setConfirmDelete(false)}>No</button>
                    <button onClick={() => handleDeleteClick()}>Yes</button>
                </div>
            </div>
        : null}
    </div>
    );
}

export default AdminManageEvents;