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
exports.postLoginAdmin = exports.checkAdmin = void 0;
const checkAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = yield response.json();
    if (data.role == "admin") {
        return true;
    }
    else {
        return false;
    }
});
exports.checkAdmin = checkAdmin;
const postLoginAdmin = (adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:5053/api/login/login/admin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminInfo)
    });
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.postLoginAdmin = postLoginAdmin;
