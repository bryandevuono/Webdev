import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EventCalendar from "./components/EventCalendar";
import LoginScreen from "./components/LoginScreen";
import LeaderboardScreen from "./components/Leaderboard";
import { CheckIfLoggedIn, GetUserInfo } from "./api/Login";
import SignUpScreen from "./components/SignUpScreen";
import ProfilePage from "./components/ProfilePage";

function App(): JSX.Element {
  const [Authorized, setAuthorized] = useState(false);
  const CheckSession = async () => {
    const IsLoggedIn = await CheckIfLoggedIn();
    setAuthorized(IsLoggedIn);
  };

  useEffect(() => {
    CheckSession();
  }, []);

  return (
    <div className="Homepage" style={{ height: "95vh" }}>
      <BrowserRouter>
        <NavBar
          navItems={["Leaderboard", "Calendar", "EventCalendar"]}
          loggedIn={Authorized}
        />
        <Routes>
          <Route
            path="/"
            element={<LoginScreen setAuthorized={setAuthorized} />}
          ></Route>
          <Route path="/signup" element={<SignUpScreen />}></Route>
          <Route
            path="/Leaderboard"
            element={Authorized ? <LeaderboardScreen /> : <Navigate to="/" />}
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
