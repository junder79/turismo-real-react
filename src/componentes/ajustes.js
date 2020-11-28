import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import Cookies from 'universal-cookie';
import axios from 'axios';
import swal from 'sweetalert2'
function Ajustes() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const cookies = new Cookies();
    const idUsuario = cookies.get('idUsuario');
    const nombre = cookies.get('nombre');
    const apellido = cookies.get('apellido');
    const contrasena = cookies.get('contrasena');
    const telefono = cookies.get('telefono');
    const rut = cookies.get('rut');
    const email = cookies.get('email');



    const onFinish = values => {
        console.log('Success:', values);
        const formData = new FormData();
        formData.append("nombre", values.nombre);
        formData.append("apellido", values.apellido);
        formData.append("email", values.correo);
        formData.append("telefono", values.telefono);
        formData.append("contrasena", values.contrasena);
        formData.append("id", idUsuario);


        axios.post('http://satur.docn.us/api/modificarCliente', formData)
            .then(response => {
                // Setear Cookies
                cookies.set('nombre', values.nombre, { path: '/' });
                cookies.set('apellido', values.apellido, { path: '/' });
                cookies.set('email', values.correo, { path: '/' });
                cookies.set('telefono', values.telefono, { path: '/' });
                cookies.set('contrasena', values.contrasena, { path: '/' });
                swal.fire({
                    title: 'Datos de tu cuenta modificados',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                })

            })
            .catch(err => console.warn(err));
    };


    return (
        <div className="container">
             <h1 className="titulo-componentes">Mi Cuenta</h1>
            <div className="container">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    initialValues={{ nombre: nombre, apellido: apellido, correo: email, telefono: telefono, contrasena: contrasena }}
                    onValuesChange={onFormLayoutChange}

                >

                    <Form.Item name="nombre" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item name="apellido" label="Apellido">
                        <Input />
                    </Form.Item>
                    <Form.Item name="correo" label="Correo">
                        <Input />
                    </Form.Item>
                    <Form.Item name="telefono" label="Teléfono">
                        <Input />
                    </Form.Item>
                    <Form.Item name="contrasena" label="Contraseña">
                        <Input />
                    </Form.Item>


                    <Form.Item>
                        <Button style={{backgroundColor: '#461CE2', color: 'white' }} size={'large'} shape="round" htmlType="submit">
                            Guardar
        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}

export default Ajustes;