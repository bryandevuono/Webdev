"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const AttendEvent_1 = require("../api/AttendEvent");
const EventReview_1 = __importDefault(require("./EventReview"));
const EventAttendance = ({ setShowEventAttendance, currentEvent, setAttendanceSuccess, setAttendanceError, }) => {
    const [showReviewPopup, setShowReviewPopup] = (0, react_2.useState)(false);
    const handleSubmit = (event) => {
        if (currentEvent.kind == "event") {
            (0, AttendEvent_1.AttendEvent)(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
            setShowEventAttendance(false);
        }
        else {
            setAttendanceError(true);
        }
    };
    return (<div className="popup-overlay">
      {showReviewPopup && (<EventReview_1.default currentEvent={currentEvent} setShowReview={setShowReviewPopup} setEventMenu={setShowEventAttendance}/>)}
      {!showReviewPopup && (<form className="popup-form-event">
          <h1>{currentEvent.title}</h1>
          <p>Description: {currentEvent.description}</p>
          <p>Location: {currentEvent.location}</p>
          <p>Date: {String(currentEvent.start)}</p>
          <p>Choose an option:</p>
          <button onClick={() => setShowReviewPopup(true)}>
            Leave a review
          </button>
          <button onClick={(event) => handleSubmit(event)}>
            Attend this Event
          </button>
          <button>Unsubscribe</button>
          <button onClick={() => setShowEventAttendance(false)}>Cancel</button>
        </form>)}
    </div>);
};
exports.default = EventAttendance;
