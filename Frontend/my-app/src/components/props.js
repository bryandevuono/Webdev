"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Props = ({ number, message }) => {
    const [num, setNum] = (react_1.useState);
    const n = number.toString;
    const handleUpdate = () => { };
    return (<div>
      <p>{message}</p>
      <p>{n()}</p>
      <button />
    </div>);
};
exports.default = Props;
