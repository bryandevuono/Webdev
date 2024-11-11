import React from 'react';
import NavBar from './components/NavBar';
import EventCalendar from './components/EventCalendar';

function App () {
  let navItems = ["Home", "Leaderbord", "Login", "Sign Up"];
  return(
    <div className='Homepage' style={{height: "95vh"}}>
      <NavBar 
      items={navItems}/>
      <EventCalendar/>
    </div>
  )
}

export default App;