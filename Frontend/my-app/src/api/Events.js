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
exports.getEvent = exports.addEvent = exports.deleteEvent = exports.editEvent = exports.getAllEvents = void 0;
const AttendEvent_1 = require("./AttendEvent");
const Login_1 = require("./Login");
const getAllEvents = (checkIfAttending) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:5053/api/events/GetAllEvents', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = yield response.json();
    let Events = [];
    for (let i = 0; i < data.length; i++) {
        const EventToAdd = {
            kind: "event",
            start: new Date(data[i].startTime),
            end: new Date(data[i].endTime),
            title: data[i].title,
            eventId: data[i].id,
            description: data[i].description,
            location: data[i].location,
            date: data[i].date
        };
        if (checkIfAttending && (yield (0, AttendEvent_1.checkUserRegistration)(yield (0, Login_1.getUserId)(), data[i].id))) {
            Events = [...Events, EventToAdd];
        }
        else if (checkIfAttending && !(yield (0, AttendEvent_1.checkUserRegistration)(yield (0, Login_1.getUserId)(), data[i].id))) {
            continue;
        }
        else {
            Events = [...Events, EventToAdd];
        }
    }
    return Events;
});
exports.getAllEvents = getAllEvents;
const editEvent = (eventId, eventInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/events/EditEvent?Id=${eventId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventInfo)
    });
    console.log(response);
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.editEvent = editEvent;
const deleteEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/events/DeleteEvent/${eventId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        console.log("deleted event");
        return true;
    }
    else {
        return false;
    }
});
exports.deleteEvent = deleteEvent;
const addEvent = (eventInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:5053/api/events/AddEvent', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventInfo)
    });
    console.log(response);
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.addEvent = addEvent;
const getEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5053/api/events?Id=${eventId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = yield response.json();
    const Event = {
        kind: "event",
        start: new Date(data.startTime),
        end: new Date(data.endTime),
        title: data.title,
        eventId: data.id
    };
    return Event;
});
exports.getEvent = getEvent;
