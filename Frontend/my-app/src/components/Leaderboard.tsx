import { useEffect, useState } from "react";
import "../Leaderboard.css";
import {getUserInfo } from "../api/Login";

interface User {
  email: string;
  firstname: string;
  lastname: string;
  points: number;
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(-2);

  useEffect(() => {
    getLeaderboardData();
  }, []);

  const GetCurrentUsername = async () => {
    const username = await getUserInfo();
    setCurrentUser(username);
  };

  const GetIndexOfCurrentUser = () => {
    const index = leaderboard.findIndex((user) => user.email === currentUser);
    setCurrentUserIndex(index);
  };

  const getLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:5053/api/ranking");
      const data = await response.json();
      setLeaderboard(data);
      await GetCurrentUsername();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser && leaderboard.length > 0) {
      GetIndexOfCurrentUser();
    }
  }, [currentUser, leaderboard]);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user: User, index: number) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  index === currentUserIndex ? "#0156B31d" : "#f3f3f3",
              }}
            >
              <td>
                {index === 0
                  ? `🥇`
                  : index === 1
                  ? `🥈`
                  : index === 2
                  ? `🥉`
                  : index + 1}
              </td>
              <td>{user.firstname + " " + user.lastname}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
