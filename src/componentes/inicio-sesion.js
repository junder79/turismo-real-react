import React from 'react';
import { Form, Input, Button, Checkbox, Card, Row } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2'
import { useHistory, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
function InicioSesion() {
    const history = useHistory();
    const cookies = new Cookies();

    const onFinish = values => {
        
        const formData = new FormData()
        formData.append("correo", values.correo);
        formData.append("contrasena", values.password);

        axios.post('http://localhost:3001/api/validarUsuario', formData)
            .then(response => {
                // Guardo la respuesta del parametro de salida del sp
                let respuestaServidor = response.data.p_out;
                let idUsuario = response.data.p_out_id;
                let nombre = response.data.p_out_nombre;
                let apellido = response.data.p_out_apellido;

                let contrasena = response.data.p_out_contrasena;
                let telefono = response.data.p_out_telefono;
                let rut = response.data.p_out_rut;
                let email = response.data.p_out_email;
                if (respuestaServidor === "1") {
                    console.log("Usuario Encontrado");
                   
                    // Se crea las cookies con el id del usuario
                    let estadoSesion = true;
                    cookies.set('idUsuario', idUsuario, { path: '/' });
                    cookies.set('nombre', nombre, { path: '/' });
                    cookies.set('apellido', apellido, { path: '/' });
                    cookies.set('contrasena', contrasena, { path: '/' });
                    cookies.set('telefono', telefono, { path: '/' });
                    cookies.set('rut', rut, { path: '/' });
                    cookies.set('email', email, { path: '/' });

                    cookies.set('estadoSesion', estadoSesion, { path: '/' });
                    let path = 'inicio';
                    // history.push(path);
                    window.location.href = "inicio";
                } else {
                    console.log("No pudimos encontrar una cuenta");

                    swal.fire({
                        title: 'Cuenta no encontrada',
                        text: '',
                        icon: 'warning',
                        confirmButtonText: 'Intentar nuevamente'
                    });
                    cookies.set('estadoSesion', false, { path: '/' });
                }
            })
            .catch(err => console.warn(err));
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container" style={{}}>

                <img style={{marginLeft: '25%'}} className="logotr" src="/img/turismoreal-logo.png" width="50%" height="100%"></img> 
            <div className="row flex justify-content-center ci ">
                
                <Card style={{ borderRadius: 20}} className="">

                <h1 className="titulo-componentes justify-content-center">Inicio Sesión</h1>
                    <Form

                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="correo"
                            className="titulo-registrate"
                            rules={[{ required: true, message: 'Ingresa tu Email' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Contraseña"
                            name="password"
                            className="titulo-registrate"
                            rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <div className="row flex  text-center ">
                            <div className="col-12">
                                <Form.Item >
                                    <Button className="titulo-registrate btnes"  size={'large'} shape="round" htmlType="submit">
                                        Ingresar </Button>

                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Link to="/clie/registro" className="titulo-registrate" >Regístrate</Link>
                            </div>
                        </div>
                    </Form>



                </Card>
            </div>
        </div>
    )
}

export default InicioSesion;