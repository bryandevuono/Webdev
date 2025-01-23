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
exports.checkUserRegistration = exports.AttendEvent = void 0;
const Login_1 = require("./Login");
const AttendEvent = (eventId, setAttendanceSuccess, setAttendanceError) => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        UserId: yield (0, Login_1.getUserId)(),
        EventId: eventId,
        Rating: "",
        FeedBack: ""
    };
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    const response = yield fetch("http://localhost:5053/api/eventattendance/attend", requestOptions);
    if (response.ok) {
        setAttendanceSuccess(true);
        return true;
    }
    else {
        setAttendanceError(true);
        return false;
    }
});
exports.AttendEvent = AttendEvent;
const checkUserRegistration = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/eventattendance/isUserRegistered/${userId}/${eventId}`);
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.checkUserRegistration = checkUserRegistration;
