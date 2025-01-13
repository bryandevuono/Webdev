import { useState } from "react";
import { EventRequestBody, OfficeEvent, editEvent} from "../api/Events";

interface EventPopUpProps {
    currentEvent: OfficeEvent;
    setShowPopup: Function;
    setSuccess: Function;
    setConfirmDelete: Function;
    setFailed: Function;
}

const EditEventPopUp = ({currentEvent, setShowPopup, setSuccess, setConfirmDelete, setFailed}: EventPopUpProps): JSX.Element => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedEvent: EventRequestBody = {
            title: title,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime
        }
        
        const Edit = await editEvent(currentEvent.eventId, updatedEvent);
        if (!Edit){
            setFailed(true);
            setShowPopup(false);
            return;
        }

        setShowPopup(false);
        setSuccess(true);
    };

    const handleDeleteClick = () => {
        setConfirmDelete(true);
        setShowPopup(false);
    }

    return (
        <div className="popup-overlay">
            <div className="popup">

                <h2>Edit the Event</h2>

                <div>
                    <form onSubmit={handleSubmit} className="popup-form">
                        <label>
                            Title: 
                            <input className="input-style" onChange={(e) => setTitle(e.target.value)}/>
                        </label>

                        <label>
                            Description:
                            <input className="input-style" onChange={(e) => setDescription(e.target.value)}/>
                        </label>

                        <label>
                            Location:
                            <input className="input-style" onChange={(e) => setLocation(e.target.value)}/>
                        </label>

                        <label className="popup-date">
                            Start Time:
                            <input
                                type="datetime-local"
                                name="start"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </label>

                        <label className="popup-date">
                            End Time:
                            <input
                                type="datetime-local"
                                name="end"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </label>

                        <br/>

                        <button type="submit">Submit</button>
                        <button onClick={() => handleDeleteClick()}>Delete Event</button>
                        <button type="submit" onClick={() => setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditEventPopUp;