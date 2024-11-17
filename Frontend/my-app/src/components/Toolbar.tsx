import React from "react";
import { ToolbarProps } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CustomToolbar = (props: ToolbarProps): JSX.Element => {
    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button onClick={() => props.onNavigate("PREV")}>Back</button>
                <button onClick={() => props.onNavigate("NEXT")}>Next</button>
                <button
                    style={{
                        backgroundColor: '#007bff',
                        color: "white",
                        borderColor: "#007bff"
                    }}
                >
                    +
                </button>
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
