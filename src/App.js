import React from 'react';
import Navbar from './componentes/navbar';
import Login from './componentes/login';
import Inicio from './componentes/inicio';
import GetUsuarios from './componentes/data';
import Acondicionados from './componentes/acondicionados';
import ReservaCliente from './componentes/crearReserva';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Departamentos from './componentes/departamentos';
import { createBrowserHistory } from "history";
import DetalleReservaC from './componentes/detalle/detalleReservaCliente';
import InicioWebsite from './componentes/website';
function App() {
  const history = createBrowserHistory()
  return (

    <div className="app">
       
      {/* {history.location.pathname === '/login' ? <Login></Login>  : <Navbar />}
      <Router>
        <Switch>
          
          <Route path='/admin/inicio' component={Inicio}> </Route>
          <Route path='/admin/acondicionados' component={Acondicionados}> </Route>
          <Route path='/admin/usuarios' component={GetUsuarios}> </Route>
          <Route path='/admin/departamentos' component={Departamentos}> </Route>
          <Route path='/clie/reservar' component={ReservaCliente}> </Route>
          <Route path='/clie/detalleLugar' component={DetalleReservaC}> </Route>
        </Switch>
      </Router> */}
      <InicioWebsite></InicioWebsite>
    </div>

  );
}

export default App;
