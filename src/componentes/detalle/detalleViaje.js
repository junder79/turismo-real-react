import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faBed, faTv, faThermometerFull, faChair, faFan, faMapMarkerAlt, faSink, faArrowLeft, faCalendarCheck,faCalendarDay,faClock } from "@fortawesome/free-solid-svg-icons";
import { Button, Descriptions, Card, Avatar, Row, Col, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getElementError } from '@testing-library/react';
const { Meta } = Card;
function DetalleViaje() {
    let params = useParams();
    const idReserva = params.idreserva;
    console.log("RESERVA" + idReserva);
    const [reserva, setReserva] = useState([]);
    const [transporte, setTransporte] = useState([]);
    const [transporteCant, setTransporteCant] = useState('');
    const [tour, setTour] = useState([]);
    const [tourCant, setTourCant] = useState('');
    const [imagenDepart, setImagenDepart] = useState([]);
    const [estadoCargado, setEstadoCargado] = useState(false);

    useEffect(() => {

        getToursAgendados();
        getReservaEspecifica();
        getTransporteAgendado();
    }, [])

    const getDetalleDepartamentoImagen = (idDepartamento) => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/departamentoimagen/${idDepartamento}`
        }).then(res => {

            console.log(res.data);
            setImagenDepart(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getReservaEspecifica = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/reservaespecifica/${idReserva}`
        }).then(res => {

            console.log(res.data);
            setReserva(res.data);
            setEstadoCargado(true);
            getDetalleDepartamentoImagen(res.data[0].DEPARTAMENTO_IDDEPARTAMENTO);

        }).catch(err => {
            console.log(err);
        })
    }

    const getToursAgendados = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/tourreserva/${idReserva}`
        }).then(res => {

            console.log("DATOS TOUR" +JSON.stringify( res.data));
            const cantidadFilas = res.data.length;
            if (cantidadFilas > 0) {
                setTour(res.data);
                setTourCant(1);
            } else {
                setTourCant(0)
            }



        }).catch(err => {
            console.log(err);
        })
    }

    const getTransporteAgendado = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/transportereserva/${idReserva}`
        }).then(res => {


            console.log("DATOS Transporte" + res.data.length);

            const cantidadFilas = res.data.length;
            if (cantidadFilas > 0) {
                setTransporte(res.data)
                setTransporteCant(1);
            } else {
                setTourCant(0)
            }


        }).catch(err => {
            console.log(err);
        })
    }
    const getDaysDiff = (start_date, end_date, date_format = 'YYYY/MM/DD') => {
        const getDateAsArray = (date) => {
            return moment(date.split(/\D+/), date_format);
        }
        return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
    }
    return (
        <div className="container">
            <span>detalle del viaje</span>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 mt-2">
                    {
                        !estadoCargado ?
                            <Card style={{ width: '100%', marginTop: 16 }} loading={true}>
                                <Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card> :
                            <>
                                <Carousel>
                                    {

                                        imagenDepart.map((elemento, i) => (
                                            <div>
                                                <img src={elemento.RUTAIMAGEN} />

                                            </div>
                                        ))
                                    }
                                </Carousel>
                                {
                                    reserva.map((elemento, i) => (
                                        <Card style={{ backgroundColor: '#FFFFFF', borderRadius: 30 }} className="shadow">
                                            <h5 className="titulo-detalle">Detalle de tu Reserva</h5>
                                            <Descriptions title="" layout="vertical" bordered>
                                                <Descriptions.Item label="Departamento">{elemento.NOMBRED}</Descriptions.Item>
                                                <Descriptions.Item label="Lugar">{elemento.NOMBRED}</Descriptions.Item>
                                                <Descriptions.Item label="Cantidad de Días">{getDaysDiff(elemento.FECHAINICIORESERVA, elemento.FECHATERMINORESERVA)}</Descriptions.Item>
                                                <Descriptions.Item label="Check In">{elemento.FECHAINICIORESERVA}</Descriptions.Item>
                                                <Descriptions.Item label="Check Out" span={2}>
                                                    {elemento.FECHATERMINORESERVA}
                                                </Descriptions.Item>

                                                <Descriptions.Item label="Servicios Extras">
                                                    {
                                                        tourCant == 1 ?

                                                            <>
                                                                <br></br>
                                                                <span>Detalle del Tour: </span><br></br>
                                                                {
                                                                    tour.map((elemento, i) => (
                                                                        <>
                                                                            <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon><span className="ml-2">{elemento.LUGARTOUR}</span>
                                                                        </>
                                                                    ))
                                                                }
                                                            </>
                                                            :
                                                            null
                                                    }
                                                    <br />
                                                    {
                                                        transporteCant == 1 ?

                                                            <>
                                                                <br></br>
                                                                <span>Detalle Transporte: </span><br></br>
                                                                {
                                                                    transporte.map((elemento, i) => (
                                                                        <>
                                                                            <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon><span className="ml-2">{elemento.DIRECCION}</span><br></br>
                                                                            <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon><span className="ml-2">{elemento.FECHASERVICIO}</span><br></br>
                                                                            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon><span className="ml-2">{elemento.HORARIO}</span>
                                                                        </>
                                                                    ))
                                                                }
                                                            </> :
                                                            null
                                                    }
                                                </Descriptions.Item>
                                            </Descriptions>

                                            {/* <Button disabled={btnAgregarReserva} onClick={() => realizarPago()} type="primary" shape="round" className="mt-2 text-center" size={'large'}>
                                                Pagar Ahora
            </Button> */}
                                        </Card>
                                    ))
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
export default DetalleViaje;