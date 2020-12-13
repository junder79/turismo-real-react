import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, Button, Radio, Input, Descriptions, Badge, InputNumber, Form, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuttleVan, faMapMarkerAlt, faCalendarDay, faClock, faSun } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useHistory, useParams } from "react-router-dom";
import UseAnimations from 'react-useanimations';
import infinity from 'react-useanimations/lib/infinity'
function TotalReserva() {

    const cookies = new Cookies();
    const history = useHistory();
    const valorDepartamento = cookies.get('valorDepart');
    const idUsuario = cookies.get('idUsuario');
    const checkIn = cookies.get('checkIn');
    const checkOut = cookies.get('checkOut');
    const cantDia = cookies.get('cantD');
    const departNombre = cookies.get('departNombre');
    const lugarNombre = cookies.get('departLugar');
    const estadoTransporte = cookies.get('estadoTransporte');
    const estadoTour = cookies.get('estadoTour');
    const tourId = cookies.get('tourId');
    const lugarTour = cookies.get('lugarTour');
    const transporteId = cookies.get('transporteId');
    const fechaTransporte = cookies.get('fechaTransporte');
    const horaTransporte = cookies.get('horaTransporte');
    const idDepartamento = cookies.get('idDepart');
    const direccionTransporte = cookies.get('direccionTransporte');
    const [totalReserva, setTotalReserva] = useState('');
    const [valorAnticipado, setValorAnt] = useState('');

    const [btnAgregarReserva, setBtnReservar] = useState(true);
    function onChange(value) {

        if (value == 0) {
            setBtnReservar(true);
        } else if (value == null) {
            setBtnReservar(true);
        }
        else {
            setBtnReservar(false);
        }


        setValorAnt(value);
        const valorTotal = (valorDepartamento * cantDia) - value;
        console.log("Total" + valorTotal);

        setTotalReserva(valorTotal);
    }
    useEffect(() => {



    }, [])
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    const [estadoReservaGenerada, setReservaGenerada] = useState(false);
    const [lastId, setLastId] = useState('');


    const realizarPago = () => {
        let timerInterval
        setModalPago(true);

        const formData = new FormData();
        // Datos de Reserva 
        formData.append("fecha_inicio", checkIn);
        formData.append("fecha_termino", checkOut);
        formData.append("monto_total", totalReserva);
        formData.append("valor_anticipado", valorAnticipado);
        formData.append("id_usuario", idUsuario);
        formData.append("departamento_id", idDepartamento);
        formData.append("fecha_actual", '2003/05/03');

        // Estados de Transporte 

        if (estadoTransporte == 1) {
            formData.append("estadoTransporte", 1);
            formData.append("transporteId", transporteId);
            formData.append("horaTransporte", horaTransporte);
            formData.append("fechaTransporte", fechaTransporte);
        }
        // Estado Tour
        if (estadoTour == 1) {
            formData.append("tourId", tourId);
            formData.append("estadoTour", 1);

        }


        axios.post('http://localhost:3001/api/crearreserva', formData)
            .then(response => {
                console.log(response);

                var respuestaServidor = response.data.respuestaReserva;
                setLastId(response.data.lastId);
                if (respuestaServidor == 1) {

                    setReservaGenerada(true);

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

    }
    const [modalPago, setModalPago] = useState(false);
    const showModal = () => {
        setModalPago(true);
    };

    const handleOk = e => {
        console.log(e);
        setModalPago(false)
    };

    const handleCancel = e => {
        console.log(e);
        setModalPago(false);
    };
    return (
        <div style={{ backgroundColor: '#EEEEEE' }} >
            <div className="container">
                <h7 className="titulo-componentes mt-2" >¡Falta poco! Paga tu monto anticipado y listo</h7>
                <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2 ">
                        <Card style={{ backgroundImage: "url(" + "https://static.vecteezy.com/system/resources/previews/001/222/715/non_2x/blue-purple-gradient-dynamic-rounded-stripe-design-vector.jpg" + ")", height: 250, borderRadius: 30 }} className="shadow">
                            <p style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Detalle del pago</p>
                            <span className="detallePago" style={{ color: 'white', fontSize: 20 }}>Valor por día  <FontAwesomeIcon icon={faSun}></FontAwesomeIcon> : ${valorDepartamento} </span><br />
                            <span className="detallePago" style={{ color: 'white', fontSize: 20 }}>Cant Días  : {cantDia} </span><br />
                            <span className="detallePago" style={{ color: 'white', fontSize: 20 }}>Total a Pagar en Reserva: ${totalReserva}</span><br />
                        </Card>
                        <div className="mt-4 mb-2 shadow-xs">
                            <Card style={{ width: '100%', backgroundImage: "url(" + "https://static.vecteezy.com/system/resources/previews/000/681/826/non_2x/neon-yellow-green-gradient-background-with-overlapping-round-shapes.jpg" + ")", borderRadius: 20, color: 'white' }}>
                                <p>Deberás pagar un valor anticipado de la reserva, el resto deberás pagarlo en el primer día de tu agendado</p>
                                <Form style={{ color: 'white' }}>
                                    <Form.Item label="Monto Anticipado">
                                        <InputNumber defaultValue={0} style={{ width: '100%' }} onChange={onChange} />
                                    </Form.Item>
                                </Form>
                            </Card>

                        </div>

                    </div>

                    <div className="col-md-8  col-sm-12 ">
                        <Card style={{ backgroundColor: '#FFFFFF', borderRadius: 30 }} className="shadow">
                            <h5 className="titulo-detalle">Detalle de tu Reserva</h5>
                            <Descriptions title="" layout="vertical" bordered>
                                <Descriptions.Item label="Departamento">{departNombre}</Descriptions.Item>
                                <Descriptions.Item label="Lugar">{lugarNombre}</Descriptions.Item>
                                <Descriptions.Item label="Cantidad de Días">{cantDia}</Descriptions.Item>
                                <Descriptions.Item label="Check In">{checkIn}</Descriptions.Item>
                                <Descriptions.Item label="Check Out" span={2}>
                                    {checkOut}
                                </Descriptions.Item>

                                <Descriptions.Item label="Servicios Extras">
                                    {
                                        estadoTour == 1 ?

                                            <>
                                                <br></br>
                                                <span>Detalle del Tour: </span><br></br>
                                                <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon><span className="ml-2">{lugarTour}</span>
                                            </>
                                            :
                                            null
                                    }
                                    <br />
                                    {
                                        estadoTransporte == 1 ?

                                            <>
                                                <br></br>
                                                <span>Detalle Transporte: </span><br></br>
                                                <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon><span className="ml-2">{direccionTransporte}</span><br></br>
                                                <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon><span className="ml-2">{fechaTransporte}</span><br></br>
                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon><span className="ml-2">{horaTransporte}</span></> :
                                            null
                                    }
                                </Descriptions.Item>
                            </Descriptions>

                            <Button disabled={btnAgregarReserva} onClick={() => realizarPago()} type="primary" shape="round" className="mt-2 text-center" size={'large'}>
                                Pagar Ahora
        </Button>
                            <img style={{float:'right'}} width='160' height="90"  src="https://www.enlanubelab.cl/wp-content/uploads/2016/09/webpay.png"></img>
                            <Modal
                                title="Confirmación de Reserva"
                                visible={modalPago}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >

                                <div className="d-flex justify-content-center">

                                    {/* <img className="img-fluid" src="data:image/png;base64,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"></img> */}
                                    {
                                        estadoReservaGenerada == 1 ?
                                            <form id="webpay-form" action='http://localhost:3001/webpay-normal/init' method="POST" id="form">
                                                <input type="hidden" name="total" value={valorAnticipado} />
                                                <input name="idReserva" type="hidden" value={lastId} />
                                                <input name="motivo" type="hidden" value="Abono Reserva" />
                                                <input type="primary" style={{ borderRadius: '20px', backgroundColor: '#7b1fa2', color: 'white', fontSize: 25 }} className="mt-2 text-center  btn" size={'large'} type="submit" value={"Monto Anticipado a Pagar: $" + valorAnticipado} />


                                            </form>
                                            : <UseAnimations strokeColor={'#512da8'} animation={infinity} size={80}></UseAnimations>
                                    }
                                </div>
                            </Modal>

                        </Card>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default TotalReserva;