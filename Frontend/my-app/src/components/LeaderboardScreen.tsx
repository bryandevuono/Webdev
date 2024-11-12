import React from "react";
import Leaderboard from "./Leaderboard";
import "../Leaderboard.css";

const LeaderboardScreen = () : JSX.Element =>
{
    return(
        <div className="leaderboardPage">
            <Leaderboard/>
        </div>
    );
}

export default LeaderboardScreen;