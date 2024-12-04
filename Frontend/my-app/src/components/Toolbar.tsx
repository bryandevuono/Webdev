import React, { useState, useEffect } from "react";
import { ToolbarProps } from "react-big-calendar";
import { Guid } from "guid-typescript";
import { GetUserId } from "../api/Login";
import { PostOfficeAttendace } from "../api/OfficeAttendace";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Toolbar.css"

interface OfficeAttendanceInput {
    Start: string;
    End: string;
    UserId: string;
}

const CustomToolbar = (props: ToolbarProps): JSX.Element => {
    const [Id, setId] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState<OfficeAttendanceInput>({
        Start: "",
        End: "",
        UserId: "",
    });

    useEffect(() => {
        const GetId = async () => {
            const UserId = await GetUserId();
            setId(UserId);
        };
        GetId();
    }, []);

    useEffect(() => {
        if (Id) {
            setFormData((prev) => ({ ...prev, UserId: Id }));
        }
    }, [Id]);

    const togglePopup = () => {
        setFormData((prev) => ({
            ...prev,
            Start: "",
            End: "",
            UserId: Id,
        }));
        setShowPopup((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        PostOfficeAttendace(formData, props.onNavigate);
        setShowPopup(false);
    };

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button onClick={() => props.onNavigate("PREV")}>Back</button>
                <button onClick={() => props.onNavigate("NEXT")}>Next</button>
                <button onClick={togglePopup}>Add office attendance</button>
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Add an office attendance to the calendar</h2>
                            <div className="popup-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="popup-descriptions">
                                        <label>
                                            Start Time:
                                            <input
                                                type="datetime-local"
                                                name="Start"
                                                value={formData.Start}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="popup-date">
                                        <label>
                                            End Time:
                                            <input
                                                type="datetime-local"
                                                name="End"
                                                value={formData.End}
                                                onChange={handleInputChange}
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
                <button onClick={() => props.onView("agenda")}>Agenda</button>
            </span>
        </div>
    );
};

export default CustomToolbar;
