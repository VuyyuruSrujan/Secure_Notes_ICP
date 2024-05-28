// import { useState } from 'react';
// import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';
// import Home from './Home';
// import SignUp from './SignUp';
// function App() {
  
//   return(
//     <>       
//     <Home />
//     <SignUp />
//     </>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
