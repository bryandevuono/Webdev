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
exports.postSignUp = void 0;
const postSignUp = (UserInfoInput, navigate) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };
    const response = yield fetch('http://localhost:5053/api/user/adduser', requestOptions);
    if (response.ok) {
        navigate("/calendar");
        return true;
    }
    else {
        return false;
    }
});
exports.postSignUp = postSignUp;
