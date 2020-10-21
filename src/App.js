import React from 'react';
import Navbar from './componentes/navbar';
import Login from './componentes/login';
import Inicio from './componentes/inicio';
import GetUsuarios from './componentes/data';
import Acondicionados from './componentes/acondicionados';

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Departamentos from './componentes/departamentos';
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory()
  return (

    <div className="app">
       
      {history.location.pathname === '/login' ? <Login></Login>  : <Navbar />}
      <Router>
        <Switch>
          
          <Route path='/admin/inicio' component={Inicio}> </Route>
          <Route path='/admin/acondicionados' component={Acondicionados}> </Route>
          <Route path='/admin/usuarios' component={GetUsuarios}> </Route>
          <Route path='/admin/departamentos' component={Departamentos}> </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
