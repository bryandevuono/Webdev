import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventCalendar from './components/EventCalendar';
import LeaderBoard from './components/Leaderboard';
import LoginScreen from './components/LoginScreen';

function Home () {
  return(
    <div className='Homepage' style={{height: "95vh"}}>
      <EventCalendar/>
      <LeaderBoard />
    </div>
  )
}

const Router = () : JSX.Element => 
{
  return(
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<LoginScreen/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;