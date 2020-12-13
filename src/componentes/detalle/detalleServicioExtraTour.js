import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Avatar, Result } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faDollarSign, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle'
const { Meta } = Card;
function ServicioExtraTour() {
    const history = useHistory();
    const cookies = new Cookies();
    const comuna = cookies.get('idComuna');
    const [mapTour, setMapTour] = useState([]);
    const [estadoCargaT, setEstadoCargaT] = useState(false);
    const [cantidadFilas, setCantidadFilas] = useState('');
    useEffect(() => {

        getToursZona();

    }, [])
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
    const getToursZona = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/getTours/${comuna}`
        }).then(res => {
            setEstadoCargaT(true);
            console.log("Detalle Tour" + JSON.stringify(res.data));
            console.log("Filas " + JSON.stringify(res.data.length));
            setCantidadFilas(res.data.length);
            if (res.data.length > 0) {
                setMapTour(res.data);

            }

        }).catch(err => {
            console.log(err);
        })
    }
    const omitir = () => {
        cookies.set('estadoTour', 0, { path: '/' });
        history.push('/detalleTransporte');
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="titulo-componentes">Tours</h1>
                </div>
                <div className="col-12 ">
                    <h7 className="subtitulo-componentes mt-2">Que estarán cerca de tu zona de hospedaje</h7>
                </div>
            </div>

            <Button className="mt-2" style={{ backgroundColor: '#461CE2', color: 'white' }} shape="round" onClick={omitir} size={'large'} >Omitir <FontAwesomeIcon className="ml-2" icon={faChevronCircleRight}></FontAwesomeIcon></Button>
            <div className="container">

                {
                    !estadoCargaT ?
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
                                            mapTour.map((elemento, i) => (
                                                <Link to={`tours/${elemento.IDDETATOUR}`}>
                                                    <Card
                                                        className="ml-4 mr-4 mb-4 mt-4 shadow "
                                                        hoverable
                                                        style={{ borderRadius: 30 }}
                                                        cover={<img alt="example" style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }} src={elemento.IMAGEN} />}
                                                    >
                                                        {/* <Meta title={elemento.LUGARTOUR} description={elemento.VALORTOUR} /> */}


                                                        <div className="row">
                                                            <div className="col-6">
                                                                <span className="contenido-card"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" color={'#311b92'}></FontAwesomeIcon>{elemento.LUGARTOUR} </span><br></br>
                                                                <span className="contenido-card"><FontAwesomeIcon icon={faDollarSign} className="mr-2" color={'#311b92'}></FontAwesomeIcon>{elemento.VALORTOUR} </span>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div class="col-sm-12 border-left">{elemento.DESCRIPCIONTOUR}</div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </Card>
                                                </Link>
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

export default ServicioExtraTour;