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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("../App.css");
const react_router_dom_1 = require("react-router-dom");
const user_png_1 = __importDefault(require("../img/user.png"));
const Login_1 = require("../api/Login");
const NavBar = ({ navItems, loggedIn }) => {
    const [username, setUsername] = (0, react_1.useState)("");
    const getUserName = () => __awaiter(void 0, void 0, void 0, function* () {
        const userName = yield (0, Login_1.getUserInfo)();
        setUsername(userName);
    });
    (0, react_1.useEffect)(() => {
        getUserName();
    }, [loggedIn]);
    return (<header className="navbar">
      <h1 className="navbar-text">
        <react_router_dom_1.Link to={"/Calendar"}>Office Calendar</react_router_dom_1.Link>
      </h1>

      <div className="navbar-button-container">
        <ul className="navbar-buttons">
          {loggedIn
            ? navItems.map((item) => (<react_router_dom_1.Link key={item} to={"/" + item}>
                  <button key={item} className="navbar-button">
                    {item}
                  </button>
                </react_router_dom_1.Link>))
            : null}
        </ul>

        {loggedIn ? (<react_router_dom_1.Link to={"/profile"} className="profile-img">
            <img alt="" className="profile-img" src={user_png_1.default}></img>
          </react_router_dom_1.Link>) : null}

        {loggedIn ? <p className="profile-text">{username}</p> : null}
      </div>
    </header>);
};
exports.default = NavBar;
