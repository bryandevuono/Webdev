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
const OfficeAttendace_1 = require("../api/OfficeAttendace");
const OfficeAttendancePopup = ({ currentEvent, setShowPopup, }) => {
    const handleExit = () => {
        setShowPopup(false);
    };
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(currentEvent);
        if ((yield (0, OfficeAttendace_1.DeleteOfficeAttendance)("874b398d-9788-4193-9cfb-4e71fd7a627e")) ===
            true) {
            alert("Office Attendance Deleted");
        }
        else {
            alert("Failed to delete Office Attendance");
        }
        setShowPopup(false);
    });
    return (<div className="office-attendance-popup">
      <div className="office-attendance-popup-top">
        <h1>Office Attendance</h1>
        <button onClick={handleExit}>X</button>
      </div>
      <div className="office-attendance-popup-bottom">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>);
};
exports.default = OfficeAttendancePopup;
