import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Descriptions, Radio, Button, Card, Avatar } from 'antd';
const { Meta } = Card;
function DetalleTour() {
    let params = useParams();

    let lugar = params.lugar;
    let valor = params.valor;
    let comuna = params.comuna;
    let horario = params.horario;
    let descripcion = params.descripcion;
    let region = params.region;
    const [detalleT, setDetalleT] = useState([]);
    useEffect(() => {

        getDetalleTour();

    }, [])

    const [estadoCargado, setCargado] = useState(false);
    const getDetalleTour = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/detalleTour/${params.tourId}`
        }).then(res => {
            setCargado(true);
            console.log(res.data);
            setDetalleT(res.data);

        }).catch(err => {
            console.log(err);
        })
    }
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
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
                <div className="col-6">
                    <Descriptions
                        bordered
                        title="Detalles de Tour"
                        size={'default'}

                    >
                        <Descriptions.Item label="Lugar">{lugar}</Descriptions.Item>
                        <Descriptions.Item label="Comuna">{comuna}</Descriptions.Item>
                        <Descriptions.Item label="Horario">{horario}</Descriptions.Item>
                        <Descriptions.Item label="Valor">{valor}</Descriptions.Item>
                        <Descriptions.Item label="Region">{region}</Descriptions.Item>
                        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                        <Descriptions.Item label="Descripción">
                            {descripcion}

                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        </div>
    )
}

export default DetalleTour;