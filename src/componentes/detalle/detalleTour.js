import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
function DetalleTour() {
    let params = useParams();
    const [detalleT, setDetalleT] = useState([]);
    useEffect(() => {

        getDetalleTour();

    }, [])

    const getDetalleTour = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/detalleTour/${params.tourId}`
        }).then(res => {
            console.log(res);
            setDetalleT(res.data);
            // setDataT(true);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="container">
            <h1 className="titulo-componentes">Detalle {params.tourId}</h1>
            {
                detalleT.map((elemento, i) => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{elemento.LUGARTOUR}</Card.Title>
                            <Card.Text>
                                {elemento.DESCRIPCIONTOUR}
                            </Card.Text>
                           
                            <span>Region {elemento.NOMBREREGION}</span><br></br>
                            <span>Columna {elemento.NOMBRECOMUNA}</span><br></br>
                            <span>Valor ${elemento.VALORTOUR}</span><br></br>
                            
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
}

export default DetalleTour;