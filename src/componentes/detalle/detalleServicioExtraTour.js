import React from 'react';
import { Button } from 'antd';
import { useHistory } from "react-router-dom";

function ServicioExtraTour(){
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleTransporte';
        history.push(path);
    }
    return(
        <div className="container">
            <h1>Tour Disponbiles en tu ZONA</h1>
            <Button onClick={redireccionRuta} type="primary">Omitir</Button>
        </div>
    )
}

export default ServicioExtraTour;