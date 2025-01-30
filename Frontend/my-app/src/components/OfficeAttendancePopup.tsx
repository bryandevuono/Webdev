import React from "react";
import { DeleteOfficeAttendance } from "../api/OfficeAttendace";
import { CalendarEvent } from "./EventCalendar";
import { Guid } from "guid-typescript";

interface OfficeAttendancePopupProps {
  currentEvent: CalendarEvent;
  setShowPopup: Function;
}

const OfficeAttendancePopup = ({
  currentEvent,
  setShowPopup,
}: OfficeAttendancePopupProps): JSX.Element => {
  const handleExit = () => {
    setShowPopup(false);
  };

  const handleDelete = (eventId: Guid) => async () => {
    if (await DeleteOfficeAttendance(eventId)) {
      setShowPopup(false);
    }
    else {
      console.log("Failed to delete event");
      alert("Failed to delete event");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-overlay-content">
        <h1>Office attendance By {currentEvent.title}</h1>
        <h2>
          Date: {currentEvent.start.toLocaleDateString()}
          <br />
          Time: {currentEvent.start.toLocaleTimeString()} -{" "} {currentEvent.end.toLocaleTimeString()}
        </h2>
        <button onClick={handleDelete(Guid.parse(currentEvent.Id))}>Delete</button>
        <button onClick={handleExit}>Exit</button>
      </div>
    </div >
  );
};

export default OfficeAttendancePopup;
