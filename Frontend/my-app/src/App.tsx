import React from 'react';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';

function App () {
  let navItems = ["Home", "Leaderbord", "Login", "Sign Up"];
  return(
    <div className='Homepage' style={{height: "95vh"}}>
      <NavBar 
      items={navItems}/>
      <Calendar/>
    </div>
  )
}

export default App;