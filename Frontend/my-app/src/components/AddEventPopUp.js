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
exports.default = AddEventPopUp;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Events_1 = require("../api/Events");
function AddEventPopUp({ setShowPopup, setSuccess, setFailed }) {
    const [title, setTitle] = (0, react_2.useState)("");
    const [description, setDescription] = (0, react_2.useState)("");
    const [location, setLocation] = (0, react_2.useState)("");
    const [startTime, setStartTime] = (0, react_2.useState)("");
    const [endTime, setEndTime] = (0, react_2.useState)("");
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const eventInfo = {
            title: title,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime
        };
        const Add = yield (0, Events_1.addEvent)(eventInfo);
        if (!Add) {
            setFailed(true);
            setShowPopup(false);
            return;
        }
        setSuccess(true);
        setShowPopup(false);
    });
    return (<div className="popup-overlay">
            <div className="popup">

                <h2>Add Event</h2>

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

                        <button type="submit" onClick={(event) => handleSubmit(event)}>Submit</button>
                        <button type="submit" onClick={() => setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>);
}
