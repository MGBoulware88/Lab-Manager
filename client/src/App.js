import React from 'react';
import { GlobalContext } from './GlobalContext';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import RequisitionTable from './views/RequisitionTable';
import RequisitionForm from './views/RequisitionForm';
import RequisitionRedirect from './components/RequisitionRedirect';
import AddAccount from './views/AddAccount';
import AddProvider from './views/AddProvider';
import Accounts from './views/Accounts';


function App() {
  //global vars
  const SITENAV = {
    "baseurl": 'http://localhost:8080/api',
    "dashboard": '/dashboard'
  };
  // const BASEURL = 'http://localhost:8080/api';
  // const USERDASHBOARD = '/dashboard';

  return (
    <div className="neutralBackground">
      <GlobalContext.Provider value={{ SITENAV }}>
        <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route exact path={`${SITENAV.dashboard}`} element={<Dashboard />}/>
          <Route exact path={`/requisitions`} element={<RequisitionTable />}/>
          <Route exact path={`/requisitions/new`} element={<RequisitionForm />}/>
          <Route exact path={`/requisitions/success`} element={<RequisitionRedirect />}/>
          <Route exact path={`/accounts`} element={<Accounts/>}/>
          <Route exact path={`/accounts/new`} element={<AddAccount/>}/>
          <Route exact path={`/accounts/providers/new`} element={<AddProvider/>}/>
          {/* catch any other path to redirect */}
          {/* <Route path="*" element={<CatchPath />} /> */}
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
