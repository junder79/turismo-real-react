import React, { useState, useEffect } from 'react';
// import { Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import ModalAgregarDepartamento from './modalAgregarDepartamento';
import { faTrashAlt, faExchangeAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import swal from 'sweetalert';
import { Button } from 'antd';
import ModalGalleryImagen from './modal/modalDetalleImagenes';
import ModalAcondicionados from './modal/modalAcondicionados';
function Departamentos() {
    const history = useHistory();

    useEffect(() => {
        getDepartamentos();
    }, [])



    // Manejo de Modal Abierto o cerrado
    const [modalAgregar, setModalAgregar] = useState(false);
    // Manejo de Modal de Galeria de Imageness
    const [estado, setEstado] = useState(false);
    // Manejo de Modal de Galeria de Acondicionados
    const [estadoAcond, setEstadoAcond] = useState(false);
    const [departamento, setDepartamento] = useState([]);
    const [dataD, setDataD] = useState(false);
    const redireccionRuta = () => {
        let path = 'acondicionado';
        history.push(path);
    }


    // Realizar Peticion que muestra los departamentos 
    const getDepartamentos = async => {
        axios({
            method: 'GET',
            url: 'http://satur.docn.us/api/getDepartamentos'
        }).then(res => {
            console.log(res);
            setDepartamento(res.data);
            setDataD(true);
        }).catch(err => {
            console.log(err);
        })
    }

    const cambiarEstado = (elemento) => {
        console.log("ID A ENTREGAR" + elemento.IDDEPARTAMENTO)
        swal({
            title: "¿Deseas cambiar el estado del departamento?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('http://satur.docn.us/api/eliminarDepartamento', elemento)
                        .then(response => {

                            var respuestaServidor = response.data;
                            if (respuestaServidor == 1) {
                                swal("Estado cambiado exitosamente", {
                                    icon: "success",
                                });
                                getDepartamentos();
                                // Refresh Tabla

                            } else {
                                swal("Error al cambiar estado Departamento", {
                                    icon: "error",
                                });
                            }

                        })
                        .catch(err => console.warn(err));

                } else {

                }
            });
    }

    // Rescatar las Imagenes
    const [imagenD, setImagenD] = useState([]);
    const [estadoCargaI, setEstadoCargaI] = useState(false);
    const abrirModalImagen = (idDepartamento) => {
        setEstado(true);
        axios({
            method: 'GET',
            url: `http://satur.docn.us/api/getImagesDepartament/${idDepartamento}`
        }).then(res => {
            console.log(res.data);
            setEstadoCargaI(true);
            setImagenD(res.data);

        }).catch(err => {
            console.log(err);
        })

    }

    // Rescatar los Acondicionados del departamento 

    const [estadoCargaA, setEstadoCargaA] = useState(false);
    const [acondicionadoSelect, acondicionadoSelected] = useState([]);
    const abrirModalAcondicionado = (idDepartamento) => {
        setEstadoAcond(true);
        axios({
            method: 'GET',
            url: `http://satur.docn.us/api/getAcondicionados/${idDepartamento}`
        }).then(res => {
            console.log(res.data);
            setEstadoCargaA(true);
            acondicionadoSelected(res.data);

        }).catch(err => {
            console.log(err);
        })

    }


    return (
        <div className="container">
            <p className="titulo-componentes">Departamentos</p>

            <Button onClick={redireccionRuta} className="primary">Acondicionados</Button>
            <ModalGalleryImagen estado={estado} imagenD={imagenD} setEstadoCargaI={setEstadoCargaI} setImagenD={setImagenD} estadoCargaI={estadoCargaI} setEstado={setEstado} ></ModalGalleryImagen>
            <ModalAcondicionados setEstadoAcond={setEstadoAcond} estadoAcond={estadoAcond} acondicionadoSelect={acondicionadoSelect} acondicionadoSelected={acondicionadoSelected} estadoCargaA={estadoCargaA} setEstadoCargaA={setEstadoCargaA}></ModalAcondicionados>
            <Button onClick={() => setModalAgregar(true)} className="primary ml-2">Agregar Departamentos</Button>
            <div className="table-responsive mt-2">
                {
                    !dataD ?
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <table className="table-bordered table table-striped formato-tabla">

                            <thead>
                                <tr>
                                    <th>Nombre D</th>
                                    <th>Descripcion</th>
                                    <th>Direccion</th>
                                    <th>Valor</th>
                                    <th>Cantidad Habitaciones</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                    <th>Acción</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departamento.map((elemento, i) => (
                                        <tr key={i}>
                                            <td>{elemento.NOMBRED}</td>
                                            <td>{elemento.DESCRIPCIOND}</td>
                                            <td>{elemento.DIRECCIOND}</td>
                                            <td>{elemento.VALORDEPARTAMENTO}</td>
                                            <td>{elemento.CANTIDADH}</td>
                                            <td>{elemento.ACTIVO}</td>
                                            <td><button className="btn btn-primary" onClick={() => abrirModalAcondicionado(elemento.IDDEPARTAMENTO)}>Acondicionados</button></td>
                                            <td><button className="btn btn-danger" onClick={() => abrirModalImagen(elemento.IDDEPARTAMENTO)}><FontAwesomeIcon icon={faImages}></FontAwesomeIcon></button></td>
                                            <td><button className="btn btn-danger" onClick={() => cambiarEstado(elemento)}><FontAwesomeIcon icon={faExchangeAlt}></FontAwesomeIcon></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }

            </div>
            <ModalAgregarDepartamento setModalAgregar={setModalAgregar} setDepartamento={setDepartamento} departamento={departamento} getDepartamentos={getDepartamentos} modalAgregar={modalAgregar} />

        </div>
    )
}

export default Departamentos;