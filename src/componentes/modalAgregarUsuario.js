
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

function ModalNuevoUsuario(objeto) {

    // console.log("ESTADO MODAL " + objeto.ModalNuevoUsuario);

    // Inicalizando los valores de los Input 

    const [datosForm , setDatoForm ] = useState({
        nombre:'',
        apellido:'',
        correo:'',
        telefono:'',
        run:'',
        tipousuario:''

});

    // Detectar los cambios realizados en los input 

    const handleInputChange  = (event) =>{
        setDatoForm({
            ... datosForm,
            [event.target.name]:event.target.value
        })
    }


    // Enviar los datos POST 
    const enviarFormulario = (event) => {
        event.preventDefault()
        console.log("DATOS A ENVIAR " + JSON.stringify(datosForm));
        axios.post('http://localhost:3001/agregarUsuario', datosForm)
        .then(response => {
            console.log(response);
        })
        .catch(err => console.warn(err));
    }
    useEffect(() => {


        
    }, [])


  
    return (
        <Modal isOpen={objeto.ModalNuevoUsuario}>
            <ModalHeader >Agregar Usuario</ModalHeader>
            <ModalBody>
                <div>
                    <form onSubmit={enviarFormulario}>
                        <div className="row">
                            <div className="col-12 mt-2">
                                <input type="text" className="form-control" onChange={handleInputChange} name="run" placeholder="RUN"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" className="form-control" onChange={handleInputChange} name="nombre" placeholder="Nombre"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" className="form-control" onChange={handleInputChange} name="apellido" placeholder="Apellido"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" className="form-control" onChange={handleInputChange} name="correo"  placeholder="Correo"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" className="form-control" onChange={handleInputChange} name="telefono" placeholder="Teléfono"></input>
                            </div>
                            <div className="col-12 mt-2">
                               <select name="tipousuario" className="form-control" onChange={handleInputChange}>
                                   <option value="1" >Administrador</option>
                                   <option value="2" >Funcionario</option>
                                   <option value="3" >Cliente</option>
                               </select>
                            </div>
                        </div>
                        <Button type="submit" className="mt-2" color="primary">Agregar</Button>{' '}
                    </form>
                </div>
            </ModalBody>
            <ModalFooter>
               
                <Button color="secondary" onClick={() => (objeto.setModalNuevoUsuario(false))}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalNuevoUsuario;