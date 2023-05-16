import React from 'react';
import { GlobalContext } from './GlobalContext';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';


function App() {
  //global vars
  const SITENAV = {
    "baseurl": 'http://localhost:8080/api',
    "dashboard": '/dashboard'
  };
  // const BASEURL = 'http://localhost:8080/api';
  // const USERDASHBOARD = '/dashboard';

  return (
    <div className="pt-3 px-2 pb-2 neutralBackground">
      <GlobalContext.Provider value={{ SITENAV }}>
        <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route exact path={`${SITENAV.dashboard}`} element={<Dashboard />}/>
          {/* catch any other path to redirect */}
          {/* <Route path="*" element={<CatchPath />} /> */}
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
