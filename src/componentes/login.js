import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import { BrowserRouter as Route, Redirect } from 'react-router-dom';

function Login() {

    // Inicializar valores 

    const [datosFormLogin, setDatosFormLogin] = useState({
        correo: '',
        contrasena: ''

    });


    const { register, errors, handleSubmit } = useForm();


    // Enviar Formulario a POST , para validar si existe o no el usuario

    const onSubmit = (data) => {

        console.log("FORMULARIO" + JSON.stringify(data));
        axios.post('http://satur.docn.us/api/validarUsuario', data)
            .then(response => {
                // Guardo la respuesta del parametro de salida del sp
                let respuestaServidor = response.data.p_out;
                if (respuestaServidor === "1") {
                    console.log("Usuario Encontrado");
                    window.location = '/usuarios';
                } else {
                    console.log("No pudimos encontrar una cuenta");
                }
            })
            .catch(err => console.warn(err));
    }


    return (
        <div>
            <p>
                Iniciar Sesión
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label for="">Correo</label>
                    <input ref={register({ required: true })} name="correo" className="form-control" />
                    <span className="text-danger text-small d-block mb-2">
                        {errors.correo && "Ingrese Correo"}
                    </span>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="contrasena" ref={register({ required: true })} className="form-control" />
                    <span className="text-danger text-small d-block mb-2">
                        {errors.contrasena && "Ingrese Contraseña"}
                    </span>
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    )
}
export default Login;