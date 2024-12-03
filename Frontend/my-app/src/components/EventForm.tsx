import { useState, ChangeEvent, FormEvent } from "react";
import { Event, postEvent } from "../api/Events";
import "../../EventForm.css";

export function EventForm() {
  const [formData, setFormData] = useState<Event>({
    Title: "",
    Description: "",
    Date: "",
    StartTime: "",
    EndTime: "",
    Location: "",
    AdminAproval: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      postEvent(formData);
      alert("Event created successfully");

      setFormData({
        Title: "",
        Description: "",
        Date: "",
        StartTime: "",
        EndTime: "",
        Location: "",
        AdminAproval: false,
      });
    } catch (error) {
      console.error("Error posting event:", error);
      alert("Error creating event");
    }
  };

  return (
    <div className="event_form_container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Title">Event Name:</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description:</label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Date">Date:</label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="StartTime">Start Time:</label>
          <input
            type="time"
            id="StartTime"
            name="StartTime"
            value={formData.StartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="EndTime">End Time:</label>
          <input
            type="time"
            id="EndTime"
            name="EndTime"
            value={formData.EndTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location:</label>
          <input
            type="text"
            id="Location"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
