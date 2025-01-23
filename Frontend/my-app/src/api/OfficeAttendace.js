"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOfficeAttendance = exports.GetUserName = exports.PostOfficeAttendace = exports.GetAllOfficeAttendace = void 0;
const GetAllOfficeAttendace = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:5053/api/officeattendance", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = yield response.json();
    const OfficeAttendances = [];
    for (let i = 0; i < data.length; i++) {
        const OfficeAttendanceToAdd = {
            type: "office attendance",
            Start: data[i].start,
            End: data[i].end,
            UserId: data[i].userId,
        };
        OfficeAttendances.push(OfficeAttendanceToAdd);
    }
    return OfficeAttendances;
});
exports.GetAllOfficeAttendace = GetAllOfficeAttendace;
const PostOfficeAttendace = (UserInfoInput, navigate) => __awaiter(void 0, void 0, void 0, function* () {
    UserInfoInput.Start = new Date(UserInfoInput.Start).toISOString();
    UserInfoInput.End = new Date(UserInfoInput.End).toISOString();
    const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserInfoInput),
    };
    const response = yield fetch("http://localhost:5053/api/officeattendance", requestOptions);
    if (response.ok) {
        console.log("Office Attendance Submitted:", UserInfoInput);
        return true;
    }
    else {
        console.log("Office Attendance Failed:", UserInfoInput);
        return false;
    }
});
exports.PostOfficeAttendace = PostOfficeAttendace;
const GetUserName = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/user/getuserbyid?userId=${UserId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = yield response.json();
    console.log(data);
    const name = `${data.firstname} ${data.lastname}`;
    return name;
});
exports.GetUserName = GetUserName;
const DeleteOfficeAttendance = (officeAttendanceId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/officeattendance/${officeAttendanceId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        console.log("Office Attendance Deleted:", officeAttendanceId);
        return true;
    }
    else {
        console.log("Office Attendance Failed to Delete:", officeAttendanceId);
        return false;
    }
});
exports.DeleteOfficeAttendance = DeleteOfficeAttendance;
