import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login'
// import Load from '../components/Load'
// import loadDetails from '../components/loadDetails'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      {/* <Route exact path="/apply-load" component={Load} />
      <Route exact path="/load/details" component={loadDetails} /> */}
    </Switch>
  </BrowserRouter>
)

export default App;