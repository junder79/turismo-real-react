import React from 'react';
import { Button } from 'antd';
import { useHistory } from "react-router-dom";

function ServicioExtraTransporte(){
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleTotal';
        history.push(path);
    }
    return(
        <div className="container">
            <h1>Transportes Disponinbles en tu Zona</h1>
            <Button onClick={redireccionRuta} type="primary">Pagar</Button>
        </div>
    )
}

export default ServicioExtraTransporte;