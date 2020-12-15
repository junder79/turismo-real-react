import React, { useState } from 'react';
import { Modal, Button, Form, Input, Radio, TimePicker, Row, Col, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
function ModalAgregarTour(objeto) {
    const format = 'HH:mm';
    const { Option } = Select;
    const [form] = Form.useForm();
   
    const [comunas, setComunas] = useState([]);
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

    function selectRegion(value) {


        const regionId = `${value}`;
        axios({
            method: 'GET',
            url: "http://localhost:3001/api/getComuna/" + regionId + ""
        }).then(res => {
            console.log(res);
            setComunas(res.data);
            console.log("COMUNAS " + comunas)
        }).catch(err => {
            console.log(err);
        })
    }
    const props = {
        name: 'file',
        action: 'http://localhost:3001/api/uploadImagen',
        headers: {
            authorization: 'authorization-text',
        },

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const agregarFotosArray = ({ fileList }) => {
       
        console.log('fileList', fileList);

        setFotoT(fileList);
        // console.log('picture: ', fotoT);
    };

    // const agregarTour = () => {

    // }
    const [fotoT, setFotoT] = useState([]);
    const onFinish = values => {
        console.log('Success:', values);
        console.log('picture: ',fotoT[0].originFileObj);
        var lugar = values.lugar;
        var descripcion = values.descripcion;
        var valor = values.valor;
        var comuna = values.comuna;
        var fechaInput = new Date(values.horario);
        var fechaFormat = moment(fechaInput).format("YYYY-MM-DD HH:mm:ss");
       

        console.log("FECHA F" + fechaFormat);
        const formData = new FormData()
        fotoT.forEach((fileList) =>
        formData.append('file', fileList.originFileObj)
            
        );

        formData.append("lugar", lugar);
        formData.append("descripcion", descripcion);
        formData.append("valor", valor);
        formData.append("comuna", comuna);
        formData.append("fecha", fechaFormat);

        const headers = {
            'content-type': 'multipart/form-data'
        }
        axios.post('http://localhost:3001/api/agregarTour', formData, { headers })
            .then(response => {
                // Guardo la respuesta del parametro de salida del sp

                var respuestaServidor = JSON.stringify(response.data);

                if (respuestaServidor == 1) {
                    // Mensaje de Insertado Correctamente
                    Swal.fire({
                        title: 'Tour Agregado',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    })

                } else {
                    Swal.fire({
                        title: 'Error al Agregar',
                        text: '',
                        icon: 'error',
                        confirmButtonText: 'Continuar'
                    })
                }
            })
            .catch(err => console.warn(err));


    };

    return (
        <>
            <Button type="primary" onClick={mostrarModal}>
                Agregar Tour
        </Button>
            <Modal
                title="Agregar Tour"
                visible={objeto.estadoModalTour}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form

                    form={form}
                    onFinish={onFinish}
                >

                    <Row>
                        <Col span={24}>
                            <Form.Item label="Lugar" name="lugar" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input placeholder="" />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Descripcion" name="descripcion" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input placeholder="" />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Valor" name="valor" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input placeholder="Valor por persona" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Horario" name="horario" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <TimePicker

                                    showNow={false}
                                    format={format}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Region" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Select defaultValue="Seleccione Región" style={{ width: '100%' }} onChange={selectRegion}>
                                    <Option value="1">Arica y Parinacota</Option>
                                    <Option value="2">Tarapacá</Option>
                                    <Option value="3">Antofagasta</Option>
                                    <Option value="4">Atacama</Option>
                                    <Option value="5">Coquimbo</Option>
                                    <Option value="6">Valparaíso</Option>
                                    <Option value="7">Metropolitana de Santiago</Option>
                                    <Option value="8">Libertador General Bernando</Option>
                                    <Option value="9">Maule</Option>
                                    <Option value="10">Ñuble</Option>
                                    <Option value="11">Biobío</Option>
                                    <Option value="12">La Araucania</Option>
                                    <Option value="13">Los Ríos</Option>
                                    <Option value="14">Los Lagos</Option>
                                    <Option value="15">Aisén del General Carlos Ibáñez del Campo</Option>
                                    <Option value="16">Magallanes y de la Antártica Chilena</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Comuna" name="comuna" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Select defaultValue="Seleccione Comuna" style={{ width: '100%' }} >
                                    {
                                        comunas.map((elemento, i) => (
                                            <Option value={elemento.IDCOMUNA}>{elemento.NOMBRECOMUNA}</Option>

                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Imágenes" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Upload {...props} beforeUpload={() => false} onChange={agregarFotosArray}>
                                    <Button icon={<UploadOutlined />}>Click para subir</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Agregar
        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default ModalAgregarTour;