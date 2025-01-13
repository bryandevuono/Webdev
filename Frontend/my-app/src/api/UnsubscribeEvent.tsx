import { getUserId } from "./Login";

type UnsubscribeEventBody = {
  UserId: string,
  EventId: string,
  Rating: string,
  FeedBack: string
}

export const UnsubscribeEvent = async (eventId: string, setAttendanceSuccess:Function, setAttendanceError: Function): Promise<boolean> => {

    const userId = await getUserId();
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' }
    };
    
    const response = await fetch(`http://localhost:5053/api/eventattendance/${userId}/${eventId}`, requestOptions);
  
  if (response.ok) {
    setAttendanceSuccess(true);
    return true;
  } else {
    setAttendanceError(true);
    return false;
  }
};