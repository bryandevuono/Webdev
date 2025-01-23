"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Calendar;
const react_big_calendar_1 = require("react-big-calendar");
const moment_1 = __importDefault(require("moment"));
const localizer = (0, react_big_calendar_1.momentLocalizer)(moment_1.default);
function Calendar(props) {
    return <react_big_calendar_1.Calendar {...props} localizer={localizer}/>;
}
