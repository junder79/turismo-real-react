import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetUsuarios from './data';
import Departamentos from './departamentos';
import Inicio from './inicio';
import Reservas from './reservas';
import { BrowserRouter as Router, Switch, Route, Link,useLocation } from "react-router-dom";
import Acondicionados from './acondicionados';

function Navbar() {
    
   
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav items-navbar">

                        <li className="nav-item" >
                            <Link to="/inicio"  className="nav-link">Inicio</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/usuarios" className="nav-link">Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/departamentos" className="nav-link">Departamentos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reservas" className="nav-link">Reservas</Link>
                        </li>
                    </ul>
                </div>
                <form className="form-inline">
                    <Link to="/login" className="btn btn-outline btn-sm">Cerrar Sesión</Link>
                </form>
            </nav>
            <Switch>
                <Route path="/inicio" >
                    <Inicio></Inicio>
                </Route>
                <Route path="/usuarios">
                    <GetUsuarios></GetUsuarios>
                </Route>
                <Route path="/departamentos">
                    <Departamentos></Departamentos>
                </Route>
                <Route path="/acondicionado">
                    <Acondicionados></Acondicionados>
                </Route>
                <Route path="/reservas">
                    <Reservas></Reservas>
                </Route>
            </Switch>
        </Router>
    )
   
}

export default Navbar;