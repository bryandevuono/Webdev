import { Event } from "react-big-calendar";
export const AttendEvent = async (event: Event): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
    };

  const response = await fetch("http://localhost:5053/api/eventattendance/attend", requestOptions);
  
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};