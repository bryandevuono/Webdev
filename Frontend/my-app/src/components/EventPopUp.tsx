import { useState } from "react";
import { Event} from 'react-big-calendar';

interface EventPopUpProps {
    currentEvent: Event;
    popupToggle: boolean;
}
const EventPopUp = ({currentEvent, popupToggle}: EventPopUpProps): JSX.Element => {
    const [showPopup, setShowPopup] = useState(popupToggle);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        console.log("Submitted");
    };

    return (
        <>
            {showPopup ? 
            <div className="popup-overlay">
                <div className="popup">
                    <h2>Edit the Event</h2>
                    <div className="popup-form">
                        <form onSubmit={handleSubmit}>
                            <div className="popup-descriptions">
                                <label>
                                    Start Time:
                                    <input
                                        type="datetime-local"
                                        name="start"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="popup-date">
                                <label>
                                    End Time:
                                    <input
                                        type="datetime-local"
                                        name="end"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="popup-date">
                                <label>
                                    Date of Event:
                                    <input
                                        type="datetime-local"
                                        name="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <button type="submit">Submit</button>
                            <button type="submit" onClick={() => setShowPopup(false)}>Cancel</button>
                        </form>
                    </div>
                </div>    
        </div>: null}
        </>
    );
}

export default EventPopUp;