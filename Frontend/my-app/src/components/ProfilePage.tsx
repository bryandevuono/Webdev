
import {useEffect, useState} from "react";
import { getUserId, logOut } from "../api/Login";
import {getUserData} from "../api/Users";
import { Link } from "react-router-dom";
import GetPoints from "../api/Ranking";
import { checkAdmin } from "../api/Admin";

interface ProfilePageProps {
  setAuthorized: Function;
  setIsAdmin: Function;
}

const ProfilePage = ({ setAuthorized, setIsAdmin}: ProfilePageProps): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [adminPageToggle, setAdminPageToggle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Points, setPoints] = useState<number>(0);

  const GetProfile = async () => {
    const userInfo = await getUserData(await getUserId());
    setUserName(userInfo.email);
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
  };

  const GetUserPoints = async () => {
    try {
      const pointsFromAPI = await GetPoints();
      setPoints(pointsFromAPI);
    } catch (error) {
      console.error("Failed to fetch points:", error);
    }
  };

  const LogOutAPI = async () => {
    setIsAdmin(false);
    setAuthorized(false);
    logOut();
  };

  const CheckIfUserIsAdmin = async () => {
    setAdminPageToggle(await checkAdmin());
  };

  useEffect(() => {
    GetProfile();
    GetUserPoints();
    CheckIfUserIsAdmin();
  }, []);
  return (
    <div className="flexbox">
      <div className="card">
        <h1>Hi, {adminPageToggle ? "Admin" : userName}!</h1>
        {!adminPageToggle && (
          <>
            <p>Name: {firstName}</p>
            <p>Lastname: {lastName}</p>
            <p>Username: {userName}</p>
            <p>Points: {Points}</p>
          </>
        )}
        <Link to={"/"}>
          <button className="login-button" onClick={LogOutAPI}>
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
