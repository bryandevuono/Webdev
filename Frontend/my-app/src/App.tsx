import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import EventCalendar from "./components/EventCalendar";
import LoginScreen from "./components/LoginScreen";
import Leaderboard from "./components/Leaderboard";
import { checkIfLoggedIn, getUserInfo } from "./api/Login";
import SignUpScreen from "./components/SignUpScreen";
import ProfilePage from "./components/ProfilePage";
import AdminDashboard from "./components/AdminDashboard";
import { checkAdmin } from "./api/Admin";
import AdminLogin from "./components/AdminLogin";

function App(): JSX.Element {
  const [Authorized, setAuthorized] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);

  const CheckSession = async () => {
    const IsLoggedIn = await checkIfLoggedIn();
    setAuthorized(IsLoggedIn);
  };

  const CheckIfUserIsAdmin = async () => {
    const UserIsAdmin = await checkAdmin();
    setIsAdmin(UserIsAdmin);
  };

  useEffect(() => {
    CheckSession();
    CheckIfUserIsAdmin();
  }, []);

  return (
    <div className="Homepage" style={{ height: "95vh" }}>
      <BrowserRouter>
        <NavBar
          navItems={
            IsAdmin
              ? ["Calendar", "Leaderboard", "Dashboard"]
              : ["Calendar", "Leaderboard"]
          }
          loggedIn={Authorized}
        />
        <Routes>
          <Route
            path="/"
            element={<LoginScreen setAuthorized={setAuthorized} />}
          ></Route>
          <Route path="/signup" element={<SignUpScreen />}></Route>
          <Route
            path="/leaderboard"
            element={Authorized ? <Leaderboard /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/calendar"
            element={Authorized ? <EventCalendar /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/profile"
            element={
              Authorized ? (
                <ProfilePage setAuthorized={setAuthorized} />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              IsAdmin && Authorized ? <AdminDashboard /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/adminlogin"
            element={<AdminLogin setAuthorized={setAuthorized} setIsAdmin={setIsAdmin}/>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
