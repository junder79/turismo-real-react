import React , {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useHistory, Link } from "react-router-dom";
function CerrarSesion() {
    const cookies = new Cookies();
    const history = useHistory();
    useEffect(() => {

        cerrarSesion();

    }, [])
    const cerrarSesion = () => {
        cookies.set('estadoSesion', false, { path: '/' });
        // history.push('/clie/login');
        window.location.href = "/clie/login";
    }
    return (
        <div>
            test
        </div>
    )

}

export default CerrarSesion;