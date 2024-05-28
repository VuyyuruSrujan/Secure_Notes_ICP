import { useState } from 'react';
import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';
import Home from './Home';
import Titles from './Titles';
import SignUp from './signup';
function App() {
  
  return(
    <>       
    <Titles />
    <Home />
    {/* <SignUp /> */}
    </>
  );
}

export default App;
