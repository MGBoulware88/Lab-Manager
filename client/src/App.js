import React from 'react';
import { GlobalContext } from './GlobalContext';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import RequisitionTable from './views/RequisitionTable';
import EditRequisition from './views/EditRequisition';
import RequisitionRedirect from './components/RequisitionRedirect';
import AddAccount from './views/AddAccount';
import AddProvider from './views/AddProvider';
import Accounts from './views/Accounts';
import EditAccount from './views/EditAccount';
import AddRequisition from './views/AddRequisition';


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
          <Route exact path={`/requisitions/new`} element={<AddRequisition />}/>
          <Route exact path={`/requisitions/edit/:id`} element={<EditRequisition />}/>
          <Route exact path={`/requisitions/success`} element={<RequisitionRedirect />}/>
          <Route exact path={`/accounts`} element={<Accounts/>}/>
          <Route exact path={`/accounts/new`} element={<AddAccount/>}/>
          <Route path={`/accounts/edit/:id`} element={<EditAccount/>}/>
          <Route exact path={`/accounts/providers/new`} element={<AddProvider/>}/>
          {/* catch any other path to redirect */}
          {/* <Route path="*" element={<CatchPath />} /> */}
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
