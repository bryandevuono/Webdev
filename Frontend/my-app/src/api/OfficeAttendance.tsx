export type OfficeAttendance = {
  officeAttendanceId: number;
  start: Date;
  end: Date;
  userId: number;
};

export const postOfficeAttendance = async (
  data: OfficeAttendance
): Promise<OfficeAttendance[]> => {
  const url = "http://localhost:5053/api/officeattendance";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      return await response.json();
    } else {
      throw new Error("Error posting office attendance");
    }
  } catch (error) {
    console.error("Error posting office attendance:", error);
    return [];
  }
};

export const fetchOfficeAttendance = async (): Promise<OfficeAttendance[]> => {
  try {
    const response = await fetch("http://localhost:5053/api/officeattendance");
    console.log(response.body);
    return await response.json();
  } catch (error) {
    console.error("Error fetching office attendance:", error);
    return [];
  }
};
