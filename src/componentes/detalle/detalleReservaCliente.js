import React, { useContext, useEffect, useState } from 'react';
import { Button, Descriptions, Card, Avatar, Row, Col, Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faArrowLeft, faMapMarkerAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { DownloadOutlined } from '@ant-design/icons';
import swal from 'sweetalert'
import Transportes from '../servicioTransporte';
import { DataContext } from '../context/reserva-context';
import Cookies from 'universal-cookie';
const { Meta } = Card;

function DetalleReservaC() {
    let params = useParams();
    const cookies = new Cookies();
    const idTour = params.id;
    const history = useHistory();
    const { departamento, setTourNombre, setValorTour } = useContext(DataContext);
    const redireccionRuta = () => {
        let path = 'detalleHuespedes';
        history.push(path);
    }
    const redirigirBack = () => {
        let path = `tours`;
        history.push(path);
    }


    const [detalleTImages, setDetalleTImages] = useState([]);
    const [detalleT, setDetalleT] = useState([]);
    const[lugarTour,setLugarT]=useState([]);
    
    useEffect(() => {

        getDetalleTour(setTourNombre, setValorTour);

    }, [])

    const [estadoCargado, setCargado] = useState(false);
    const getDetalleTour = (setTourNombre, setValorTour) => {
        axios({
            method: 'GET',
            url: `http://satur.docn.us/api/detalleTourImagen/${idTour}`
        }).then(res => {
            setCargado(true);
            console.log(res.data);
            setDetalleTImages(res.data);


        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'GET',
            url: `http://satur.docn.us/api/detalleTour/${idTour}`
        }).then(res => {

            console.log(res.data);
            setDetalleT(res.data);
            setTourNombre(res.data[0].LUGARTOUR)
            setValorTour(res.data[0].VALORTOUR);
            setLugarT(res.data[0].LUGARTOUR);

        }).catch(err => {
            console.log(err);
        })
    }

    const agendarReserva = () => {
        cookies.set('estadoTour', 1, { path: '/' });
        cookies.set('tourId', idTour, { path: '/' });
        cookies.set('lugarTour', lugarTour, { path: '/' });
        let path = '/detalleTransporte';
        history.push(path);
    }
    return (

        <div style={{ backgroundColor: '#EEEEEE', height: '100%' }}>
            <div className="container">

                <h1 className="titulo-componentes" >Tour</h1>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 mt-2">
                        {
                            !estadoCargado ?
                                <Card style={{ width: '100%', marginTop: 16 ,borderRadius: 30  }} loading={true}>
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

                                        detalleTImages.map((elemento, i) => (
                                            <div>
                                                <img src={elemento.IMAGEN} />

                                            </div>
                                        ))
                                    }


                                </Carousel>





                        }
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mt-2">
                        <Card style={{ borderRadius: 30 }} className="shadow">

                            <div className="site-card-wrapper">

                                {
                                    detalleT.map((elemento, i) => (
                                        <Descriptions title="Detalle del Tour" layout="vertical" bordered>
                                            <Descriptions.Item label="Lugar:" ><span className="contenido-table">{elemento.LUGARTOUR}</span></Descriptions.Item>
                                            <Descriptions.Item label="Valor:"><span className="contenido-table">${elemento.VALORTOUR}</span></Descriptions.Item>
                                            <Descriptions.Item label="Horario:"><span className="contenido-table">{elemento.HORARIOT}</span></Descriptions.Item>
                                            <Descriptions.Item label="Comuna:"><span className="contenido-table">{elemento.NOMBRECOMUNA}</span></Descriptions.Item>
                                            <Descriptions.Item label="Region:"><span className="contenido-table">{elemento.NOMBREREGION}</span></Descriptions.Item>
                                            <Descriptions.Item label="Estado:"> <span className="contenido-table"> Disponible</span></Descriptions.Item>
                                            <Descriptions.Item label="Descripción:">
                                                <span className="contenido-table"> {elemento.DESCRIPCIONTOUR}</span>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    ))
                                }


                            </div>


                            <div className="row mb-2 mt-2 text-center">
                                <Button style={{ backgroundColor: '#311b92', color: 'white' }} onClick={agendarReserva} className="mt-2" shape="round" icon={<FontAwesomeIcon className="mr-2" icon={faCalendarCheck}></FontAwesomeIcon>} size={'large'}>
                                    Agendar
</Button>
                                <Button style={{ backgroundColor: '#311b92', color: 'white' }} onClick={redirigirBack} className="mt-2" shape="round" icon={<FontAwesomeIcon className="mr-2" icon={faArrowLeft}></FontAwesomeIcon>} size={'large'}>
                                    Regresar
</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleReservaC;