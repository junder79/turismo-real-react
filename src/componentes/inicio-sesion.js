import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
function InicioSesion() {
    const history = useHistory();
    const cookies = new Cookies();
    
    const onFinish = values => {
        console.log('Success:', values);
        const formData = new FormData()
        formData.append("correo", values.correo);
        formData.append("contrasena", values.password);
        
        axios.post('http://localhost:3001/validarUsuario', formData)
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
                    let path = 'inicio';
                    history.push(path);
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
        <div className="container">
            <h5>Inicia Sesión</h5>
            <Form

                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Correo"
                    name="correo"
                    rules={[{ required: true, message: 'Ingresa tu nombre de usuario' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Ingresa tu password' }]}
                >
                    <Input.Password />
                </Form.Item>



                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Ingresar
          </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default InicioSesion;