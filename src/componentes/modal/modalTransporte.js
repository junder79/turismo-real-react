import React, { useState } from 'react';
import { Modal, Button, Form, Input, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, TimePicker } from 'antd';
import moment from 'moment';
import Cookies from 'universal-cookie';
function ModalAgregarTransporte(objeto) {

    const cookies = new Cookies();
    const showModal = () => {
        objeto.setEstadoModalTran(true);
    };

    const handleOk =  values => {
        console.log('Success:', values);
        cookies.set('estadoTransporte', 1, { path: '/' });
        cookies.set('transporteId', objeto.idTransporte, { path: '/' });
        cookies.set('direccionTransporte', objeto.direccionTransporte, { path: '/' });
      
        var fechaInput = values.fecha;
        var horaInput = values.horario;
        var fechaFormat = moment(fechaInput).format("YYYY/MM/DD");
        var horaFormat = moment(horaInput).format("HH:mm");
        cookies.set('fechaTransporte', fechaFormat, { path: '/' });
        cookies.set('horaTransporte', horaFormat, { path: '/' });
    
        objeto.setEstadoModalTran(true);
        objeto.redireccionTotal();
    };

    const handleCancel = e => {
        console.log(e);
        objeto.setEstadoModalTran(false);
    };
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

 

    const format = 'HH:mm';
    return (
        <Modal
            title="Indícanos el Horario"
            visible={objeto.estadoModalTransp}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps ={{ style: { display: 'none' } }}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={handleOk}
                onValuesChange={onFormLayoutChange}

            >


                <Form.Item label="Fecha" name="fecha"  rules={[{ required: true, message: 'Seleccione Fecha' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Horario" name="horario"  rules={[{ required: true, message: 'Seleccione un Horario' }]}>
                    <TimePicker defaultValue={moment('12:00', format)} format={format} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Siguiente
        </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregarTransporte;