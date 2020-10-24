import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Card, Avatar, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faMugHot, faTv } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { DownloadOutlined } from '@ant-design/icons';
const { Meta } = Card;
function DetalleReservaC() {
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleHuespedes';
        history.push(path);
    }
    // let params = useParams();

    // let lugar = params.lugar;
    // let valor = params.valor;
    // let comuna = params.comuna;
    // let horario = params.horario;
    // let descripcion = params.descripcion;
    // let region = params.region;
    const [detalleT, setDetalleT] = useState([]);
    useEffect(() => {

        getDetalleTour();

    }, [])

    const [estadoCargado, setCargado] = useState(false);
    const getDetalleTour = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/detalleTour/18`
        }).then(res => {
            setCargado(true);
            console.log(res.data);
            setDetalleT(res.data);

        }).catch(err => {
            console.log(err);
        })
    }

    const agendarReserva = () => {
        let path = 'detalleHuespedes';
        history.push(path);
    }
    return (
        // <div className="container">
        //     <Button onClick={redireccionRuta} type="primary">Reservaré</Button>
        // </div>
        <div style={{ backgroundColor: '#EEEEEE', height:'100%' }}>
            <div className="container">


                <div className="row">
                    <div className="col-6 mt-2">
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

                                        detalleT.map((elemento, i) => (
                                            <div>
                                                <img src={elemento.IMAGEN} />

                                            </div>
                                        ))
                                    }


                                </Carousel>





                        }
                    </div>
                    <div className="col-6 mt-2">
                        <Card style={{ borderRadius: 30 }}>
                            <span className="texto-calistoga">Conoce un poco más</span>
                            <p>  Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
                 cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
                            <hr></hr>

                            <span className="texto-calistoga">El alojamiento ofrece</span>
                            <div className="site-card-wrapper">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card title={<FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>} bordered={false}>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title={<FontAwesomeIcon icon={faMugHot}></FontAwesomeIcon>} bordered={false}>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title={<FontAwesomeIcon icon={faTv}></FontAwesomeIcon>} bordered={false}>
                                        </Card>
                                    </Col>

                                </Row>
                            </div>

                            <Row>
                                <span className="texto-calistoga">Cant. Habitaciones: <strong>5</strong></span>

                            </Row>
                            <Row>
                                <span className="texto-calistoga">Lugar</span>
                                <p>  Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
                 cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
                            </Row>
                            <Button style={{ backgroundColor: '#311b92', color: 'white' }} onClick={agendarReserva} className="mt-2" shape="round" icon={<DownloadOutlined />} size={'large'}>
                                Reservar Ahora
</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleReservaC;