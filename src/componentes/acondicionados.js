import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Acondicionados() {

    // Realizar Peticion para la lista de acondicionados

    const [dataAcondicionados, setDataAcondicionados] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/getAcondicionados'
        }).then(res => {
            console.log(res);
            setDataAcondicionados(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <div className="container">
           <p  className="titulo-componentes">Acondicionados</p>
            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Acondicionado</th>
                        <th>Valor Acondicionado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataAcondicionados.map((elemento, i) => (
                            <tr key={i}>
                                <td>{elemento.IDACONDICIONADO}</td>
                                <td>{elemento.NOMBREACONDICIONADO}</td>
                                <td>${elemento.VALORACONDICIONADO}</td>
                             
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Acondicionados;