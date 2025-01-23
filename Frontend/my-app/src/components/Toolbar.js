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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Login_1 = require("../api/Login");
const OfficeAttendace_1 = require("../api/OfficeAttendace");
require("react-big-calendar/lib/css/react-big-calendar.css");
require("../Toolbar.css");
const react_router_dom_1 = require("react-router-dom");
const CustomToolbar = (props) => {
    const Navigate = (0, react_router_dom_1.useNavigate)();
    const [Id, setId] = (0, react_1.useState)("");
    const [showPopup, setShowPopup] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        type: "office attendance",
        Start: "",
        End: "",
        UserId: "",
    });
    (0, react_1.useEffect)(() => {
        const GetId = () => __awaiter(void 0, void 0, void 0, function* () {
            const UserId = yield (0, Login_1.getUserId)();
            setId(UserId);
        });
        GetId();
    }, []);
    (0, react_1.useEffect)(() => {
        if (Id) {
            setFormData((prev) => (Object.assign(Object.assign({}, prev), { UserId: Id })));
        }
    }, [Id]);
    const togglePopup = () => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { Start: "", End: "", UserId: Id })));
        setShowPopup((prev) => !prev);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield (0, OfficeAttendace_1.PostOfficeAttendace)(formData, Navigate);
        props.refreshOfficeAttendance();
        setShowPopup(false);
    });
    return (<div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => props.onNavigate("PREV")}>Back</button>
        <button onClick={() => props.onNavigate("NEXT")}>Next</button>
        <button onClick={togglePopup}>Add Office Attendance</button>
        {showPopup && (<div className="popup-overlay">
            <div className="popup-form">
              <h2>Add an office attendance to the calendar</h2>
              <form onSubmit={handleSubmit}>
                <div className="popup-date">
                  <label>
                    Start Time:
                    <input type="datetime-local" name="Start" value={formData.Start} onChange={handleInputChange} required/>
                  </label>
                </div>
                <div className="popup-date">
                  <label>
                    End Time:
                    <input type="datetime-local" name="End" value={formData.End} onChange={handleInputChange} required/>
                  </label>
                </div>

                <br />
                
                <button type="submit">Submit</button>
                <button type="button" onClick={togglePopup}>Cancel</button>
              </form>
            </div>
          </div>)}
      </span>
      <span className="rbc-toolbar-label">{props.label}</span>
      <span className="rbc-btn-group">
        <button onClick={() => props.onView("month")}>Month</button>
        <button onClick={() => props.onView("week")}>Week</button>
        <button onClick={() => props.onView("day")}>Day</button>
        <button onClick={() => props.onView("agenda")}>Events</button>
      </span>
    </div>);
};
exports.default = CustomToolbar;
