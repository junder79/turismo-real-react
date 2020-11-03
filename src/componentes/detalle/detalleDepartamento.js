import React, { useContext, useEffect, useState } from 'react';
import { Button, Descriptions, Card, Avatar, Row, Col, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faBed, faTv, faThermometerFull,faChair, faFan , faMapMarkerAlt, faSink , faArrowLeft,faCalendarCheck} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { DownloadOutlined, SmileOutlined } from '@ant-design/icons';
import swal from 'sweetalert'
import Cookies from 'universal-cookie';
import { DataContext } from '../context/reserva-context';

const { Meta } = Card;

function DetalleDepartamento() {
    let params = useParams();
    const cookies = new Cookies();
    cookies.set('idDepart', params.id, { path: '/' });
    cookies.set('idComuna', 345, { path: '/' });
    const estadoInicioS = cookies.get('estadoSesion');
    const idDepartamento = cookies.get('idDepart');
    const idRegion = 16;


    const history = useHistory();
    const { setRegion, checkOut, checkIn, cantDia } = useContext(DataContext);
    const [detalleDepartImages, setDetalleDepartamentoImages] = useState([]);
    const [detalleDepart, setDetalleDepartamento] = useState([]);
    const [detalleDepartAcondicionado, setDetalleDepartamentoAcondicionado] = useState([]);
    useEffect(() => {

        getDetalleDepartamentoImagen();
        getDetalleDepartamento();
        getDetalleAcondicionado();

    }, [])

    setRegion(idRegion);

    const [estadoCargado, setCargado] = useState(false);
    const getDetalleDepartamentoImagen = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/departamentoimagen/${idDepartamento}`
        }).then(res => {
            setCargado(true);
            console.log(res.data);
            setDetalleDepartamentoImages(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    const getDetalleDepartamento = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/getInfodepartamento/${idDepartamento}`
        }).then(res => {
            setCargado(true);
            console.log("valor DEPARTAMENTO" + res.data[0].VALORDEPARTAMENTO * cantDia);
            setDetalleDepartamento(res.data);

            cookies.set('departNombre', res.data[0].NOMBRED, { path: '/' });
            cookies.set('departLugar', res.data[0].DIRECCIOND, { path: '/' });
            cookies.set('valorDepart', res.data[0].VALORDEPARTAMENTO, { path: '/' });



        }).catch(err => {
            console.log(err);
        })
    }

    const getDetalleAcondicionado = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/getInfoacondicionado/${idDepartamento}`
        }).then(res => {

            console.log(res.data);
            setDetalleDepartamentoAcondicionado(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const agendarReserva = () => {
        swal({
            title: "¿Deseas realizar la reserva?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log("estado" + estadoInicioS);
                    if (estadoInicioS === 'false') {
                        notification.open({
                            message: 'Inicio de Sesión',
                            description:
                                'Para poder agendar, deberás acceder con tu cuenta.',
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                        let path = '/clie/login';
                        history.push(path);

                    } else {
                        let path = '/clie/tours';
                        history.push(path);

                    }
                } else {

                    let path = '/clie/inicio';
                    history.push(path);


                }
            });

    }
    const goBack = () => {
        history.push('/clie/inicio');
    }
    return (

        <div style={{ backgroundColor: '#EEEEEE', height: '100%' }}>
            <div className="container">
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
                                <Carousel>
                                    {

                                        detalleDepartImages.map((elemento, i) => (
                                            <div>
                                                <img src={elemento.RUTAIMAGEN} />

                                            </div>
                                        ))
                                    }
                                </Carousel>
                        }
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 mt-2">
                        <Card style={{ borderRadius: 30 }} className="shadow">
                            {

                                detalleDepart.map((elemento, i) => (
                                    <>
                                        <span className="texto-calistoga">Conoce un poco más a {elemento.NOMBRED} </span>
                                        <p>{elemento.DESCRIPCIOND}</p>
                                        <hr></hr>

                                        <span className="texto-calistoga">El alojamiento ofrece</span>
                                        <div className="site-card-wrapper">
                                            <div className="row">
                                                {
                                                    detalleDepartAcondicionado.map((elemento, i) => (
                                                       
                                                        <div className="col-4 text-center mb-1 mt-1">
                                                            {


                                                                elemento.NOMBREACONDI == 'Internet' ? <FontAwesomeIcon  size="lg" className="shadow rounded" style={{ color: '#311b92'}} icon={faWifi} ></FontAwesomeIcon>
                                                                    : elemento.NOMBREACONDI == 'Cable' ? <FontAwesomeIcon  size="lg" className="shadow rounded" style={{ color: '#311b92'}} icon={faTv} ></FontAwesomeIcon>
                                                                    : elemento.NOMBREACONDI == 'Calefaccion' ? <FontAwesomeIcon size="lg" className="shadow rounded"  style={{ color: '#311b92'}} icon={faThermometerFull} ></FontAwesomeIcon>
                                                                    : elemento.NOMBREACONDI == 'Amoblado' ? <FontAwesomeIcon size="lg" className="shadow rounded"  style={{ color: '#311b92'}} icon={faChair} ></FontAwesomeIcon>
                                                                    : elemento.NOMBREACONDI == 'Aire Acondicionado' ? <FontAwesomeIcon size="lg" className="shadow rounded"  style={{ color: '#311b92'}} icon={faFan} ></FontAwesomeIcon>
                                                                        : elemento.NOMBREACONDI
                                                            }
                                                        </div>

                                                    ))
                                                }
                                            </div>



                                        </div>
                                        <hr></hr>
                                        <Row>
                                            <span className="texto-calistoga"><FontAwesomeIcon icon={faBed} className="mr-2 shadow"  ></FontAwesomeIcon>Habitaciones: <strong>{elemento.CANTIDAD_H}</strong></span>

                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <span className="texto-calistoga"><FontAwesomeIcon icon={faSink} className="mr-2 shadow"></FontAwesomeIcon>Baños: <strong>{elemento.CANTIDAD_B}</strong></span>

                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <span className="texto-calistoga"> <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" ></FontAwesomeIcon>Lugar: </span><br></br>
                                           
                                            <strong>{elemento.DIRECCIOND}</strong>
                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <span className="texto-calistoga">Valor por día</span><br></br>
                                            <p>${elemento.VALORDEPARTAMENTO}</p>
                                        </Row>
                                    </>
                                ))
                            }

                            <Button style={{ backgroundColor: '#311b92', color: 'white' }} onClick={agendarReserva} className="mt-2" shape="round" icon={<FontAwesomeIcon className="mr-2" icon={faCalendarCheck}></FontAwesomeIcon>}  size={'large'}>
                                Reservar Ahora
</Button>
                            <Button style={{ backgroundColor: '#311b92', color: 'white' }} onClick={goBack} className="mt-2" shape="round" icon={<FontAwesomeIcon className="mr-2" icon={faArrowLeft}></FontAwesomeIcon>} size={'large'}>
                                Regresar
</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleDepartamento;