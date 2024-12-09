import { useEffect, useState } from "react";
import { GetUserInfo, Logout } from "../api/Login";
import { Link } from "react-router-dom";
import GetPoints from "../api/Ranking";

interface ProfilePageProps {
  setAuthorized: Function;
}

const ProfilePage = ({ setAuthorized }: ProfilePageProps): JSX.Element => {
  const [UserName, setUserName] = useState("");
  const [Points, setPoints] = useState<number>(0);

  const GetUserName = async () => {
    try {
      const UsernameFromAPI = await GetUserInfo();
      setUserName(UsernameFromAPI);
    } catch (error) {
      console.error("Failed to fetch username:", error);
    }
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
    setAuthorized(false);
    Logout();
  };

  useEffect(() => {
    GetUserName();
    GetUserPoints();
  }, []);

  return (
    <div className="profile-page">
      <p className="">E-mail/Username: {UserName}</p>
      <p>Points: {Points}</p>
      <Link to={"/"}>
        <button className="login-button" onClick={() => LogOutAPI()}>
          Log out
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
