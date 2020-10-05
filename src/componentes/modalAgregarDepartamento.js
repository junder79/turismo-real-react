import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
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
            url: 'http://localhost:3001/getAcondicionados'
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
            url: 'http://localhost:3001/getRegiones'
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
            url: "http://localhost:3001/getComuna/" + regionId + ""
        }).then(res => {
            console.log(res);
            setComunas(res.data);
        }).catch(err => {
            console.log(err);
        })
        // Enviar Peticion para traer las comunas de dicha region 

    }
    // const getAcondicionados = async => {
    //     axios({
    //         method: 'GET',
    //         url: 'http://localhost:3001/getAcondicionados'
    //     }).then(res => {
    //         console.log(res);
    //         setAcondicionados(res.data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    // Enviar Formulario a POST junto a la imagen

    const onSubmit = (data) => {

        const acondicionados = acondicionadoSelect;
        const formData = new FormData()
        formData.append("picture", data.picture[0]);
        formData.append("nombre", data.nombre);
        formData.append("direccion", data.direccion);
        formData.append("descripcion", data.direccion);
        formData.append("valor", data.valor);
        formData.append("comuna", data.comuna);
        formData.append("cantidad", data.cantidad);
        acondicionados.forEach((item) => {
            formData.append('acondicionados', item);
        });
       
        axios.post('http://localhost:3001/agregarDepartamentos', formData)
            .then(response => {
                // Guardo la respuesta del parametro de salida del sp
                console.log("Respuesta" + JSON.stringify(response));
            })
            .catch(err => console.warn(err));

    }

    const handleChange = (e) => {
        let target = e.target
        let name = target.name
        let value = Array.from(target.selectedOptions, option => option.value);

        setSelectAcondicionado([value]);
      
    }

    return (
        <Modal isOpen={objeto.modalAgregar}>
            <ModalHeader >Agregar Departamento</ModalHeader>
            <ModalBody>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="row">
                            <div className="col-12 mt-2">

                            </div>

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
                                <label for="selecRegion">Seleccion Region</label>
                                <select class="form-control" id="selecRegion"  onChange={e => handleAddrTypeChange(e)}>

                                    {
                                        regiones.map((elemento, i) => (
                                            <option value={elemento.IDREGION}>{elemento.NOMBREREGION}</option>
                                        ))
                                    }

                                </select>
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
                            </div>
                            <div className="col-12 mt-2">
                                <input type="text" ref={register({ required: true })} className="form-control" name="valor" placeholder="Valor Departamento"></input>
                            </div>
                            <div className="col-12 mt-2">
                                <input type="number" ref={register({ required: true })} className="form-control" name="cantidad" placeholder="Cantidad Habitaciones"></input>
                            </div>
                            <div class="col-12 mt-2">
                                <label for="selectAcondicionado">Seleccione los Acondicionados</label>
                                <select multiple class="form-control" id="selectAcondicionado" name="acondicionado" onChange={handleChange}>
                                    {
                                        acondicionado.map((elemento, i) => (
                                            <option value={elemento.IDACOND} >{elemento.NOMBREACONDI}</option>
                                        ))
                                    }
                                </select>
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