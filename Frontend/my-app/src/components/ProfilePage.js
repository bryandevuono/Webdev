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
const Login_1 = require("../api/Login");
const Users_1 = require("../api/Users");
const react_router_dom_1 = require("react-router-dom");
const Ranking_1 = __importDefault(require("../api/Ranking"));
const Admin_1 = require("../api/Admin");
const ProfilePage = ({ setAuthorized, setIsAdmin }) => {
    const [userName, setUserName] = (0, react_1.useState)("");
    const [adminPageToggle, setAdminPageToggle] = (0, react_1.useState)(false);
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [Points, setPoints] = (0, react_1.useState)(0);
    const GetProfile = () => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = yield (0, Users_1.getUserData)(yield (0, Login_1.getUserId)());
        setUserName(userInfo.email);
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
    });
    const GetUserPoints = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pointsFromAPI = yield (0, Ranking_1.default)();
            setPoints(pointsFromAPI);
        }
        catch (error) {
            console.error("Failed to fetch points:", error);
        }
    });
    const LogOutAPI = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsAdmin(false);
        setAuthorized(false);
        (0, Login_1.logOut)();
    });
    const CheckIfUserIsAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
        setAdminPageToggle(yield (0, Admin_1.checkAdmin)());
    });
    (0, react_1.useEffect)(() => {
        GetProfile();
        GetUserPoints();
        CheckIfUserIsAdmin();
    }, []);
    return (<div className="flexbox">
      <div className="card">
        <h1>Hi, {adminPageToggle ? "Admin" : userName}!</h1>
        {!adminPageToggle && (<>
            <p>Name: {firstName}</p>
            <p>Lastname: {lastName}</p>
            <p>Username: {userName}</p>
            <p>Points: {Points}</p>
          </>)}
        <react_router_dom_1.Link to={"/"}>
          <button className="login-button" onClick={LogOutAPI}>
            Log out
          </button>
        </react_router_dom_1.Link>
      </div>
    </div>);
};
exports.default = ProfilePage;
