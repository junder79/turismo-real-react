import React from 'react';
import { Form, Input, InputNumber, Button,Card } from 'antd';
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
        console.log(values);

        // Enviar Peticion POST a Registrar
        const formData = new FormData()
        formData.append("rut", values.rut);
        formData.append("nombre", values.nombre);
        formData.append("apellido", values.apellido);
        formData.append("contrasena", values.contrasena);
        formData.append("email", values.email);
        formData.append("telefono", values.telefono);
        axios.post('http://localhost:3001/agregarCliente', formData)
            .then(response => {
                console.log(response);

                var respuestaServidor = response.data;
                if (respuestaServidor == 1) {
                    swal.fire({
                        title: 'Usuario Agregado',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    });
                    let path = 'inicio';
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
        <div className="container" style={{backgroundColor:'#EEEEEE'}}>
           <Card>
           <h5 className="texto-calistoga">Bienvenido a tu próximo viaje</h5>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['rut']} label="Rut" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['nombre']} label="Nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['apellido']} label="Apellido" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['contrasena']} label="Contrasena" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['telefono']} label="Telefono" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Regístrate
        </Button>
                </Form.Item>
            </Form>
           </Card>
        </div>
    )
}

export default Registro;