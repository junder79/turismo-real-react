import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
function ModalAgregarDepartamento(objeto) {

    const [datosForm, setDatosForm] = useState({
        nombre: '',
        descripcion: '',
        direccion: '',
        valor: '',
        picture: ''
    });

    // Detectar los cambios realizados en los input 
    const { register, errors, handleSubmit } = useForm();


    // Enviar Formulario a POST junto a la imagen

    const onSubmit = (data) => {

        const formData = new FormData()
        formData.append("picture", data.picture[0])
        console.log(data);
        axios.post('http://localhost:3001/agregarDepartamentos', formData)
            .then(response => {
                // Guardo la respuesta del parametro de salida del sp
                console.log("Respuesta" + JSON.stringify(response));
            })
            .catch(err => console.warn(err));

    }


    return (
        <Modal isOpen={objeto.modalAgregar}>
            <ModalHeader >Agregar Departamento</ModalHeader>
            <ModalBody>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="row">
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="nombre" placeholder="Nombre Departamento"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="descripcion" placeholder="Descripcion "></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="direccion" placeholder="Direccion"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="valor" placeholder="Valor Departamento"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <label for="exampleFormControlFile1">Elegir Imagen</label>
                                <input type="file" ref={register({ required: true })} className="form-control-file btn btn-primary" name="picture" id="exampleFormControlFile1"></input>
                            </div>
                        </div>
                        <Button type="submit" className="mt-2" color="primary">Agregar</Button>{' '}
                    </form>
                </div>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>
    )
}
export default ModalAgregarDepartamento;