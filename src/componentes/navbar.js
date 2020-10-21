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
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined ,UserOutlined  , HomeOutlined ,CarOutlined,CarryOutOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
function Navbar() {


    return (
        <Router>
            <Menu mode="horizontal">
                <Menu.Item key="mail" icon={<UserOutlined />}>
                    <Link to="/admin/usuarios" >Usuarios</Link>
                </Menu.Item>
                <Menu.Item key="departamento" icon={<HomeOutlined />}>
                    <Link to="/admin/departamentos" >Departamentos</Link>
                </Menu.Item>
                <Menu.Item key="reserva" icon={<CarryOutOutlined />}>
                    <Link to="/admin/reservas" >Reservas</Link>
                </Menu.Item>
                <Menu.Item key="tours" icon={<MailOutlined />}>
                    <Link to="/admin/tours" >Tours</Link>
                </Menu.Item>
                <Menu.Item key="servicio" icon={<CarOutlined />}>
                    <Link to="/admin/transportes" >Servicios de Transportes</Link>
                </Menu.Item>
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
                <Route exact path="/detalletour/:tourId/:lugar/:valor/:descripcion/:comuna/:region/:horario" component={DetalleTour}></Route>
            </Switch>
        </Router>
    )

}

export default Navbar;