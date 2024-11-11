// CustomToolbar.tsx
import React from "react";
import { ToolbarProps } from "react-big-calendar";

const CustomToolbar = (props: ToolbarProps): JSX.Element => {
    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button onClick={() => props.onNavigate("PREV")}>Back</button>
                <button onClick={() => props.onNavigate("NEXT")}>Next</button>
                <button className="">+</button>
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
