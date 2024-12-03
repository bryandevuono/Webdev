import { Guid } from "guid-typescript";

type OfficeAttendanceInput = {
    OfficeAttendanceId: Guid;
    Start: Date;
    End: Date;
    UserId: Guid;
}

export const PostOfficeAttendace = async (UserInfoInput: OfficeAttendanceInput, navigate: Function): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

    const response = await fetch('http://localhost:5053/api/officeattendance', requestOptions);
    if (response.ok) {
        return true;
    } else {
        return false;
    }
};