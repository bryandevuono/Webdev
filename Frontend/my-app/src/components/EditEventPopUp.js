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
const react_1 = require("react");
const Events_1 = require("../api/Events");
const EditEventPopUp = ({ currentEvent, setShowPopup, setSuccess, setConfirmDelete, setFailed }) => {
    const [title, setTitle] = (0, react_1.useState)("");
    const [description, setDescription] = (0, react_1.useState)("");
    const [location, setLocation] = (0, react_1.useState)("");
    const [startTime, setStartTime] = (0, react_1.useState)("");
    const [endTime, setEndTime] = (0, react_1.useState)("");
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const updatedEvent = {
            title: title,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime
        };
        const Edit = yield (0, Events_1.editEvent)(currentEvent.eventId, updatedEvent);
        if (!Edit) {
            setFailed(true);
            setShowPopup(false);
            return;
        }
        setShowPopup(false);
        setSuccess(true);
    });
    const handleDeleteClick = () => {
        setConfirmDelete(true);
        setShowPopup(false);
    };
    return (<div className="popup-overlay">
            <div className="popup">

                <h2>Edit the Event</h2>

                <div>
                    <form onSubmit={handleSubmit} className="popup-form">
                        <label>
                            Title: 
                            <input className="input-style" onChange={(e) => setTitle(e.target.value)}/>
                        </label>

                        <label>
                            Description:
                            <input className="input-style" onChange={(e) => setDescription(e.target.value)}/>
                        </label>

                        <label>
                            Location:
                            <input className="input-style" onChange={(e) => setLocation(e.target.value)}/>
                        </label>

                        <label className="popup-date">
                            Start Time:
                            <input type="datetime-local" name="start" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                        </label>

                        <label className="popup-date">
                            End Time:
                            <input type="datetime-local" name="end" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                        </label>

                        <br />

                        <button type="submit">Submit</button>
                        <button onClick={() => handleDeleteClick()}>Delete Event</button>
                        <button type="submit" onClick={() => setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>);
};
exports.default = EditEventPopUp;
