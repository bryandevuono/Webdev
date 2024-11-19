import React, { useState } from "react";
import { ToolbarProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Toolbar.css";

const CustomToolbar = (props: ToolbarProps): JSX.Element => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        starttime: "",
        endtime: "",
        location: ""
    });

    const togglePopup = () => {
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
                <button onClick={togglePopup}>Open Form</button>
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Add an event to the calendar</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
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
                                <div>
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
                                <div>
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
                                <div>
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
                                <div>
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
                                <div>
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
                )}
            </span>
            <span className="rbc-toolbar-label">{props.label}</span>
            <span className="rbc-btn-group">
                <button onClick={() => props.onView("month")}>Month</button>
                <button onClick={() => props.onView("week")}>Week</button>
                <button onClick={() => props.onView("day")}>Day</button>
                <button onClick={() => props.onView("agenda")}>Agenda</button>
            </span>
        </div>
    );
};

export default CustomToolbar;
