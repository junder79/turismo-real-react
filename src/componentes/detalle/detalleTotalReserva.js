import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, Button, Radio, Input, Descriptions, Badge, InputNumber, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuttleVan, faMapMarkerAlt, faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useHistory, useParams } from "react-router-dom";
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

        realizarPagoweb();

    }, [])
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    const realizarPagoweb = () => {

        axios.post('http://localhost:3001/api/pagar')
            .then(response => {
                console.log(response);
                setUrl(response.data.url);
                setToken(response.data.token);
                // console.log("response" + JSON.stringify(response));
                // window.location.href = response.data.url + '?token_ws=' + response.data.token;
            })
            .catch(err => console.warn(err));
    }
    const realizarPago = () => {
        let timerInterval
        swal.fire({
            title: 'Agendando Reserva',
            html: 'Porfavor espere',
            timer: 10000,
            timerProgressBar: true,
            willOpen: () => {
                swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
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


        axios.post('http://satur.docn.us/api/crearreserva', formData)
            .then(response => {
                console.log(response);

                var respuestaServidor = response.data;
                if (respuestaServidor == 1) {
                    swal.fire({
                        title: 'Reserva Generada',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    });
                    history.push('/clie/viajes');
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

    return (
        <div style={{ backgroundColor: '#EEEEEE' }} >
            <div className="container">
                <h7 className="titulo-componentes mt-2" >¡Falta poco! Completa tus datos y finaliza tu compra</h7>
                <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2 ">
                        <Card style={{ backgroundImage: "url(" + "https://static.vecteezy.com/system/resources/previews/001/222/715/non_2x/blue-purple-gradient-dynamic-rounded-stripe-design-vector.jpg" + ")", height: 500, borderRadius: 30 }} className="shadow">
                            <p style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Detalle del pago</p>
                            <span className="detallePago" style={{ color: 'white', fontSize: 20 }}>Valor X día : ${valorDepartamento} </span><br />
                            <span className="detallePago" style={{ color: 'white', fontSize: 20 }}>Cant Días  : {cantDia} </span><br />
                            <span className="detallePago" style={{ color: 'white', fontSize: 20 }}>Total a Pagar: ${totalReserva}</span><br />
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
                            {/* <form method="POST" action={url} >
                                <input name="token_ws" ></input>

                            </form> */}
                            <form id="webpay-form"  action={url} method="post" id="form">
                                <input type="hidden" name="token_ws" value={token} />
                                <input type="submit"  value="Enviar" />
                            </form>
                            <script>document.getElementById("webpay-form").submit();</script>
                            <Button onClick={() =>  realizarPagoweb()} type="primary" hidden shape="round" className="mt-2 text-center" size={'large'}>
                                Pagar webpay
        </Button>
                        </Card>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default TotalReserva;