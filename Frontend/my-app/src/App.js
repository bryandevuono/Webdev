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
const NavBar_1 = __importDefault(require("./components/NavBar"));
const react_router_dom_1 = require("react-router-dom");
const EventCalendar_1 = __importDefault(require("./components/EventCalendar"));
const LoginScreen_1 = __importDefault(require("./components/LoginScreen"));
const Leaderboard_1 = __importDefault(require("./components/Leaderboard"));
const Login_1 = require("./api/Login");
const SignUpScreen_1 = __importDefault(require("./components/SignUpScreen"));
const ProfilePage_1 = __importDefault(require("./components/ProfilePage"));
const AdminDashboard_1 = __importDefault(require("./components/AdminDashboard"));
const Admin_1 = require("./api/Admin");
const AdminLogin_1 = __importDefault(require("./components/AdminLogin"));
function App() {
    const [Authorized, setAuthorized] = (0, react_1.useState)(false);
    const [IsAdmin, setIsAdmin] = (0, react_1.useState)(false);
    const CheckSession = () => __awaiter(this, void 0, void 0, function* () {
        const IsLoggedIn = yield (0, Login_1.checkIfLoggedIn)();
        setAuthorized(IsLoggedIn);
    });
    const CheckIfUserIsAdmin = () => __awaiter(this, void 0, void 0, function* () {
        const UserIsAdmin = yield (0, Admin_1.checkAdmin)();
        setIsAdmin(UserIsAdmin);
    });
    (0, react_1.useEffect)(() => {
        CheckIfUserIsAdmin();
        CheckSession();
    }, []);
    return (<div className="Homepage" style={{ height: "95vh" }}>
      <react_router_dom_1.BrowserRouter>
        <NavBar_1.default navItems={IsAdmin
            ? ["Calendar", "Leaderboard", "Dashboard"]
            : ["Calendar", "Leaderboard"]} loggedIn={Authorized}/>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<LoginScreen_1.default setAuthorized={setAuthorized}/>}></react_router_dom_1.Route>
          <react_router_dom_1.Route path="/signup" element={<SignUpScreen_1.default />}></react_router_dom_1.Route>
          <react_router_dom_1.Route path="/leaderboard" element={Authorized ? <Leaderboard_1.default /> : <react_router_dom_1.Navigate to="/"/>}></react_router_dom_1.Route>
          <react_router_dom_1.Route path="/calendar" element={Authorized ? <EventCalendar_1.default /> : <react_router_dom_1.Navigate to="/"/>}></react_router_dom_1.Route>
          <react_router_dom_1.Route path="/profile" element={Authorized ? (<ProfilePage_1.default setAuthorized={setAuthorized} setIsAdmin={setIsAdmin}/>) : (<react_router_dom_1.Navigate to="/"/>)}></react_router_dom_1.Route>
          <react_router_dom_1.Route path="/dashboard" element={IsAdmin && Authorized ? <AdminDashboard_1.default /> : <react_router_dom_1.Navigate to="/"/>}></react_router_dom_1.Route>
          <react_router_dom_1.Route path="/adminlogin" element={<AdminLogin_1.default setAuthorized={setAuthorized} setIsAdmin={setIsAdmin}/>}></react_router_dom_1.Route>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </div>);
}
exports.default = App;
