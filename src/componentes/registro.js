import React from 'react';
import { Form, Input, InputNumber, Button, Card } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '¡${label} es obligatorio!',
    types: {
        email: '¡${label} no es un email válido!',
        number: '¡${label} no es un número válido!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
function Registro() {
    const history = useHistory();
    const onFinish = values => {


        // Enviar Peticion POST a Registrar
        const formData = new FormData()
        formData.append("rut", values.rut);
        formData.append("nombre", values.nombre);
        formData.append("apellido", values.apellido);
        formData.append("contrasena", values.contrasena);
        formData.append("email", values.email);
        formData.append("telefono", values.telefono);
        axios.post('http://localhost:3001/api/agregarCliente', formData)
            .then(response => {
                console.log(response);

                var respuestaServidor = response.data;
                if (respuestaServidor == 1) {
                    swal.fire({
                        title: 'Cliente Registrado',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    });
                    let path = 'login';
                    history.push(path);

                } else {
                    swal.fire({
                        title: 'Error al agregar',
                        text: '',
                        icon: 'error',
                        confirmButtonText: 'Continuar'
                    })

                }
            })
            .catch(err => console.warn(err));

    };
    return (
        <div className="container" style={{ backgroundColor: '#EEEEEE' }}>
            <Card className="mt-2 shadow" style={{ borderRadius: 30 }}>
                <h5 className="titulo-componentes">Bienvenido a tu próximo viaje</h5>
                <div className="row">
                    <div className="col-sm-6">

                        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                            <Form.Item name={['rut']} label="Rut" rules={[{ required: true }, {
                                max: 9,
                                message: "Ingrese RUT sin punto ni guión.",
                            },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['nombre']} label="Nombre" rules={[{ required: true }, {
                                max: 10,
                                message: "Max 10 Carácteres en el nombre",
                            },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['apellido']} label="Apellido" rules={[{ required: true }, {
                                max: 10,
                                message: "Max 10 Caráteres en el Apellido",
                            },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['contrasena']} label="Contrasena" rules={[{ required: true }, {
                                max: 10,
                                message: "Contraseña debe ser de 8 a 10 Caráteres",
                            }, {
                                min: 8,
                                message: "Contraseña debe ser de 8 a 10 Caráteres",
                            },]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name={['email']} label="Email" rules={[{ type: 'email', required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['telefono']} label="Telefono" rules={[{ required: true }, {
                                max: 8,
                                message: "Ingrese un teléfono válido",
                            }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button size={'large'} style={{ backgroundColor: '#461CE2', color: 'white' }} shape="round" htmlType="submit">
                                    Regístrate
        </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-sm-6">
                        <img style={{borderRadius:'40px'}} className="img-fluid" src="https://cdn.dribbble.com/users/3874322/screenshots/7080986/clip-04-02_4x.png"></img>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Registro;