import {useEffect, useState} from 'react';
import { deleteEvent, getAllEvents, OfficeEvent } from '../api/Events';
import Calendar from './Calendar';
import EditEventPopUp from './EditEventPopUp';
import { CalendarEvent } from './EventCalendar';
import AddEventPopUp from './AddEventPopUp';


const AdminManageEvents = (): JSX.Element => {
    const [succes, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);
    const [currentEvent, setCurrentEvent] = useState<OfficeEvent | undefined>(undefined);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);

    const getEvents = async () => {
        const AllEvents = await getAllEvents();
        setEvents(AllEvents as CalendarEvent[]);
    };
    
    const handleEventClick = (event: OfficeEvent) => {
        setCurrentEvent(event);
        setShowEditPopup(true);
        setSuccess(false);
    };

    const handleDeleteClick = () => {
        setConfirmDelete(false);
        if (currentEvent !== undefined && currentEvent.kind === "event") {
            deleteEvent(currentEvent.eventId);
            setSuccess(true);
        }
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
            onSelectEvent={(event) => handleEventClick(event as OfficeEvent)}
            toolbar={false}
            selectable={true} 
        />
        
        <button className='add-button' onClick={() => setShowAddPopup(true)}>+</button>

        {showEditPopup ? 
            <EditEventPopUp 
                setSuccess={setSuccess} 
                setShowPopup={setShowEditPopup} 
                currentEvent={currentEvent as OfficeEvent}
                setConfirmDelete={setConfirmDelete}
                setFailed={setFailed}
            /> 
        : null}
        
        {showAddPopup ? 
            <AddEventPopUp setShowPopup={setShowAddPopup} setSuccess={setSuccess} setFailed={setFailed}/>
        : null}

        {succes ? 
            <div className="success-msg">
                <i className="fa fa-check"></i>
                Changes saved!
            </div> 
        : null}

        {failed ?
            <div className="error-msg">
                <i className="fa fa-times"></i>
                Error saving changes!
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