import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,

    Link,
 } from "react-router-dom";
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


    return (
        <div className="container">
            <p className="titulo-componentes">Tours</p>
            {
                !dataT ?
                    <div className="text-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>     
                        </div>
                      
                    </div> :
                    tours.map((elemento, i) => (


                        <div className="card" style={{ borderRadius: 50 }}>
                            <img style={{ borderRadius: 50, width: '100%', height: '50vh' }} src="http://localhost:3001/imagenes13136c8506f89055fd05ec441855f8af9431c966.jpg" className="card-img-top img-responsive" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{elemento.LUGARTOUR}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to={`/tour/${elemento.IDDETATOUR}`} className=" btn btn-outline-success btn-sm">Ver más</Link>
                            </div>
                        </div>

                    ))
            }
        </div>
    )
}

export default Tours;