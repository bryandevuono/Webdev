import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventCalendar from './components/EventCalendar';
import LoginScreen from './components/LoginScreen';
import LeaderboardScreen from './components/Leaderboard';

function Home () {
  return(
    <div className='Homepage' style={{height: "95vh"}}>
      <EventCalendar/>
    </div>
  )
}

const Router = () : JSX.Element => 
{
  return(
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen/>}></Route>
        <Route path='/Leaderboard' element={<LeaderboardScreen/>}></Route>
        <Route path='/calendar' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;