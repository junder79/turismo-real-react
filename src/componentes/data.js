import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import ModalNuevoUsuario from './modalAgregarUsuario';
import swal from 'sweetalert';
function GetUsuarios() {
    const [dataUsuarios, setDataUsuario] = useState([]);
    const [dataU, setDataU] = useState(false);
    useEffect(() => {

        getUsuarios();

    }, [])

    const getUsuarios = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/usuarios'
        }).then(res => {
            console.log(res);
            setDataUsuario(res.data);
            setDataU(true);
        }).catch(err => {
            console.log(err);
        })
    }

    // Controlar el modal 
    const [modalEditar, setModalEditar] = useState(false);

    // Controlar Usuario Seleccionado 
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({

        IDUSUARIO: '',
        NOMBREUSUARIO: '',
        APELLIDOUSUARIO: '',
        CONTRASENAUSUARIO: '',
        CORREOUSUARIO: '',
        TELEFONOUSUARIO: '',
        TIPOUSUARIO_IDTIPOUSUARIO: '',
        RUTUSUARIO: ''

    })

    // Funcion para seleccionar el usuario seleccionado y pode realizar dicha accion modificar o eliminar

    const seleccionarUsuario = (usuarioElemento, caso) => {
        setUsuarioSeleccionado(usuarioElemento);
        (caso === 'Editar') && setModalEditar(true);
    }

    const [modalAgregarUsuario, setModalAgregarUsuario] = useState(false);

    // Funcion para capturar los datos que está escribiendo el usuario
    const capturaFormularioEdit = e => {
        const { name, value } = e.target;
        setUsuarioSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(usuarioSeleccionado);
    }
    // Funcion para enviar datos por POST al modificar usuario
    const enviarUsuarioModificado = () => {
        console.log("DATOS " + JSON.stringify(usuarioSeleccionado));
        console.log(usuarioSeleccionado);
        axios.post('http://localhost:3001/api/updateUsuario', usuarioSeleccionado)
            .then(response => response.status)
            .catch(err => console.warn(err));

    }

    // Funcion POST para eliminar el usuario 

    const eliminarUsuario = (elemento) => {
        swal({
            title: "¿Deseas Eliminar este Usuario?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('http://localhost:3001/api/eliminarUsuario', elemento)
                        .then(response => {

                            var respuestaServidor = response.data;
                            if (respuestaServidor == 1) {
                                swal("Usuario Eliminado Correctamente", {
                                    icon: "success",
                                });
                                getUsuarios();
                                // Refresh Tabla

                            } else {
                                swal("Error al eliminar Usuario", {
                                    icon: "error",
                                });
                            }

                        })
                        .catch(err => console.warn(err));

                } else {

                }
            });

    }
    return (
        <div className="container">

            <div className="table-responsive">
                <p className="titulo-componentes">Usuarios Turimos Real</p>
                <Button className="btn btn-success mb-2" onClick={() => setModalAgregarUsuario(true)}>Agregar Usuario</Button>
                {
                    !dataU ?
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <table className="table-bordered table table-striped formato-tabla">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre Usuario</th>
                                    <th>Apellido Usuario</th>
                                    <th>Correo Usuario</th>
                                    <th>Telefono Usuario</th>
                                    <th>Tipo Usuario</th>
                                    <th>RUT Usuario</th>
                                    <th>Acción</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataUsuarios.map((elemento, i) => (
                                        <tr key={i}>
                                            <td>{elemento.IDUSUARIO}</td>
                                            <td>{elemento.NOMBREUSUARIO}</td>
                                            <td>{elemento.APELLIDOUSUARIO}</td>
                                            <td>{elemento.CORREOUSUARIO}</td>
                                            <td>{elemento.TELEFONOUSUARIO}</td>
                                            <td>{elemento.TIPOUSUARIO_IDTIPOUSUARIO}</td>
                                            <td>{elemento.RUTUSUARIO}</td>
                                            <td><button className="btn btn-primary" onClick={() => seleccionarUsuario(elemento, 'Editar')}>Editar</button></td>
                                            <td><button className="btn btn-danger" onClick={() => eliminarUsuario(elemento)}>Eliminar</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }

            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader >Editar Usuarios</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <label>ID</label>
                            <input readOnly name="IDUSUARIO" className="form-control" value={usuarioSeleccionado.IDUSUARIO}></input>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Nombre de Usuario</label>
                            <input onChange={capturaFormularioEdit} name="NOMBREUSUARIO" className="form-control" type="text" value={usuarioSeleccionado.NOMBREUSUARIO}></input>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Apellido</label>
                            <input onChange={capturaFormularioEdit} name="APELLIDOUSUARIO" className="form-control" type="text" value={usuarioSeleccionado.APELLIDOUSUARIO}></input>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Correo</label>
                            <input onChange={capturaFormularioEdit} name="CORREOUSUARIO" className="form-control" type="text" value={usuarioSeleccionado.CORREOUSUARIO}></input>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Telefono</label>
                            <input onChange={capturaFormularioEdit} name="TELEFONOUSUARIO" className="form-control" type="text" value={usuarioSeleccionado.TELEFONOUSUARIO}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => (enviarUsuarioModificado())}>Guardar Cambios</Button>{' '}
                    <Button color="secondary" onClick={() => (setModalEditar(false))} >Cerrar</Button>
                </ModalFooter>
            </Modal>
            <ModalNuevoUsuario setModalNuevoUsuario={setModalAgregarUsuario} ModalNuevoUsuario={modalAgregarUsuario} getUsuarios = {getUsuarios} />
        </div>


    )
}

export default GetUsuarios;