import { useState } from "react";
import { Event} from 'react-big-calendar';
import { useNavigate } from "react-router-dom";
import { EventRequestBody, editEvent} from "../api/Events";
import { Event as BigCalendarEvent } from 'react-big-calendar';

interface EventPopUpProps {
    currentEvent: string;
    setShowPopup: Function;
    setSuccess: Function;
}

const EventPopUp = ({currentEvent, setShowPopup, setSuccess}: EventPopUpProps): JSX.Element => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const handleSubmit = () => {
        const updatedEvent: EventRequestBody = {
            title: title,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime
        }
        
        editEvent(currentEvent, updatedEvent);
        setShowPopup(false);
        setSuccess(true);
    };
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
                                required
                            />
                        </label>

                        <label className="popup-date">
                            End Time:
                            <input
                                type="datetime-local"
                                name="end"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </label>

                        <br/>

                        <button type="submit">Submit</button>
                        <button type="submit" onClick={() => setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EventPopUp;