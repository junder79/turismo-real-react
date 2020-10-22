import React, { useState } from 'react';
import { Steps, Button, message, Input, Form, DatePicker, TimePicker } from 'antd';
import './estilos/estilos-step.css';
import { AudioOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import DetalleReservaC from './detalle/detalleReservaCliente';

function ReservaCliente() {

    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    const history = useHistory();
    const onSearch = value => console.log(value);

    const onFinish = () => {
        console.log("ESTA");
    }

    const redireccionRuta = () => {
        let path = 'detalleLugar';
        history.push(path);
    }
    return (
        <div className="container">
            <h1>¿Donde vás?</h1>
            <Search placeholder="¿Donde?" onSearch={onSearch} enterButton />
            <Form name="time_related_controls" onFinish={onSearch}>
                <Form.Item name="range-picker" className="mt-2" label="Entrada y salida" >
                    <RangePicker />
                </Form.Item>
                <Button onClick={redireccionRuta} type="primary">Reservar</Button>
            </Form>
        </div>
    )

}


export default ReservaCliente;