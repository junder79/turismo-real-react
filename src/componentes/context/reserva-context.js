import React , { createContext , useState} from 'react';

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [departamento,setD]=useState('');
    const [tourSeleccionado,setTourSeleccionado]=useState('');
    const [transporteSeleccionado,setTransporteSeleccionado]=useState('');
    const [region,setRegion]=useState('');
    const [comuna,setComuna]=useState('');
    const [huespedes,setHuespedes]=useState({});
    // State Nombres 

    const [departNombre,setDepartNombre]=useState('');
    const [lugarNombre,setLugarNombre]=useState('');
    const [tourNombre,setTourNombre]=useState('');
    const [diasRerserva,setDiasReserva]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [totalCompra,setTotalCompra]=useState('');
    const [valorDepartamento,setValorDepartamento]=useState('');
    const [valorTour,setValorTour]=useState('');
    const [valorTransporte,setValorTransporte]=useState('');
    const [transporteNombre,setTransporteNombre]=useState('');
    const [idaTransporte,setIdaTransporte]=useState('');
    const [vueltaTransporte,setvueltaTransporte]=useState('');
    const [cantDia , setCantDia]=useState('');
    const [estadoTour,setEstadoTour]=useState(0);
    const [estadoTran,setEstadoTran]=useState(0);
    return (
        <DataContext.Provider value={{
            departamento,setD ,
            tourSeleccionado,setTourSeleccionado,
            transporteSeleccionado,setTransporteSeleccionado,
            region,setRegion,
            comuna,setComuna,
            departNombre,setDepartNombre,
            tourNombre,setTourNombre,
            diasRerserva,setDiasReserva,
            checkIn,setCheckIn,
            checkOut,setCheckOut,
            transporteNombre,setTransporteNombre,
            totalCompra,setTotalCompra,
            lugarNombre,setLugarNombre,
            idaTransporte,setIdaTransporte,
            vueltaTransporte,setvueltaTransporte,
            valorDepartamento,setValorDepartamento,
            valorTour,setValorTour,
            valorTransporte,setValorTransporte,
            cantDia,setCantDia,
            estadoTour,setEstadoTour,
            estadoTran ,setEstadoTran,
            }}>
            {children}
        </DataContext.Provider>
    )
}