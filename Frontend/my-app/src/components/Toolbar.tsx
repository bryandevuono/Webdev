import React, { useState, useEffect } from "react";
import { ToolbarProps } from "react-big-calendar";
import { getUserId } from "../api/Login";
import { PostOfficeAttendace } from "../api/OfficeAttendace";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Toolbar.css";
import { useNavigate } from "react-router-dom";

interface OfficeAttendanceInput {
  type: "office attendance";
  Start: string;
  End: string;
  UserId: string;
}

interface CustomToolbarProps extends ToolbarProps {
  refreshOfficeAttendance: () => void;
}

const CustomToolbar = (props: CustomToolbarProps): JSX.Element => {
  const Navigate = useNavigate();
  const [Id, setId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<OfficeAttendanceInput>({
    type: "office attendance",
    Start: "",
    End: "",
    UserId: "",
  });

  useEffect(() => {
    const GetId = async () => {
      const UserId = await getUserId();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await PostOfficeAttendace(formData, Navigate);
    props.refreshOfficeAttendance(); // Call the refresh function
    setShowPopup(false);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => props.onNavigate("PREV")}>Back</button>
        <button onClick={() => props.onNavigate("NEXT")}>Next</button>
        <button onClick={togglePopup}>Add Office Attendance</button>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h2>Add an office attendance to the calendar</h2>
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
                <button type="button" onClick={togglePopup}>Cancel</button>
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
        <button onClick={() => props.onView("agenda")}>Events</button>
      </span>
    </div>
  );
};

export default CustomToolbar;
