export type EventAttendance = {
  officeAttendanceId: number;
  start: Date;
  end: Date;
  userId: number;
};

export const fetchEventAttendance = async (): Promise<EventAttendance[]> => {
  try {
    const response = await fetch("http://localhost:5053/api/eventattendance");
    const result = await response.json();
    console.log(result);
    return await result;
  } catch (error) {
    console.error("Error fetching event attendance:", error);
    return [];
  }
};
