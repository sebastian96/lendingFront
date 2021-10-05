import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login'
import Loan from '../components/Loan/Loan'
// import loadDetails from '../components/loadDetails'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/apply-loan" component={Loan} />
    </Switch>
  </BrowserRouter>
)

export default App;