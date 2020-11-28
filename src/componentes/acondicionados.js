import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Acondicionados() {

    // Realizar Peticion para la lista de acondicionados

    const [dataAcondicionados, setDataAcondicionados] = useState([]);
    const [dataA, setDataA] = useState(false);
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://satur.docn.us/api/getAcondicionados'
        }).then(res => {
            console.log(res);
            setDataAcondicionados(res.data);
            setDataA(true);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <div className="container">
            <p className="titulo-componentes">Acondicionados</p>
            {
                !dataA ?
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    : <table className="table table-bordered">

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
                                        <td>{elemento.IDACOND}</td>
                                        <td>{elemento.NOMBREACONDI}</td>
                                        <td>${elemento.VALORACOND}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    )

}

export default Acondicionados;