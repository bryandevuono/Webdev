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
exports.ReviewEvent = exports.getEventAttendanceId = exports.updateEventAttendance = exports.getEventAttendees = void 0;
const getEventAttendees = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/eventattendance/${eventId}/attendees`);
    if (!response.ok) {
        throw new Error("Failed to fetch attendees");
    }
    return response.json();
});
exports.getEventAttendees = getEventAttendees;
const updateEventAttendance = (eventId, userId, rating, feedback) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ userId, eventId, rating, feedback });
    const response = yield fetch(`http://localhost:5053/api/eventattendance`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.updateEventAttendance = updateEventAttendance;
const getEventAttendanceId = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/eventattendance/getid/${userId}/${eventId}`);
    if (!response.ok) {
        return "";
    }
    return response.json();
});
exports.getEventAttendanceId = getEventAttendanceId;
const ReviewEvent = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/eventattendance`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });
    if (!response.ok) {
        return false;
    }
    else {
        return true;
    }
});
exports.ReviewEvent = ReviewEvent;
