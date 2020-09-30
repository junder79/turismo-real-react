import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import ModalNuevoUsuario from './modalAgregarUsuario';
function GetUsuarios() {
    const [dataUsuarios, setDataUsuario] = useState([]);

    useEffect(() => {


        axios({
            method: 'GET',
            url: 'http://localhost:3001/usuarios'
        }).then(res => {
            console.log(res);
            setDataUsuario(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])


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
        axios.post('http://localhost:3001/updateUsuario', usuarioSeleccionado)
            .then(response => response.status)
            .catch(err => console.warn(err));

    }

    // Funcion POST para eliminar el usuario 

    const eliminarUsuario = (elemento) => {
        console.log("DATOS " + JSON.stringify(elemento));
        axios.post('http://localhost:3001/eliminarUsuario', elemento)
            .then(response => response.status)
            .catch(err => console.warn(err));
    }
    return (
        <div className="container">

            <div className="table-responsive">
                <p className="titulo-componentes">Usuarios Turimos Real</p>
                <Button className="btn btn-success mb-2" onClick={() => setModalAgregarUsuario(true)}>Agregar Usuario</Button>
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
            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader >Editar Usuarios</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group">
                            <label>ID</label>
                            <input readOnly name="IDUSUARIO" value={usuarioSeleccionado.IDUSUARIO}></input>
                        </div>
                        <div className="form-group">
                            <label>Nombre de Usuario</label>
                            <input onChange={capturaFormularioEdit} name="NOMBREUSUARIO" type="text" value={usuarioSeleccionado.NOMBREUSUARIO}></input>
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input onChange={capturaFormularioEdit} name="APELLIDOUSUARIO" type="text" value={usuarioSeleccionado.APELLIDOUSUARIO}></input>
                        </div>
                        <div className="form-group">
                            <label>Correo</label>
                            <input onChange={capturaFormularioEdit} name="CORREOUSUARIO" type="text" value={usuarioSeleccionado.CORREOUSUARIO}></input>
                        </div>
                        <div className="form-group">
                            <label>Telefono</label>
                            <input onChange={capturaFormularioEdit} name="TELEFONOUSUARIO" type="text" value={usuarioSeleccionado.TELEFONOUSUARIO}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => (enviarUsuarioModificado())}>Guardar Cambios</Button>{' '}
                    <Button color="secondary" onClick={() => (setModalEditar(false))} >Cerrar</Button>
                </ModalFooter>
            </Modal>
            <ModalNuevoUsuario setModalNuevoUsuario={setModalAgregarUsuario} ModalNuevoUsuario={modalAgregarUsuario} />
        </div>


    )
}

export default GetUsuarios;