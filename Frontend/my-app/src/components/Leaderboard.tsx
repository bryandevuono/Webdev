import { useEffect, useState } from 'react';
import './Leaderboard.css';

interface User {
    firstname: string;
    lastname: string;
    points: number;
}

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        getLeaderboardData();
    })

    const getLeaderboardData = async () => {
        try {
            const response = await fetch("http://localhost:5053/api/ranking");
            const data = await response.json();
            setLeaderboard(data);
        } catch (error) {
            console.error(error);
        }
    };

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
                    {leaderboard.map((user:User, index:number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.firstname + " " + user.lastname}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;