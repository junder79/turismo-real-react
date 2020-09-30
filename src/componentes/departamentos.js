import React, { useState } from 'react';
import { Button} from 'reactstrap';
import { useHistory } from "react-router-dom";
import ModalAgregarDepartamento from './modalAgregarDepartamento';
function Departamentos() {
    const history = useHistory();

    // Manejo de Modal Abierto o cerrado

    const [modalAgregar, setModalAgregar] = useState(false);
    const redireccionRuta = () => {
        let path = 'acondicionado';
        history.push(path);
    }
    return (
        <div className="container">
            <p className="titulo-componentes">Departamentos</p>
            <Button onClick={redireccionRuta} className="btn btn-sm btn-primary">Acondicionados</Button>
            <Button onClick={ () => setModalAgregar(true)} className="btn btn-sm btn-success ml-2">Agregar Departamentos</Button>
            <ModalAgregarDepartamento setModalAgregar={setModalAgregar} modalAgregar={modalAgregar} />
        </div>
    )
}

export default Departamentos;