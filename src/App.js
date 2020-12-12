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
import TotalReserva from './componentes/detalle/detalleTotalReserva';
import Registro from './componentes/registro';
import InicioSesion from './componentes/inicio-sesion';
import DetalleDepartamento from './componentes/detalle/detalleDepartamento';
import ServicioExtraTour from './componentes/detalle/detalleServicioExtraTour';
import DetalleViaje from './componentes/detalle/detalleViaje';

import { DataProvider } from './componentes/context/reserva-context'

function App() {
  const history = createBrowserHistory()
  return (

    <DataProvider>
      <div  className="app">

        {history.location.pathname === '/' ?  window.location.href = "http://localhost:8001/inicio" : <Navbar />}
        <Router>
          <Switch>

            <Route path='/admin/inicio' component={Inicio}> </Route>
            <Route path='/admin/acondicionados' component={Acondicionados}> </Route>
            <Route path='/admin/usuarios' component={GetUsuarios}> </Route>
            <Route path='/admin/departamentos' component={Departamentos}> </Route>
            <Route path='/reservar' component={ReservaCliente}> </Route>
            <Route path='/tours/:id' component={DetalleReservaC}> </Route>
            <Route path='/inicio' component={InicioWebsite}> </Route>
            <Route path='/total' component={TotalReserva}> </Route>
            <Route path='/registro' component={Registro}> </Route>
            <Route path='/login' component={InicioSesion}> </Route>
            <Route path='/departamento/:id' component={DetalleDepartamento}> </Route>
            <Route path='/tours' component={ServicioExtraTour}> </Route>
            <Route path='/mireserva/:idreserva' component={DetalleViaje}> </Route>
          </Switch>
        </Router>

      </div>
    </DataProvider>

  );
}

export default App;
