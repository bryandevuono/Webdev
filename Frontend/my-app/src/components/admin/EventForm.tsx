export function EventForm() {
  return (
    <>
      <h1>Create Event</h1>
      <form>
        <label>
          Event Name:
          <input type="text" name="name" />
        </label>
        <label>
          Event Description:
          <input type="text" name="description" />
        </label>
        <label>
          Event Date:
          <input type="date" name="date" />
        </label>
        <label>
          Event Start time:
          <input type="time" name="time" />
        </label>
        <label>
          Event End time:
          <input type="time" name="time" />
        </label>
        <label>
          Event Location:
          <input type="text" name="location" />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </>
  );
}

export default EventForm;
