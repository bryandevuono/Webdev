"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const react_1 = __importStar(require("react"));
const AttendEvent_1 = require("../api/AttendEvent");
const UnsubscribeEvent_1 = require("../api/UnsubscribeEvent");
const Login_1 = require("../api/Login");
const EventReview_1 = __importDefault(require("./EventReview"));
const EventAttendanceMenu = ({ setShowEventAttendance, currentEvent, setAttendanceSuccess, setAttendanceError, setShowUnsubscribeMessage, setShowUnsubscribeError, getEvents, }) => {
    const [isAttending, setIsAttending] = (0, react_1.useState)(false);
    const [showReview, setShowReview] = (0, react_1.useState)(false);
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (currentEvent.kind === "event") {
            yield (0, AttendEvent_1.AttendEvent)(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
            setShowEventAttendance(false);
            getEvents();
        }
        else {
            setAttendanceError(true);
        }
    });
    const handleReviewClick = (event) => {
        event.preventDefault();
        setShowReview(true);
    };
    const handleUnsubscribe = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const response = yield (0, UnsubscribeEvent_1.UnsubscribeEvent)(currentEvent.eventId);
        if (response) {
            setShowUnsubscribeMessage(true);
            setShowEventAttendance(false);
            getEvents();
        }
        else {
            setShowUnsubscribeError(true);
            setShowEventAttendance(false);
        }
    });
    const checkIfAttending = () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = yield (0, Login_1.getUserId)();
        const response = yield (0, AttendEvent_1.checkUserRegistration)(userId, currentEvent.eventId);
        setIsAttending(response);
    });
    (0, react_1.useEffect)(() => {
        checkIfAttending();
    }, [currentEvent]);
    return (<div className="popup-overlay">
      <form className="popup-form-event">
        <h1>{currentEvent.title}</h1>
        <p>Description: {currentEvent.description}</p>
        <p>Location: {currentEvent.location}</p>
        <p>Date: {String(currentEvent.start)}</p>
        <p>Choose an option:</p>

        {isAttending ? (<>
            <button onClick={handleReviewClick}>Leave a review</button>
            <button onClick={handleUnsubscribe}>Unsubscribe</button>
          </>) : (<button onClick={handleSubmit}>Attend this Event</button>)}

        <button onClick={() => setShowEventAttendance(false)}>Cancel</button>
      </form>

      {showReview ? (<EventReview_1.default currentEvent={currentEvent} setShowReview={setShowReview} setEventMenu={setShowEventAttendance}/>) : null}
    </div>);
};
exports.default = EventAttendanceMenu;
