import { useState } from "react";

const EventPopUp = (): JSX.Element => {
    const [showPopup, setShowPopup] = useState(true);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        console.log("Submitted");
    };

    return (
        <div className="">
            {showPopup ? 
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
                            <button onClick={() => setShowPopup(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            : null}       
        </div>
    );
}

export default EventPopUp;