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
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const EventAttendance_1 = require("../api/EventAttendance");
const Login_1 = require("../api/Login");
const EventReview = ({ currentEvent, setShowReview, setEventMenu, }) => {
    const [starRating, setStarRating] = (0, react_2.useState)("");
    const [review, setReview] = (0, react_2.useState)("");
    const handleExit = () => {
        setShowReview(false);
    };
    const handleReview = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const userId = yield (0, Login_1.getUserId)();
        const eventId = currentEvent.eventId;
        const reviewInfo = {
            userId: userId,
            eventId: eventId,
            Rating: starRating,
            FeedBack: review,
        };
        if ((yield (0, EventAttendance_1.ReviewEvent)(reviewInfo)) === false) {
            alert("Failed to submit review");
        }
        else {
            alert("Review submitted");
        }
        setShowReview(false);
    });
    return (<div className="event-details">
      <div className="event-details-top">
        <h1>{currentEvent.title}</h1>
        <button className="exit-button" onClick={handleExit}>
          X
        </button>
      </div>

      <div className="event-details-bottom">
        <div className="review">
          <h4>Give this event a review</h4>
          <form onSubmit={handleReview}>
            <label htmlFor="1">1⭐</label>
            <input type="radio" id="1" name="star-rating" value={1} onChange={(e) => setStarRating(e.target.value)}/>
            <label htmlFor="2">2⭐</label>
            <input type="radio" id="2" name="star-rating" value={2} onChange={(e) => setStarRating(e.target.value)}/>
            <label htmlFor="3">3⭐</label>
            <input type="radio" id="3" name="star-rating" value={3} onChange={(e) => setStarRating(e.target.value)}/>
            <label htmlFor="4">4⭐</label>
            <input type="radio" id="4" name="star-rating" value={4} onChange={(e) => setStarRating(e.target.value)}/>
            <label htmlFor="5">5⭐</label>
            <input type="radio" id="5" name="star-rating" value={5} onChange={(e) => setStarRating(e.target.value)}/>
            <br />
            <textarea rows={5} cols={50} placeholder="What did you think about this event?" onChange={(e) => setReview(e.target.value)}/>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>);
};
exports.default = EventReview;
