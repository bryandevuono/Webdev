"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../App.css");
const Legend = () => {
    return (<div className="legend">
            <p>Legend:</p>
            <br />
            <div className="legend-item-1">
                <div className="legend-color" style={{ backgroundColor: "blue" }}></div>
                <p>Event</p>
            </div>
            <div className="legend-item-2">
                <div className="legend-color" style={{ backgroundColor: "grey" }}></div>
                <p>Office attendance</p>
            </div>
        </div>);
};
exports.default = Legend;
