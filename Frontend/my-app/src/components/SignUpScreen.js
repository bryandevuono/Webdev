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
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Signup_1 = require("../api/Signup");
const SignUpScreen = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(false);
    const handleSignUp = (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = {
            FirstName: firstName,
            Lastname: lastName,
            Email: email,
            Password: password
        };
        if (firstName === "" || lastName === "" || email === "" || password === "") {
            setErrorMessage(true);
            return;
        }
        const checkSignUp = yield (0, Signup_1.postSignUp)(userInfo, navigate);
        !checkSignUp ? setErrorMessage(true) : setErrorMessage(errorMessage);
    });
    return (<div className="flexbox">
            <div className="login-box">
                <label>
                    Firstname:
                    <input className="input-style" onChange={(event) => setFirstName(event.target.value)}/>
                </label>

                <br />

                <label>
                    Lastname:
                    <input className="input-style" onChange={(event) => setLastName(event.target.value)}/>
                </label>

                <br />

                <label>
                    Username:
                    <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
                </label>

                <br />

                <label>
                    Password:
                    <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
                </label>

                <br />
                
                <button className="login-button" onClick={() => handleSignUp(firstName, lastName, email, password)}>Sign up</button>
                
                {errorMessage ? <p className="error-text">Missing required fields!</p> : null}
            </div>
        </div>);
};
exports.default = SignUpScreen;
