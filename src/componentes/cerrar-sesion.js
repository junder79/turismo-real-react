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
        // history.push('login');
        window.location.href = "login";
    }
    return (
        <div>
            
        </div>
    )

}

export default CerrarSesion;