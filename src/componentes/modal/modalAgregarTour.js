import React, { useState } from 'react';
import { Modal, Button, Form, Input, Radio,TimePicker } from 'antd';

function ModalAgregarTour(objeto) {

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');

    const mostrarModal = () => {
        objeto.setEstado(true);
    }

    const handleOk = e => {
        objeto.setEstado(false);
    };

    const handleCancel = e => {
        console.log(e);
        objeto.setEstado(false);
    };
    return (
        <>
            <Button type="primary" onClick={mostrarModal}>
                Open Modal
        </Button>
            <Modal
                title="Agregar Tour"
                visible={objeto.estadoModalTour}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                
                    form={form}
                   
                >

                    <Form.Item label="Lugar">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Descripcion">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                      <Form.Item name="time-picker" label="TimePicker" >
        <TimePicker />
      </Form.Item>
                    <Form.Item >
                        <Button type="primary">Guardar</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default ModalAgregarTour;