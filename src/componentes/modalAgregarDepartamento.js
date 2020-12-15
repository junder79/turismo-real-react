import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
function ModalAgregarDepartamento(objeto) {

    // Traer los acondicionados , Regiones y comunas de la base de datos 

    const [acondicionado, setAcondicionados] = useState([]);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    // const [acondicionado, setAcondicionados] = useState([]);

    // Formulario con los acondicionados seleccionados en SELECY 

    const [acondicionadoSelect, setSelectAcondicionado] = useState([]);

    useEffect(() => {
        getAcondicionados();
        getRegiones();
    }, [])


    const [datosForm, setDatosForm] = useState({
        nombre: '',
        descripcion: '',
        direccion: '',
        valor: '',
        picture: ''
    });

    // Detectar los cambios realizados en los input 
    const { register, errors, handleSubmit } = useForm();




    const getAcondicionados = async => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/getAcondicionados'
        }).then(res => {
            console.log(res);
            setAcondicionados(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getRegiones = async => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/getRegiones'
        }).then(res => {
            console.log(res);
            setRegiones(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    const handleAddrTypeChange = (e) => {
        console.log(e.target.value);
        const regionId = e.target.value;
        axios({
            method: 'GET',
            url: "http://localhost:3001/api/getComuna/" + regionId + ""
        }).then(res => {
            console.log(res);
            setComunas(res.data);
        }).catch(err => {
            console.log(err);
        })
        // Enviar Peticion para traer las comunas de dicha region 

    }

    // Enviar Formulario a POST junto a la imagen
    const [btnAgregarDepartamento, setBtnDepartamento] = useState('');
    const onSubmit = (data) => {
        console.log('picture: ', picture);
        const formData = new FormData()


        setBtnDepartamento(true);
        const acondicionados = acondicionadoSelect;
      
        formData.append("nombre", data.nombre);
        picture.forEach((file) => formData.append('foto', file)

        );

        // formData.append(picture.name, picture);
        formData.append("direccion", data.direccion);
        formData.append("descripcion", data.direccion);
        formData.append("valor", data.valor);
        formData.append("comuna", data.comuna);
        formData.append("cantidad", data.cantidad);
        acondicionados.forEach((item) => {
            formData.append('acondicionados', item);
        });
        const headers = {
            'content-type': 'multipart/form-data'
        }
        axios.post('http://localhost:3001/api/upload', formData, { headers })
            .then(response => {
                // Guardo la respuesta del parametro de salida del sp

                var respuestaServidor = JSON.stringify(response.data);

                if (respuestaServidor == 1) {
                    // Mensaje de Insertado Correctamente
                    Swal.fire({
                        title: 'Departamento Agregado',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    })
                    setPicture([]);
                    objeto.setModalAgregar(false);
                    objeto.getDepartamentos();
                    setBtnDepartamento(false);
                } else {
                    Swal.fire({
                        title: 'Error al Agregar',
                        text: '',
                        icon: 'error',
                        confirmButtonText: 'Continuar'
                    })
                    setBtnDepartamento(false);
                }
            })
            .catch(err => console.warn(err));

    }

    const handleChange = (e) => {
        let target = e.target
        let name = target.name
        let value = Array.from(target.selectedOptions, option => option.value);

        setSelectAcondicionado([value]);

    }

    
    const [picture, setPicture] = useState([]);

    const onChangePicture = e => {



        setPicture([...picture, ...e.target.files]);

        console.log("IMAGEN" + JSON.stringify(picture));
    };


    return (
        <Modal size={'lg'} isOpen={objeto.modalAgregar}>
            <ModalHeader >Agregar Departamento</ModalHeader>
            <ModalBody>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="row">
                            <div className="col-12 mt-2">

                            </div>

                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="nombre" placeholder="Nombre Departamento"></input>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.nombre && "Ingrese Nombre del Departamento"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="descripcion" placeholder="Descripcion "></input>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.descripcion && "Ingrese Descripcion"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="direccion" placeholder="Direccion"></input>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.direccion && "Ingrese Dirección"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <label for="selecRegion">Seleccion Region</label>
                                <select class="form-control" id="selecRegion" name="region" ref={register({ required: true })} onChange={e => handleAddrTypeChange(e)}>
                                    <option value="0" selected disabled  >Seleccione Region</option>
                                    {
                                        regiones.map((elemento, i) => (

                                            <option value={elemento.IDREGION}>{elemento.NOMBREREGION}</option>
                                        ))
                                    }

                                </select>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.region && "Seleccione Región"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <label for="selectComuna">Seleccion Comuna</label>
                                <select class="form-control" name="comuna" ref={register({ required: true })} id="selectComuna" >

                                    {
                                        comunas.map((elemento, i) => (
                                            <option value={elemento.IDCOMUNA}>{elemento.NOMBRECOMUNA}</option>
                                        ))
                                    }

                                </select>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.comuna && "Seleccione Comuna"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="valor" placeholder="Valor Departamento"></input>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.valor && "Ingrese Valor"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="number" ref={register({ required: true })} className="form-control" name="cantidad" placeholder="Cantidad Habitaciones"></input>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.cantidad && "Indique la cantidad de Habitaciones"}
                                </span>
                            </div>
                            <div class="col-12 mt-2">
                                <label for="selectAcondicionado">Seleccione los Acondicionados</label>
                                <select ref={register({ required: true })} multiple class="form-control" id="selectAcondicionado" name="acondicionado" onChange={handleChange}>
                                    {
                                        acondicionado.map((elemento, i) => (
                                            <option value={elemento.IDACOND} >{elemento.NOMBREACONDI}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.acondicionado && "Seleccione al menos un acondicionado"}
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <label for="exampleFormControlFile1">Elegir Imagen</label>
                                <input type="file" ref={register({ required: true })} name="imagen" multiple onChange={onChangePicture} className="form-control-file btn btn-primary" ></input>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.imagen && "Seleccione al menos una imagen"}
                                </span>
                            </div>
                        </div>
                        <Button disabled={btnAgregarDepartamento} type="submit" className="mt-2" color="primary">Agregar</Button>{' '}
                    </form>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => (objeto.setModalAgregar(false))}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}
export default ModalAgregarDepartamento;