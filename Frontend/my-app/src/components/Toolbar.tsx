import React, { useState } from "react";
import { ToolbarProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Toolbar.css"
interface FormData {
    title: string;
    description: string;
    date: string;
    starttime: string;
    endtime: string;
    location: string;
}

const CustomToolbar = (props: ToolbarProps): JSX.Element => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        date: "",
        starttime: "",
        endtime: "",
        location: "",
    });

    const togglePopup = () => {
        if (showPopup) {
            setFormData({
                title: "",
                description: "",
                date: "",
                starttime: "",
                endtime: "",
                location: "",
            });
        }
        setShowPopup(!showPopup);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        setShowPopup(false);
    };

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button onClick={() => props.onNavigate("PREV")}>Back</button>
                <button onClick={() => props.onNavigate("NEXT")}>Next</button>
                <button onClick={togglePopup}>Add event</button>
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Add an event to the calendar</h2>
                            <div className="popup-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="popup-title">
                                        <label>
                                            Title:
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="popup-descriptions">
                                        <label>
                                            Description:
                                            <input
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="popup-date">
                                        <label>
                                            Date:
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="popup-starttime">
                                        <label>
                                            Start Time:
                                            <input
                                                type="time"
                                                name="starttime"
                                                value={formData.starttime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="popup-endtime">
                                        <label>
                                            End Time:
                                            <input
                                                type="time"
                                                name="endtime"
                                                value={formData.endtime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="popup-location">
                                        <label>
                                            Location:
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <button type="submit">Submit</button>
                                    <button onClick={togglePopup}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </span>
            <span className="rbc-toolbar-label">{props.label}</span>
            <span className="rbc-btn-group">
                <button onClick={() => props.onView("month")}>Month</button>
                <button onClick={() => props.onView("week")}>Week</button>
                <button onClick={() => props.onView("day")}>Day</button>
                <button onClick={() => props.onView("agenda")}>Events</button>
            </span>
        </div>
    );
};

export default CustomToolbar;
