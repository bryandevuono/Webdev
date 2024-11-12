import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventCalendar from './components/EventCalendar';
import LeaderBoard from './components/Leaderboard';

function Home () {
  let navItems = ["Home", "Leaderbord", "Login", "Sign Up"];
  return(
    <div className='Homepage' style={{height: "95vh"}}>
      <NavBar 
      items={navItems}/>
      <EventCalendar/>
      <LeaderBoard />
    </div>
  )
}

const Router = () : JSX.Element => 
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;