import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, Avatar,Result } from 'antd';
import { useHistory } from "react-router-dom";
import { DataContext } from '../context/reserva-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Cookies from 'universal-cookie';
import ModalAgregarTransporte from '../modal/modalTransporte';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle'
function ServicioExtraTransporte() {
    const history = useHistory();
    const cookies = new Cookies();
    const { Meta } = Card;

    const { departamento, setTransporteSeleccionado } = useContext(DataContext);
    const [mapTransporte, setMapTransporte] = useState([]);
    const [idTransporte, setIdTransporte] = useState('');
    const [direccionTransporte, setDireccionTransporte] = useState('');
    const [cantidadFilas, setCantidadFilas] = useState('');
    const [estadoCargado, setEstadoCargado] = useState(false);
    const comuna = cookies.get('idComuna');
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    useEffect(() => {

        getTransporteZona();

    }, [])
    const getTransporteZona = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/getTransporte/${comuna}`
        }).then(res => {

            setCantidadFilas(res.data.length);
            console.log("Cantidad" + res.data.length);
            setEstadoCargado(true);
            if (res.data.length > 0) {
                setMapTransporte(res.data);
                setIdTransporte(res.data[0].ID);
                setDireccionTransporte(res.data[0].DIRECCION);

            }

        }).catch(err => {
            console.log(err);
        })
    }

    const redireccionTotal = (idVehiculo) => {
        setTransporteSeleccionado(idVehiculo);
        // let path = '/total';
        // history.push(path);
        window.location.href = "/total";
    }

    const [estadoModalTransp, setEstadoModalTran] = useState(false);
    const showModal = () => {
        setEstadoModalTran(true);

    };
    const omitir = () => {
        cookies.set('estadoTransporte', 0, { path: '/' });
        history.push('/total');
    }
    return (
        <div className="container">
            <ModalAgregarTransporte estadoModalTransp={estadoModalTransp} direccionTransporte={direccionTransporte} idTransporte={idTransporte} setEstadoModalTran={setEstadoModalTran} redireccionTotal={redireccionTotal} ></ModalAgregarTransporte>

            <div className="row">
                <div className="col-12">
                    <h1 className="titulo-componentes">Transportes</h1>
                </div>
                <div className="col-12 ">
                    <h7 className="subtitulo-componentes mt-2">La mejor manera de ir y volver a tu departamento en tu viaje es mediante los traslados que tenemos para tí</h7>
                </div>
            </div>

            <Button className="mt-2" style={{ backgroundColor: '#461CE2', color: 'white' }} shape="round" onClick={omitir} size={'large'} >Omitir <FontAwesomeIcon className="ml-2" icon={faChevronCircleRight}></FontAwesomeIcon></Button>


            <div className="container">

                {

                    !estadoCargado ?
                        <Card style={{ width: '100%', marginTop: 16, borderRadius: 30 }} loading={true}>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Card> :
                        <>
                            {
                                cantidadFilas == 0 ?
                                    <Card
                                        className="ml-4 mr-4 mb-4 mt-4 shadow "
                                        hoverable

                                        style={{ borderRadius: 30 }}

                                    >

                                        <Result
                                            icon={<div className="d-flex justify-content-center"><UseAnimations strokeColor={'#512da8'} animation={alertCircle} size={120}></UseAnimations></div>}
                                            title=""
                                            extra={<span className="texto-no-disponible">Ups! no tenemos servicios disponibles en la ubicación deseada.</span>}
                                        />
                                    </Card>
                                    :
                                    <Carousel responsive={responsive}>
                                        {
                                            mapTransporte.map((elemento, i) => (
                                                <div >
                                                    <Card
                                                        className="ml-4 mr-4 mb-4 mt-4 shadow "
                                                        hoverable
                                                        onClick={showModal}
                                                        style={{ borderRadius: 30 }}
                                                        cover={<img alt="example" style={{ borderRadius: 30 }} src="https://image.freepik.com/free-vector/flat-color-location-icon-paper-map_52465-148.jpg" />}
                                                    >

                                                        <Card style={{ borderRadius: 30, width: '100%', backgroundColor: '#461CE2', color: 'white' }}>
                                                            <span className="titulo-card">Valor: ${elemento.VALOR}</span><br></br>
                                                            <span className="titulo-card">Direccion: {elemento.DIRECCION}</span><br></br>

                                                        </Card>
                                                    </Card>
                                                </div>
                                            ))
                                        }


                                    </Carousel>
                            }
                        </>
                }


            </div>

        </div>
    )
}

export default ServicioExtraTransporte;