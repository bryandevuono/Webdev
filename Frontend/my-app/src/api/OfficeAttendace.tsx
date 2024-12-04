type OfficeAttendanceInput = {
    Start: string;
    End: string;
    UserId: string;
}

export const PostOfficeAttendace = async (UserInfoInput: OfficeAttendanceInput, navigate: Function): Promise<boolean> => {
    UserInfoInput.Start = new Date(UserInfoInput.Start).toISOString();
    UserInfoInput.End = new Date(UserInfoInput.End).toISOString();

    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

    const response = await fetch('http://localhost:5053/api/officeattendance', requestOptions);
    if (response.ok) {
        console.log("Office Attendance Submitted:", UserInfoInput);
        return true;
    } else {
        console.log("Office Attendance Failed:", UserInfoInput);
        return false;
    }
};