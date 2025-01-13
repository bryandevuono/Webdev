import React from "react";
import { DeleteOfficeAttendance } from "../api/OfficeAttendace";
import { OfficeAttendance } from "../api/OfficeAttendace";
import { CalendarEvent } from "./EventCalendar";

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

  const handleDelete = async () => {
    console.log(currentEvent);
    if (
      (await DeleteOfficeAttendance("874b398d-9788-4193-9cfb-4e71fd7a627e")) ===
      true
    ) {
      alert("Office Attendance Deleted");
    } else {
      alert("Failed to delete Office Attendance");
    }
    setShowPopup(false);
  };

  return (
    <div className="office-attendance-popup">
      <div className="office-attendance-popup-top">
        <h1>Office Attendance</h1>
        <button onClick={handleExit}>X</button>
      </div>
      <div className="office-attendance-popup-bottom">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default OfficeAttendancePopup;
