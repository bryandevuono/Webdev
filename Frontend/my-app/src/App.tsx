import React, { useEffect, useState} from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventCalendar from './components/EventCalendar';
import LoginScreen from './components/LoginScreen';
import LeaderboardScreen from './components/Leaderboard';
import { CheckIfLoggedIn } from './api/Login';


function App (): JSX.Element {
  const [Authorized, setAuthorized] = useState(false);
  const CheckSession = async () => {
    const isLoggedIn = await CheckIfLoggedIn();
    setAuthorized(isLoggedIn);
  }
  useEffect(() => {
    CheckSession();
  }, []);

  return(
    <div className='Homepage' style={{height: "95vh"}}>
      <BrowserRouter>
        <NavBar navItems={['Leaderboard', 'calendar']} LoggedIn={Authorized}/>
        <Routes>
          <Route path="/" element={Authorized ? <LoginScreen />: <LoginScreen/>} />
          <Route path='/login' element={<LoginScreen/>}></Route>
          <Route path='/Leaderboard' element={Authorized ? <LeaderboardScreen/>: <LoginScreen/>}></Route>
          <Route path='/calendar' element={Authorized ? <EventCalendar/> : <LoginScreen/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;