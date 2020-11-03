import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Link,} from "react-router-dom";
import { Skeleton, Switch, Card, Avatar, Button, Row, Col, } from 'antd';
import ModalAgregarTour from './modal/modalAgregarTour';
const { Meta } = Card;
function Tours() {

    useEffect(() => {
        getToursDisponibles();
    }, [])

    const [tours, setTours] = useState([]);
    const [dataT, setDataT] = useState(false);

    const getToursDisponibles = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/getTours'
        }).then(res => {
            console.log(res);
            setTours(res.data);
            setDataT(true);
        }).catch(err => {
            console.log(err);
        })
    }
    // Estado del Modal
    const [estadoModalTour, setEstado] = useState(false); 

    return (
        <div className="container">

            <p className="titulo-componentes">Tours</p>
            <ModalAgregarTour estadoModalTour = {estadoModalTour} setEstado={setEstado} ></ModalAgregarTour>
           
            <Row>
                {
                    !dataT ?
                        <Card style={{ width: '100%', marginTop: 16 }} loading={true}>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Card> :

                        tours.map((elemento, i) => (


                            <div>



                                <Col span={6}><Card
                                    hoverable
                                    style={{ width: '18rem' }}
                                    className="ml-2"
                                    
                                >

                                    <Meta title={elemento.LUGARTOUR} />
                                    <Button type="primary" className="mt-2"><Link to={`/detalletour/${elemento.IDDETATOUR}/${elemento.LUGARTOUR}/${elemento.VALORTOUR}/${elemento.DESCRIPCIONTOUR}/${elemento.NOMBRECOMUNA}/${elemento.NOMBREREGION}/${elemento.HORARIOT}`}>Ver más</Link></Button>

                                </Card></Col>


                            </div>



                        ))
                }
            </Row>
        </div >
    )
}

export default Tours;