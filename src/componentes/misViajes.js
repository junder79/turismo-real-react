import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faArrowLeft, faMapMarkerAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Card, Avatar, Skeleton } from 'antd';

function MisViajes() {
    const { Meta } = Card;
    const cookies = new Cookies();
    const estadoLogin = cookies.get('estadoSesion');
    const idUsuario = cookies.get('idUsuario');
    const [misReservas, setMisReservas] = useState([]);
    const [cargadoReserva, setCargadoReserva] = useState(false);
    useEffect(() => {

        getReservasActivas();

    }, [])
    const getReservasActivas = () => {

        axios({
            method: 'GET',
            url: `http://localhost:3001/getReservas/${idUsuario}`
        }).then(res => {

            setCargadoReserva(true);
            setMisReservas(res.data);

        }).catch(err => {
            console.log(err);
        })
    }
    const click = () => {
        console.log("Click");
    }
    return (
        <div className="container">
            <h1 className="titulo-componentes">Mis Reservas</h1>
            <div className="row">
                {
                    !cargadoReserva ?
                        <Card style={{ width: '100%', marginTop: 16,borderRadius:30 , height:'100%' }} className="ml-2 mr-2" loading={true}>
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


                                misReservas.map((elemento, i) => (
                                    <div className="col-12 col-md-4  mt-2 mb-2">
                                        <Link to={`/clie/mireserva/${elemento.IDRESERVA}`}>
                                            <Card
                                                onClick={() => click()}
                                                hoverable
                                                className="shadow box"
                                                style={{ width: '100%', borderRadius: 30 }}
                                                cover={<img alt="example" style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }} src={elemento.RUTAIMAGEN} />}
                                            >

                                                <div className="row">
                                                    <div className="col-6">
                                                        <span className="contenido-card-viajes"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" color={'#311b92'}></FontAwesomeIcon>{elemento.NOMBRED} </span><br></br>
                                                        <span className="contenido-card-viajes"><FontAwesomeIcon icon={faCalendarCheck} className="mr-2" color={'#311b92'}></FontAwesomeIcon>Check In {elemento.FECHAINICIORESERVA}</span><br></br>
                                                        <span className="contenido-card-viajes"><FontAwesomeIcon icon={faCalendarCheck} className="mr-2" color={'#311b92'}></FontAwesomeIcon>Check Out {elemento.FECHATERMINORESERVA}</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="row">
                                                            <div class="col-sm-12 border-left">Estado: {elemento.ESTADORESERVA}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                ))


                            }
                        </>
                }
            </div>
        </div >
    )
}

export default MisViajes;