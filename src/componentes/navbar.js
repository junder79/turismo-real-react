import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import GetUsuarios from './data';
import Departamentos from './departamentos';
import Inicio from './inicio';
import Reservas from './reservas';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Acondicionados from './acondicionados';
import Tours from './servicioTour';
import Transportes from './servicioTransporte';
import DetalleTour from './detalle/detalleTour';
import ReservaCliente from './crearReserva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faLuggageCart, faHome, faSignInAlt, faSignOutAlt, faFan, faMapMarkerAlt, faSink, faArrowLeft, faCalendarCheck, faRoute } from "@fortawesome/free-solid-svg-icons";

import { Menu } from 'antd';
import AgregarHuespedes from './detalle/detalleHuespedes';

import DetalleReservaC from './detalle/detalleReservaCliente';
import ServicioExtraTour from './detalle/detalleServicioExtraTour';
import ServicioExtraTransporte from './detalle/detalleTransporte';
import InicioWebsite from './website';
import TotalReserva from './detalle/detalleTotalReserva';
import Registro from './registro';
import CerrarSesion from './cerrar-sesion';
import InicioSesion from './inicio-sesion';
import DetalleDepartamento from './detalle/detalleDepartamento';
import MisViajes from './misViajes';
import Ajustes from './ajustes';
import DetalleViaje from './detalle/detalleViaje';


import Cookies from 'universal-cookie';
const { SubMenu } = Menu;
function BarraNavegacion() {

    const cookies = new Cookies();
    const estadoLogin = cookies.get('estadoSesion');

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Router >

            <Navbar color="light" light expand="md" style={{ borderRadius: '30' }}>
                <a class="navbar-brand" href="#">
                    <img src="/img/turismoreal-logo.png" width="60" height="40" class="d-inline-block align-top" alt="" loading="lazy"></img>
                </a>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to={"/inicio"} className="nav-link">
                                <FontAwesomeIcon icon={faHome} className="mr-2"></FontAwesomeIcon>
                                Inicio
              </Link>
                        </NavItem>
                        {
                            estadoLogin == "true" ?
                                <>
                                    <NavItem>
                                        <Link to={"/micuenta"} className="nav-link" ><FontAwesomeIcon icon={faUserCircle} className="mr-2"></FontAwesomeIcon> Mi Cuenta</Link>
                                    </NavItem>

                                    <NavItem>
                                        <Link to={"/viajes"} className="nav-link" ><FontAwesomeIcon icon={faLuggageCart} className="mr-2"></FontAwesomeIcon> Mis Reservas</Link>
                                    </NavItem>
                                </>
                                : null
                        }

                    </Nav>
                    {
                        estadoLogin == "true" ?
                            <>
                                <NavbarText>  <Link to="/cerrar" ><FontAwesomeIcon icon={faSignOutAlt} className="mr-2"></FontAwesomeIcon> Cerrar Sesión</Link></NavbarText>
                            </>
                            :
                            <>
                                <NavbarText>  <Link to="/login" >Iniciar Sesión</Link></NavbarText>
                                <NavbarText className="ml-2">  o </NavbarText>
                                <NavbarText >  <Link to="/registro" className="ml-2" >Regístrate</Link></NavbarText>
                            </>
                    }

                </Collapse>
            </Navbar>

            <Switch>
                <Route path="/admin/inicio" >
                    <Inicio></Inicio>
                </Route>
                <Route path="/admin/usuarios">
                    <GetUsuarios></GetUsuarios>
                </Route>
                <Route path="/admin/departamentos">
                    <Departamentos></Departamentos>
                </Route>
                <Route path="/admin/acondicionado">
                    <Acondicionados></Acondicionados>
                </Route>
                <Route path="/admin/reservas">
                    <Reservas></Reservas>
                </Route>
                <Route path="/admin/tours">
                    <Tours></Tours>
                </Route>
                <Route path="/admin/transportes">
                    <Transportes></Transportes>
                </Route>
                <Route path="/reservar">
                    <ReservaCliente></ReservaCliente>
                </Route>
                <Route path="/tours/:id">
                    <DetalleReservaC></DetalleReservaC>
                </Route>
                <Route path="/huespedes">
                    <AgregarHuespedes></AgregarHuespedes>
                </Route>
                <Route path="/tours">
                    <ServicioExtraTour></ServicioExtraTour>
                </Route>
                <Route path="/detalleTransporte">
                    <ServicioExtraTransporte></ServicioExtraTransporte>
                </Route>
                <Route path="/inicio" exact>
                    <InicioWebsite></InicioWebsite>
                </Route>
                <Route path="/total">
                    <TotalReserva></TotalReserva>
                </Route>
                <Route path="/registro">
                    <Registro></Registro>
                </Route>
                <Route path="/login">
                    <InicioSesion></InicioSesion>
                </Route>
                <Route path="/cerrar">
                    <CerrarSesion></CerrarSesion>
                </Route>
                <Route path="/departamento/:id/:comuna">
                    <DetalleDepartamento></DetalleDepartamento>
                </Route>
                <Route path="/viajes">
                    <MisViajes></MisViajes>
                </Route>
                <Route path="/mireserva/:idreserva">
                    <DetalleViaje></DetalleViaje>
                </Route>
                <Route path="/micuenta">
                    <Ajustes></Ajustes>
                </Route>
                <Route exact path="/detalletour/:tourId/:lugar/:valor/:descripcion/:comuna/:region/:horario" component={DetalleTour}></Route>
            </Switch>
        </Router>
    )

}

export default BarraNavegacion;