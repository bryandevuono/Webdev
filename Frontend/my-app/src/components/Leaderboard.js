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
require("../Leaderboard.css");
const Login_1 = require("../api/Login");
function Leaderboard() {
    const [leaderboard, setLeaderboard] = (0, react_1.useState)([]);
    const [currentUser, setCurrentUser] = (0, react_1.useState)("");
    const [currentUserIndex, setCurrentUserIndex] = (0, react_1.useState)(-2);
    (0, react_1.useEffect)(() => {
        getLeaderboardData();
        GetIndexOfCurrentUser();
    }, []);
    const GetCurrentUsername = () => __awaiter(this, void 0, void 0, function* () {
        const username = yield (0, Login_1.getUserInfo)();
        setCurrentUser(username);
    });
    const GetIndexOfCurrentUser = () => {
        const index = leaderboard.findIndex((user) => user.email === currentUser);
        setCurrentUserIndex(index);
    };
    const getLeaderboardData = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5053/api/ranking");
            const data = yield response.json();
            setLeaderboard(data);
            yield GetCurrentUsername();
        }
        catch (error) {
            console.error(error);
        }
    });
    // useEffect(() => {
    //   if (currentUser && leaderboard.length > 0) {
    //     GetIndexOfCurrentUser();
    //   }
    // }, [currentUser, leaderboard]);
    return (<div className="leaderboard">
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
          {leaderboard.map((user, index) => (<tr key={index} style={{
                backgroundColor: index === currentUserIndex ? "#0156B31d" : "#f3f3f3",
            }}>
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
            </tr>))}
        </tbody>
      </table>
    </div>);
}
exports.default = Leaderboard;
