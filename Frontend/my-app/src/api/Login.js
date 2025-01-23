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
exports.logOut = exports.getUserId = exports.getUserInfo = exports.checkIfLoggedIn = exports.postLogin = void 0;
const postLogin = (UserInfoInput, navigate) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserInfoInput),
    };
    const response = yield fetch("http://localhost:5053/api/login/login/user", requestOptions);
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.postLogin = postLogin;
const checkIfLoggedIn = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:5053/api/login/session", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = yield response.json();
    const isLoggedIn = data.isLoggedIn;
    if (isLoggedIn) {
        return true;
    }
    return false;
});
exports.checkIfLoggedIn = checkIfLoggedIn;
const getUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:5053/api/login/session", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = yield response.json();
    return data.username;
});
exports.getUserInfo = getUserInfo;
const getUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:5053/api/login/session", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = yield response.json();
    return data.id;
});
exports.getUserId = getUserId;
const logOut = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:5053/api/login/logout", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
});
exports.logOut = logOut;
