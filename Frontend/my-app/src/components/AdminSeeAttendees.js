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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Events_1 = require("../api/Events");
const EventAttendance_1 = require("../api/EventAttendance");
const Users_1 = require("../api/Users");
const Calendar_1 = __importDefault(require("./Calendar"));
const UserListPopup_1 = __importDefault(require("./UserListPopup"));
const AdminSeeAttendees = () => {
    const [events, setEvents] = (0, react_1.useState)(undefined);
    const [currentEvent, setCurrentEvent] = (0, react_1.useState)(undefined);
    const [attendees, setAttendees] = (0, react_1.useState)([]);
    const [userNames, setUserNames] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)(null);
    const [isPopupOpen, setIsPopupOpen] = (0, react_1.useState)(false);
    const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allEvents = yield (0, Events_1.getAllEvents)(false);
            if (!Array.isArray(allEvents)) {
                throw new Error('Invalid event data');
            }
            setEvents(allEvents);
        }
        catch (err) {
            console.error("Error fetching events:", err);
            setError("Failed to fetch events. Please try again later.");
        }
    });
    const handleEventClick = (event) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventTitle = typeof event.title === 'string' ? event.title : '';
            const eventAttendees = yield (0, EventAttendance_1.getEventAttendees)(eventTitle);
            if (!Array.isArray(eventAttendees)) {
                throw new Error('Invalid attendees data');
            }
            const userIds = eventAttendees.map((attendee) => attendee.userId);
            setAttendees(userIds);
            setCurrentEvent(Object.assign(Object.assign({}, event), { kind: "event", eventId: event.eventId }));
            const userDetails = yield Promise.all(userIds.map((userId) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const userInfo = yield (0, Users_1.getUserData)(userId);
                    console.log(`User data for ID ${userId}:`, userInfo);
                    return `${userInfo.firstName} ${userInfo.lastName}`;
                }
                catch (userError) {
                    console.error(`Error fetching user data for ID ${userId}:`, userError);
                    return "Unknown User";
                }
            })));
            setUserNames(userDetails);
            setIsPopupOpen(true);
        }
        catch (err) {
            console.error("Error fetching attendees or user data:", err);
            setError("Failed to fetch attendees. Please try again later.");
        }
    });
    (0, react_1.useEffect)(() => {
        getEvents();
    }, []);
    return (<div className='admin-dashboard'>
            <h1 className='admin-dashboard-text'>Click on one of the event titles to see the attendees:</h1>
            {error && <div className="error-msg"><i className="fa fa-exclamation-triangle"></i>{error}</div>}
            
            <Calendar_1.default events={events} className="admin-events" defaultView="agenda" onSelectEvent={(event) => handleEventClick(event)} toolbar={false} selectable={true}/>

            <UserListPopup_1.default isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} users={userNames} eventTitle={typeof (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.title) === 'string' ? currentEvent.title : ''}/>
        </div>);
};
exports.default = AdminSeeAttendees;
