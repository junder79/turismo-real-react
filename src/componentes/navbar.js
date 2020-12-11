import React from 'react';
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
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, HomeOutlined, CarOutlined, CarryOutOutlined } from '@ant-design/icons';
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
function Navbar() {

    const cookies = new Cookies();
    const estadoLogin = cookies.get('estadoSesion');
    return (
        <Router >
            
            <Menu mode="horizontal" styles=" background-color: transparent !important;">

                <img className="logoimg" src="/img/turismoreal-logo.png" width="2%" height="40%"></img> 
                <Menu.Item key="inicio" icon={<FontAwesomeIcon icon={faHome} className="mr-2"></FontAwesomeIcon>}>
                    <Link to="inicio" >Inicio</Link>
                </Menu.Item>
                {
                    estadoLogin == "true" ?
                        <>
                            <Menu.Item key="micuenta" icon={<FontAwesomeIcon icon={faUserCircle} className="mr-2"></FontAwesomeIcon>}>
                                <Link to="micuenta" >Mi Cuenta</Link>
                            </Menu.Item>

                            <Menu.Item key="departamento" icon={<FontAwesomeIcon icon={faLuggageCart} className="mr-2"></FontAwesomeIcon>}>
                                <Link to="viajes" >Mis Reservas</Link>
                            </Menu.Item>
                            <Menu.Item key="cerrar" icon={<FontAwesomeIcon icon={faSignOutAlt} className="mr-2"></FontAwesomeIcon>}>
                                <Link to="cerrar" >Cerrar Sesión</Link>
                            </Menu.Item>
                        </>
                        : <Menu.Item key="inicioSesion" icon={<FontAwesomeIcon icon={faSignInAlt} className="mr-2"></FontAwesomeIcon>}>
                            <Link to="login">Iniciar Sesión</Link>
                        </Menu.Item>
                }

                {/* {
                    estadoLogin == "true" ?
                        <Menu.Item key="departamento" icon={<FontAwesomeIcon icon={faLuggageCart} className="mr-2"></FontAwesomeIcon>}>
                            <Link to="viajes" >Mis Viajes</Link>
                        </Menu.Item> : null
                } */}

            </Menu>
           
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
                <Route path="reservar">
                    <ReservaCliente></ReservaCliente>
                </Route>
                <Route path="tours/:id">
                    <DetalleReservaC></DetalleReservaC>
                </Route>
                <Route path="huespedes">
                    <AgregarHuespedes></AgregarHuespedes>
                </Route>
                <Route path="tours">
                    <ServicioExtraTour></ServicioExtraTour>
                </Route>
                <Route path="detalleTransporte">
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

export default Navbar;