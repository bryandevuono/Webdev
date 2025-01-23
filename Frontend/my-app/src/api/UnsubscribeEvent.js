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
exports.UnsubscribeEvent = void 0;
const Login_1 = require("./Login");
const UnsubscribeEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield (0, Login_1.getUserId)();
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = yield fetch(`http://localhost:5053/api/eventattendance/${userId}/${eventId}`, requestOptions);
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.UnsubscribeEvent = UnsubscribeEvent;
