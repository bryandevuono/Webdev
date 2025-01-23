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
exports.default = EventCalendar;
const react_1 = require("react");
const Calendar_1 = __importDefault(require("./Calendar"));
const Toolbar_1 = __importDefault(require("./Toolbar"));
const Legend_1 = __importDefault(require("./Legend"));
const Events_1 = require("../api/Events");
const OfficeAttendace_1 = require("../api/OfficeAttendace");
const EventAttendanceMenu_1 = __importDefault(require("./EventAttendanceMenu"));
const OfficeAttendancePopup_1 = __importDefault(require("./OfficeAttendancePopup"));
function EventCalendar() {
    const [events, setEvents] = (0, react_1.useState)();
    const [attendingEvents, setAttendingEvents] = (0, react_1.useState)();
    const [officeAttendance, setOfficeAttendance] = (0, react_1.useState)();
    const [showEventAttendance, setShowEventAttendance] = (0, react_1.useState)(false);
    const [currentEvent, setCurrentEvent] = (0, react_1.useState)(undefined);
    const [currentView, setCurrentView] = (0, react_1.useState)("month");
    const [attendanceSuccess, setAttendanceSuccess] = (0, react_1.useState)(false);
    const [attendanceError, setAttendanceError] = (0, react_1.useState)(false);
    const [showUnsubscribeMessage, setShowUnsubscribeMessage] = (0, react_1.useState)(false);
    const [showUnsubscribeError, setShowUnsubscribeError] = (0, react_1.useState)(false);
    const [showOfficeAttendancePopup, setShowOfficeAttendancePopup] = (0, react_1.useState)(false);
    const getEvents = () => __awaiter(this, void 0, void 0, function* () {
        const AllEvents = yield (0, Events_1.getAllEvents)(false);
        setEvents(AllEvents);
    });
    const getAttendingEvents = () => __awaiter(this, void 0, void 0, function* () {
        const AllEvents = yield (0, Events_1.getAllEvents)(true);
        setAttendingEvents(AllEvents);
    });
    const getOfficeAttendance = () => __awaiter(this, void 0, void 0, function* () {
        const AllOfficeAttendace = yield (0, OfficeAttendace_1.GetAllOfficeAttendace)();
        const convertedOfficeAttendace = yield Promise.all(AllOfficeAttendace.map((attendance) => __awaiter(this, void 0, void 0, function* () {
            return ({
                kind: "office attendance",
                start: new Date(attendance.Start),
                end: new Date(attendance.End),
                title: yield (0, OfficeAttendace_1.GetUserName)(attendance.UserId),
            });
        })));
        setOfficeAttendance(convertedOfficeAttendace);
    });
    const handleEventClick = (event) => {
        if (event.kind == "event") {
            setCurrentEvent(event);
            setShowEventAttendance(true);
        }
        else if (event.kind == "office attendance") {
            console.log(event.title);
            setCurrentEvent(event);
            setShowOfficeAttendancePopup(true);
        }
    };
    (0, react_1.useEffect)(() => {
        getEvents();
        getOfficeAttendance();
        // getAttendingEvents();
    }, []);
    const makeEventCategories = (event) => {
        let backgroundColor = "";
        if (event.kind == "event" && currentView == "agenda") {
            backgroundColor = "white";
        }
        if (event.kind == "office attendance") {
            backgroundColor = "grey";
        }
        return { style: { backgroundColor } };
    };
    return (<>
      {currentView == "agenda" ? (<div className="event-overview">
          <Calendar_1.default events={(events || []).filter((event) => event.start >= new Date())} components={{
                toolbar: (props) => (<Toolbar_1.default {...props} refreshOfficeAttendance={getOfficeAttendance}/>),
            }} onSelectEvent={(event) => handleEventClick(event)} eventPropGetter={(event) => makeEventCategories(event)} defaultView="agenda" onView={(view) => setCurrentView(view)}/>
        </div>) : (<Calendar_1.default events={[
                ...(attendingEvents || []),
                ...(officeAttendance || []),
            ].filter((event) => event.start >= new Date())} components={{
                toolbar: (props) => (<Toolbar_1.default {...props} refreshOfficeAttendance={getOfficeAttendance}/>),
            }} onSelectEvent={(event) => handleEventClick(event)} eventPropGetter={(event) => makeEventCategories(event)} onView={(view) => setCurrentView(view)}/>)}

      {currentView != "agenda" ? <Legend_1.default /> : null}

      {showEventAttendance ? (<EventAttendanceMenu_1.default setShowEventAttendance={setShowEventAttendance} currentEvent={currentEvent} setAttendanceSuccess={setAttendanceSuccess} setAttendanceError={setAttendanceError} setShowUnsubscribeMessage={setShowUnsubscribeMessage} setShowUnsubscribeError={setShowUnsubscribeError} getEvents={getAttendingEvents}/>) : null}

      {showOfficeAttendancePopup ? (<OfficeAttendancePopup_1.default currentEvent={currentEvent} setShowPopup={setShowOfficeAttendancePopup}/>) : null}

      {attendanceSuccess ? (<div className="popup-overlay">
          <div className="popup-form">
            <p>You are now attending this event!</p>
            <button onClick={() => setAttendanceSuccess(false)}>Close</button>
          </div>
        </div>) : null}

      {attendanceError ? (<div className="popup-overlay">
          <div className="popup-form">
            <p>There was an error attending this event!</p>
            <p>Check if you already registered for this event.</p>
            <button onClick={() => setAttendanceError(false)}>Close</button>
          </div>
        </div>) : null}

      {showUnsubscribeMessage ? (<div className="popup-overlay">
          <div className="popup-form">
            <p>You have unsubscribed from this event</p>
            <button onClick={() => setShowUnsubscribeMessage(false)}>
              Close
            </button>
          </div>
        </div>) : null}

      {showUnsubscribeError ? (<div className="popup-overlay">
          <div className="popup-form">
            <p>There was an error unsubscribing from this event</p>
            <button onClick={() => setShowUnsubscribeError(false)}>
              Close
            </button>
          </div>
        </div>) : null}
    </>);
}
