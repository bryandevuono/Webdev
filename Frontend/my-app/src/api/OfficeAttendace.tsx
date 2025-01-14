import { CalendarEvent } from "../components/EventCalendar";

type OfficeAttendance = {
  type: "office attendance";
  Start: string;
  End: string;
  UserId: string;
};

export const GetAllOfficeAttendace = async (): Promise<
  Array<OfficeAttendance>
> => {
  const response = await fetch("http://localhost:5053/api/officeattendance", {
    method: "GET",
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const OfficeAttendances: Array<OfficeAttendance> = [];

  for (let i = 0; i < data.length; i++) {
    const OfficeAttendanceToAdd: OfficeAttendance = {
      type: "office attendance",
      Start: data[i].start,
      End: data[i].end,
      UserId: data[i].userId,
    };
    OfficeAttendances.push(OfficeAttendanceToAdd);
  }
  return OfficeAttendances;
};

export const PostOfficeAttendace = async (
  UserInfoInput: OfficeAttendance,
  navigate: Function
): Promise<boolean> => {
  UserInfoInput.Start = new Date(UserInfoInput.Start).toISOString();
  UserInfoInput.End = new Date(UserInfoInput.End).toISOString();

  const requestOptions = {
    method: "POST",
    credentials: "include" as RequestCredentials,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UserInfoInput),
  };

  const response = await fetch(
    "http://localhost:5053/api/officeattendance",
    requestOptions
  );
  if (response.ok) {
    console.log("Office Attendance Submitted:", UserInfoInput);
    return true;
  } else {
    console.log("Office Attendance Failed:", UserInfoInput);
    return false;
  }
};

export const GetUserName = async (UserId: string): Promise<string> => {
  const response = await fetch(
    `http://localhost:5053/api/user/getuserbyid?userId=${UserId}`,
    {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  console.log(data);
  const name = `${data.firstname} ${data.lastname}`;
  return name;
};

export const DeleteOfficeAttendance = async (
  officeAttendanceId: string
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:5053/api/officeattendance/${officeAttendanceId}`,
    {
      method: "DELETE",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("Office Attendance Deleted:", officeAttendanceId);
    return true;
  } else {
    console.log("Office Attendance Failed to Delete:", officeAttendanceId);
    return false;
  }
};
