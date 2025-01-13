import React from 'react';
import { useState } from 'react';
import { addEvent } from '../api/Events';

interface AddEventPopUpProps {
    setShowPopup: Function;
    setSuccess: Function;
    setFailed: Function;
}

export default function AddEventPopUp({setShowPopup, setSuccess, setFailed}: AddEventPopUpProps): JSX.Element {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const eventInfo = {
            title: title,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime
        };

        const Add = await addEvent(eventInfo);
        
        if (!Add){
            setFailed(true);
            setShowPopup(false);
            return;
        }

        setSuccess(true);
        setShowPopup(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup">

                <h2>Add Event</h2>

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

                        <button type="submit" onClick={(event) => handleSubmit(event)}>Submit</button>
                        <button type="submit" onClick={() => setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}