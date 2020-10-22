import React from 'react';
import { Button } from 'antd';
import { useHistory } from "react-router-dom";
function DetalleReservaC () {
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleHuespedes';
        history.push(path);
    }
    return (
        <div className="container">
            <Button onClick={redireccionRuta} type="primary">Reservaré</Button>
        </div>
    )
}

export default DetalleReservaC;