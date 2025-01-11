import React from "react";
import "../App.css";

const Legend = (): JSX.Element => {
    return (
        <div className="legend">
            <p>Legend:</p>
            <br/>
            <div className="legend-item-1">
                <div className="legend-color" style={{backgroundColor: "blue"}}></div>
                <p>Event</p>
            </div>
            <div className="legend-item-2">
                <div className="legend-color" style={{backgroundColor: "grey"}}></div>
                <p>Office attendance</p>
            </div>
        </div>
    );
}

export default Legend;