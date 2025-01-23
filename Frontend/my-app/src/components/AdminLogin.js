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
const Admin_1 = require("../api/Admin");
const AdminLogin = (props) => {
    const Navigate = (0, react_router_dom_1.useNavigate)();
    const [userName, setUsername] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(false);
    const [duplicateLogin, setDuplicateLogin] = (0, react_1.useState)(false);
    const [loginCheck, setLoginCheck] = (0, react_1.useState)(false);
    const handleAdminLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        const AdminInfo = {
            username: userName,
            email: email,
            password: password,
        };
        const checkAdminLogin = yield (0, Admin_1.postLoginAdmin)(AdminInfo);
        if (checkAdminLogin) {
            setLoginCheck(true);
            props.setAuthorized(true);
            props.setIsAdmin(true);
            //   setDuplicateLogin(true);
            setTimeout(() => {
                Navigate("/dashboard");
            }, 1200);
        }
        else {
            setErrorMessage(true);
        }
    });
    return (<div className="flexbox">
      <div>
        <label>
          Username:
          <input className="input-style" onChange={(event) => setUsername(event.target.value)}/>
        </label>

        <br />

        <label>
          E-mail :
          <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
        </label>

        <br />

        <label>
          Password:
          <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
        </label>

        <br />
        
        <button className="admin-button" onClick={handleAdminLogin}>
          {" "}
          Login
        </button>

        {loginCheck ? (<p className="success-text">Logged in successfully!</p>) : null}
        {errorMessage ? (<p className="error-text">Wrong userinfo</p>) : null}
        {duplicateLogin ? (<p className="error-text">Logged in already</p>) : null}
      </div>
    </div>);
};
exports.default = AdminLogin;
