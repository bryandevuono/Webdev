import { getUserId } from "./Login";

export const UnsubscribeEvent = async (eventId: string): Promise<boolean> => {

  const userId = await getUserId();
  const requestOptions = {
      method: 'DELETE',
      credentials: 'include' as RequestCredentials,
      headers: { 'Content-Type': 'application/json' }
  };
    
  const response = await fetch(`http://localhost:5053/api/eventattendance/${userId}/${eventId}`, requestOptions);
  
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};