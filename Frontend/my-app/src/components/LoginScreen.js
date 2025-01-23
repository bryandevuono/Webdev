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
const react_router_dom_1 = require("react-router-dom");
const LoginScreen = ({ setAuthorized }) => {
    const Navigate = (0, react_router_dom_1.useNavigate)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(false);
    const [duplicateLogin, setDuplicateLogin] = (0, react_1.useState)(false);
    const [loginCheck, setLoginCheck] = (0, react_1.useState)(false);
    const handleLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = { email: email, password: password };
        const checkLogin = yield (0, Login_1.postLogin)(userInfo, Navigate);
        if (checkLogin) {
            setLoginCheck(true);
            setAuthorized(true);
            setTimeout(() => {
                Navigate("/calendar");
            }, 1200);
        }
        else {
            setErrorMessage(true);
        }
    });
    const handleLoginClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const loginCheck = yield (0, Login_1.checkIfLoggedIn)();
        if (loginCheck) {
            setDuplicateLogin(true);
            return;
        }
        handleLogin(email, password);
    });
    return (<div className="flexbox">
      <div className="login-box">
        
        <label>
          Username:{" "}
          <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
        </label>

        <br />

        <label>
          Password:{" "}
          <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
        </label>
        <br />

        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>

        <react_router_dom_1.Link className="signup-button" to={"/signup"}>
          <p>Sign up</p>
        </react_router_dom_1.Link>
        
        <react_router_dom_1.Link className="signup-button" to={"/adminlogin"}>
          <p>Login as an admin</p>
        </react_router_dom_1.Link>

        {loginCheck ? (<p className="success-text">Logged in successfully!</p>) : null}
        {errorMessage ? (<p className="error-text">Wrong username/password!</p>) : null}
        {duplicateLogin ? (<p className="error-text">Logged in already</p>) : null}
      </div>
    </div>);
};
exports.default = LoginScreen;
