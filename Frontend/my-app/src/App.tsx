import React from 'react';
import NavBar from './components/NavBar';

function App () {
  let items = ["Home", "Page"]
  return(
    <div className='NavBar'>
      <NavBar 
      items={items}/>
    </div>
  )
}

export default App;