import { Guid } from "guid-typescript";

type OfficeAttendanceInput = {
    Start: string;
    End: string;
    UserId: string;
}

export const PostOfficeAttendace = async (UserInfoInput: OfficeAttendanceInput, navigate: Function): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

    UserInfoInput.Start = `${UserInfoInput.Start}:00z`;
    UserInfoInput.End = `${UserInfoInput.End}:00z`;

    const response = await fetch('http://localhost:5053/api/officeattendance', requestOptions);
    if (response.ok) {
        console.log("Office Attendance Submitted:", UserInfoInput);
        return true;
    } else {
        console.log("Office Attendance Failed:", UserInfoInput);
        return false;
    }
};