import React, { useState, useEffect } from 'react';
import { Layout, Menu, Modal, Row, Card, Col, Form, Input, DatePicker, Button, Divider, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { WhatsAppOutlined, FacebookFilled, InstagramFilled, CreditCardFilled, UpCircleTwoTone, CaretUpOutlined, CarryOutFilled, PicCenterOutlined, IdcardOutlined, CarFilled, StarFilled, RightOutlined, EnvironmentFilled, MailOutlined, GlobalOutlined, WifiOutlined, DesktopOutlined, RestOutlined, MobileOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";
import { DataContext } from './context/reserva-context';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import UseAnimations from 'react-useanimations';
import infinity from 'react-useanimations/lib/infinity'
import alertOctagon from 'react-useanimations/lib/alertOctagon'
import { enUS, es } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
const { Header, Content, Footer } = Layout;
function InicioWebsite() {
    const cookies = new Cookies();
    const estado = cookies.get('estadoSesion');
    const { RangePicker } = DatePicker;
    const [departamento, setDepart] = useState([]);
    const [titulo, setTitulo] = useState('Lugares Populares');
    const [subtitulo, setSubtitulo] = useState('Te mostramos los lugares más reservados y con mejor puntuación para que elijas.');
    const [estadoBuscar, setestadoBuscar] = useState(0);
    const [visible, setVisible] = useState(false);
    const [cantF, setCantF] = useState('');
    const [lugar, setLugar] = useState('');
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [btnBuscarDepart, setBtnBuscarDepart] = useState(true);
    const { Meta } = Card;
    const history = useHistory();
    useEffect(() => {
        getLugaresPopulares();
        getToursPopulares();
    }, [])
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const [departPopular, setDepartPopular] = useState([]);
    const [dataDepart, setDataDepart] = useState(false);
    const getLugaresPopulares = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/websiteinicial'
        }).then(res => {
            console.log(res);
            setDepartPopular(res.data);
            setDataDepart(true);
        }).catch(err => {
            console.log(err);
        })
    }
    const [tourPopular, setTourPopular] = useState([]);
    const [dataTour, setDataTour] = useState(false);
    const getToursPopulares = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/toursinicial/'
        }).then(res => {
            console.log(res);
            setTourPopular(res.data);
            setDataTour(true);
        }).catch(err => {
            console.log(err);
        })
    }
    const buscarDepart = values => {

        const getDaysDiff = (start_date, end_date, date_format = 'YYYY-MM-DD') => {
            const getDateAsArray = (date) => {
                return moment(date.split(/\D+/), date_format);
            }
            return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
        }

        setVisible(true);
        setLugar(values.lugar);
        setTitulo("Buscando en `" + values.lugar + "`");

        setSubtitulo('');
        setestadoBuscar(1);
        var fechaInicio = moment(startDate).format("YYYY-MM-DD");

        var fechaTermino = moment(endDate).format("YYYY-MM-DD");
        console.log("FECHAS INICIO " + fechaInicio + "salida " + fechaTermino);
        cookies.set('checkIn', fechaInicio, { path: '/' });
        cookies.set('checkOut', fechaTermino, { path: '/' });
        cookies.set('cantD', getDaysDiff(fechaInicio, fechaTermino), { path: '/' });
        const formData = new FormData();
        formData.append("lugar", values.lugar);
        var lugar = values.lugar;
        formData.append("fechaInicio", fechaInicio);
        formData.append("fechaTermino", fechaTermino);
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/departamentoactivo/${lugar}`
        }).then(res => {
            console.log(res.data);
            setTitulo("Departamentos en " + lugar);
            setVisible(false);



            setestadoBuscar(2);
            setDepart(res.data);

            if (res.data.length > 0) {

                setCantF(1)

            } else {
                setTitulo("Hey!, aun no estamos ahí");
                setCantF(0)
            }


        }).catch(err => {
            console.log(err);
        })
    }

    window.addEventListener('scroll', checkScrollTop)
    const cambioFecha = (value) => {
        setStartDate(value);
        setBtnBuscarDepart(false);
    }
    return (

        <>
            <UpCircleTwoTone className="scrollTop" onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} />

            {/* <img style={{ marginLeft: '25%' }} className="logotr" src="/img/turismoreal-logo.png" width="50%" height="100%"></img> */}
            <div className="jumbotron mr-4 ml-4 mt-2 shadow" style={{ borderRadius: '50px' }} >
                <div className="row">
                    <div className="col-md-4">
                        <h5 style={{ color: 'white', fontWeight: 'bold', }} className="display-4 shadow-mensaje" >Siéntete un turista cerca de casa</h5>
                    </div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
                <hr className="my-4"></hr>
                <Form

                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={buscarDepart}

                >
                    <div class="col-sm-6 col-md-6 " style={{ color: 'white' }}>

                        <Form.Item label="Destino" labelCol={{ span: 24 }}
                            label={<label className="titulo-buscar" style={{ color: "white", fontSize: 27 }}>Lugar de Destino  <FontAwesomeIcon size="sm" icon={faMapMarkerAlt}></FontAwesomeIcon></label>} style={{ color: 'white', borderRadius: 25 }} name="lugar" className="ml-2" wrapperCol={{ span: 24 }} rules={[{ required: true, message: 'Ingresa un Lugar de destino' }]}>
                            <Input placeholder="" style={{ borderRadius: '10px' }} />
                        </Form.Item>

                    </div>
                    <div class="col-sm-6 col-md-6">
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={cambioFecha}
                            onEndDateChange={setEndDate}
                            minimumDate={new Date()}
                            minimumLength={1}
                            locale={es}
                            format='dd/MM/yyyy'
                        >
                            {({ startDateInputProps, endDateInputProps, focus }) => (
                                <div className='date-range row ' style={{ marginLeft: '0.2px' }}>
                                    <div className="col-sm-12 col-md-6 " >
                                        <label className="titulo-buscar" form="llegada" style={{ color: "white", fontSize: 27 }}>Llegada</label>
                                        <input
                                            className={'input form-control mt-2' + (focus === START_DATE ? ' -focused' : '')}
                                            {...startDateInputProps}
                                            placeholder='Agregar Fechas'
                                            style={{ borderRadius: '10px' }}
                                            id="llegada"
                                        />
                                    </div>
                                    <span className='date-range_arrow' />
                                    <div className="col-sm-12 col-md-6">
                                        <label className="titulo-buscar" form="salida" style={{ color: "white", fontSize: 27 }}>Salida</label>
                                        <input
                                            className={'input form-control mt-2' + (focus === END_DATE ? ' -focused' : '')}
                                            {...endDateInputProps}
                                            placeholder='Agregar Fechas'
                                            style={{ borderRadius: '10px' }}
                                            id="salida"
                                        />
                                    </div>
                                </div>
                            )}
                        </DateRangePicker>
                    </div>
                    <div class="col-sm-12 col-md-4">

                        <Form.Item >
                            <Button disabled={btnBuscarDepart} className="btnes texto-roboto mt-2 ml-2" htmlType="submit">
                                Buscar
        </Button>
                        </Form.Item>
                    </div>
                </Form>

            </div>


            < Row className="hot-pop " >
                <div id="hoteles" className="container">

                    <h3 className="texto-roboto-hoteles " style={{ marginTop: 10 }}>{titulo}</h3>
                    <p className="subtitulos-popular">
                        {subtitulo}
                    </p>

                    <center>
                        {
                            estadoBuscar == 1 ?
                                <UseAnimations strokeColor={'#512da8'} animation={infinity} size={80}></UseAnimations> :
                                estadoBuscar == 0 ?
                                    !dataDepart ?
                                        <div className="d-flex justify-content-center">
                                            <UseAnimations strokeColor={'#512da8'} animation={infinity} size={80}></UseAnimations>
                                        </div> :
                                        <Carousel responsive={responsive} className="mb-2 mt-2">
                                            {

                                                departPopular.map((elemento, i) => (
                                                    <Card
                                                        hoverable
                                                        style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                                        className="shadow"
                                                        cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src={elemento.RUTAIMAGEN} />}
                                                    >
                                                        <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                                        <Meta title={elemento.DESCRIPCIOND} description={"Desde $" + elemento.VALORDEPARTAMENTO} />
                                                        {/*      <Button onClick={redirigir}>Ver más</Button> 
          */}
                                                        <Button style={{ marginTop: 10 }} type="primary" shape="round" >
                                                            <Link style={{ color: 'white' }} to={"departamento/" + elemento.IDDEPARTAMENTO + "/" + elemento.COMUNA_IDCOMUNA} >Ver más </Link><RightOutlined /></Button>
                                                    </Card>
                                                ))
                                            }
                                        </Carousel> :
                                    <>
                                        {

                                            cantF > 0 ?
                                                <Carousel responsive={responsive} className="mb-2 mt-2">

                                                    {
                                                        departamento.map((elemento, i) => (


                                                            <Card
                                                                key={elemento.IDDEPARTAMENTO}
                                                                hoverable
                                                                style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                                                className="shadow"
                                                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src={elemento.RUTAIMAGEN} />}
                                                            >
                                                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                                                <Meta title={elemento.NOMBRED} description={"Desde $" + elemento.VALORDEPARTAMENTO} />
                                                                <Button style={{ marginTop: 10, }} type="primary" shape="round" >
                                                                    <Link style={{ color: 'white' }} to={"departamento/" + elemento.IDDEPARTAMENTO + "/" + elemento.COMUNA_IDCOMUNA} >Ver más </Link><RightOutlined /></Button>
                                                            </Card>

                                                        ))
                                                    }
                                                </Carousel>
                                                :

                                                <center>
                                                    <div className="d-flex justify-content-center">
                                                        <UseAnimations strokeColor={'#512da8'} animation={alertOctagon} size={80}></UseAnimations>
                                                    </div>

                                                </center>

                                        }
                                    </>


                        }


                    </center>

                </div>
            </Row >
            <Row className="hot-pop " >
                <div id="hoteles" className="container">
                    <center>


                        <div className="row flex justify-content-center">
                            <Divider orientation="left"></Divider>

                            <div >

                                <div className="centrar">
                                    <h5 className="texto-roboto-hoteles">Puedes reservar tu departamento, con los acondicionamientos que tu quieras</h5>
                                    <p className="subtitulos-general mt-2">Facilidades para hacer tu estadia completamente cómoda.</p>
                                </div>

                                <center>
                                    <div className=" row mt-2" >
                                        <div class="col-sm-12 col-md-4">
                                            <WifiOutlined style={{ fontSize: '50px', marginBottom: '26px' }} /><p className="subtitulos-popular">Conexión a internet</p>
                                        </div>
                                        <div class="col-sm-12 col-md-4">
                                            <MobileOutlined style={{ fontSize: '50px', marginBottom: '26px' }} /><p className="subtitulos-popular">Transferencia Bancaria</p>
                                        </div>
                                        <div class="col-sm-12 col-md-4">
                                            <RestOutlined style={{ fontSize: '50px', marginBottom: '26px' }} /><p className="subtitulos-popular">Desayuno, almuerzo, cena</p>
                                        </div>
                                        <div class="col-sm-12 col-md-4">
                                            <DesktopOutlined style={{ fontSize: '50px', marginBottom: '26px' }} /><p className="subtitulos-popular">Televisión / SmartTV</p>
                                        </div>
                                        <div class="col-sm-12 col-md-4">
                                            <CarFilled style={{ fontSize: '50px', marginBottom: '26px' }} /><p className="subtitulos-popular">Estacionamiento</p>
                                        </div>
                                        <div class="col-sm-12 col-md-4">
                                            <PicCenterOutlined style={{ fontSize: '50px', marginBottom: '26px' }} /><p className="subtitulos-popular">Aire acondicionado</p>
                                        </div>

                                    </div>
                                </center>
                            </div>
                        </div>
                    </center>

                </div>
            </Row>
            <Row className="fondo">

                <div className="container">

                    <h3 className="texto-roboto-elegir centrar shadow-mensaje" style={{ marginTop: 15, marginBottom: 15, color: 'white' }}>Elige Turismo Real para tus viajes</h3>
                    <div className="iconos row" >
                        <div class="col-sm-12 col-md-4">
                            <Card className="centrar sub-card-texto shadow" style={{ borderRadius: 20, margin: '3%', height: '40%' }} bordered={false}>
                                <h5><CarFilled style={{ fontSize: '45px', marginRight: '20px' }} />Compra tu viaje fácil y rápidamente</h5>
                                <Divider ></Divider>
                            Consigue todo lo que necesitas para tu próximo viaje de forma simple, ágil y segura desde nuestro sitio web, disponible para Mac, Pc y Linux.

                            </Card>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <Card className="centrar sub-card-texto shadow" style={{ borderRadius: 20, margin: '3%', height: '40%' }} bordered={false}>
                                <h5><CreditCardFilled style={{ fontSize: '45px', marginRight: '20px' }} />Aprovecha las formas de pago y beneficios</h5>
                                <Divider ></Divider>
                                Viajar es lo único que al comprar te hace mas rico, por eso te ofrecemos el medio de pago que mas te convenga. Puedes pagar en cuotas, con tarjeta de crédito o débito.
                            </Card>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <Card className="centrar sub-card-texto shadow" style={{ borderRadius: 20, margin: '3%', height: '40%' }} bordered={false}>
                                <h5><IdcardOutlined style={{ fontSize: '45px', marginRight: '20px' }} />Gestiona tus reservas desde Mis Viajes</h5>
                                <Divider ></Divider>
                             Antes o durante tu llegada, puedes consultar toda la información de tus reservas desde Mis Viajes en el sitio web puedes gestionar cambios, hacer el web check-in y ¡mucho más!
                            </Card>
                        </div>
                    </div>

                </div>
            </Row>
            <Row style={{ backgroundColor: '#EEEEEE' }}>
                <Divider orientation="left"></Divider>
                <div className="container">
                    <h3 className="texto-roboto-servicios centrar" style={{ color: 'black', marginBottom: 15 }}>Descubre nuestros servicios extras</h3>
                    <div className="row">
                        <div class="col-sm-12 col-md-4">
                            <Card style={{ borderRadius: 20, height: 300, margin: '3%' }} className="shadow sub-card-texto" bordered={false}>
                                <h5><GlobalOutlined style={{ fontSize: '45px', marginRight: '20px' }} />Paquetes de Tours</h5>
                                <Divider ></Divider>
                            Ofrecemos una serie de paquetes de turismo, incluye guía turistico, registrate y reserva para saber más sobre los paquetes de turismo.

                        </Card>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <Card style={{ borderRadius: 20, height: 300, margin: '3%' }} className="shadow sub-card-texto" bordered={false}>
                                <h5><CarryOutFilled style={{ fontSize: '45px', marginRight: '20px' }} />Servicio de Información</h5>
                                <Divider ></Divider>
                            Queremos ofrecerte un servicio de calidad para que conozcas nuestros atractivos turisticos y riquezas naturales, además de nuestra hospitalidad y calidez.
                        </Card>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <Card style={{ borderRadius: 20, height: 300, margin: '3%' }} className="shadow sub-card-texto" bordered={false}>
                                <h5><CarFilled style={{ fontSize: '45px', marginRight: '20px' }} />Servicio de transporte</h5>
                                <Divider ></Divider>
                            Tenemos vehiculos privados para darte una mejor bienvenida y acercarte a nuestros hoteles si asi lo requieres.
                            </Card>
                        </div>
                    </div>

                </div>
                <Divider id="suscribirse" orientation="left"></Divider>
            </Row>
            {/* <Row className="fondo">
                <Card className="suscribe " title="Suscribete para obtener descuentos" >
                    <form className="form-inline">
                        <h3 style={{ color: 'white' }}>
                            Ingresa tu correo electronico
                   </h3>
                        <div class="form-group  mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">Escribe tu mail</label>
                            <input type="text" className="form-control" id="inputPassword2" placeholder="Correo" />
                        </div>
                        <small style={{ color: 'white' }} id="passwordHelpBlock" class="form-text">
                            Ingresa tu correo electronico para recibir ofertas sobre descuentos y nuevos hoteles para reservar</small>
                    </form>
                    <button style={{ marginLeft: '25%' }} className="btn btn-primary mb-2">Confirmar</button>


                </Card>
            </Row> */}

            {/* <Row className="hot-pop " >
                <div id="tours">
                    <h3 className="texto-roboto-popular " style={{ marginTop: 10 }}>Algunos Tours Populares</h3>
                    <p className="subtitulos-popular">
                        Te mostramos los tours más reservados y con mejor puntuación para que elijas.
                    </p>

                    <div className="row flex justify-content-center" >

                        {
                            !dataTour ?
                                <center>
                                    <div className="d-flex justify-content-center">
                                        <UseAnimations strokeColor={'#512da8'} animation={infinity} size={80}></UseAnimations>
                                    </div>

                                </center>
                                :
                                tourPopular.map((elemento, i) => {
                                    if (i >= 4) return null;
                                    return (
                                        <div className="col-sm-12 col-md-12 col-lg-3">
                                            <Card
                                                hoverable
                                                style={{ borderRadius: 20, }}
                                                className="shadow mt-2 mb-2"
                                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src={elemento.IMAGEN} />}
                                            >
                                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                                <Meta title={elemento.LUGAR} description={"Desde $" + elemento.VALORTOUR} />

                                                <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                                    Ver más <RightOutlined /></Button>
                                            </Card>
                                        </div>
                                    )
                                })
                        }



                    </div>

                </div>
            </Row> */}
            < Row className="hot-pop " >
                <div id="hoteles" className="container">

                    <h3 className="texto-roboto-hoteles " style={{ marginTop: 10 }}>Algunos Tours Populares</h3>
                    <p className="subtitulos-popular">
                        Te mostramos los tours más reservados y con mejor puntuación para que elijas.
                    </p>

                    <center>
                        {
                            !dataTour ?
                                <UseAnimations strokeColor={'#512da8'} animation={infinity} size={80}></UseAnimations> :

                                <Carousel responsive={responsive} className="mb-2 mt-2">
                                    {

                                        tourPopular.map((elemento, i) => (
                                            <Card
                                                hoverable
                                                style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                                className="shadow"
                                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src={elemento.IMAGEN} />}
                                            >
                                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                                <Meta title={elemento.LUGAR} description={"Desde $" + elemento.VALORTOUR} />
                                                <Button style={{ marginTop: 10 }} type="primary" shape="round" >
                                                    <Link style={{ color: 'white' }}  >Ver más </Link><RightOutlined /></Button>
                                            </Card>
                                        ))
                                    }
                                </Carousel>



                        }


                    </center>

                </div>
            </Row >
            <div>

                <div>
                    <Row style={{ backgroundColor: '#EEEEEE', height: '100%' }}>
                        <div className="container ">
                            <h3 className="texto-roboto-reserva centrar" style={{ marginTop: 15, color: 'black', marginBottom: 15 }}>¡Reserva ya!</h3>
                            <center>
                                <div className="row" >
                                    <Col span={24}>
                                        <Card className="shadow " title="" style={{ borderRadius: 20, height: '100%' }} bordered={false}>
                                            <h5><IdcardOutlined style={{ fontSize: '45px', marginRight: '20px' }} />Reserva fácil y rápidamente</h5>
                                            <Divider ></Divider>
                                            <span className="subtitulos-general">Los mejores precios en reservas económicos en hoteles, paquetes turísticos, alquiler de autos, cruceros y más están en Turismo Real. Puedes planificar tu viaje ahora y realizar reservas con opciones económicas y ofertas increíbles. En Turismo Real puedes elegir tu destino favorito y comenzar a planificar tus tan esperadas vacaciones. Puedes consultar disponibilidad de hoteles de forma rápida y sencilla, para encontrar la opción que más se ajuste a tus necesidades. Tenemos ofertas a miles de destinos y contamos con una gran variedad de hoteles para que puedas hospedarte y disfrutar de tu estadía sin problemas.</span>
                                        </Card>
                                    </Col>

                                </div>
                            </center>

                        </div>
                        <Divider id="contacto"></Divider>
                    </Row>
                </div>
            </div>

            <div className="row " style={{ backgroundColor: '#EEEEEE', height: '100%' }}>
                <div className="container col-sm-12 col-md-6 responsive"  >
                    <iframe style={{ height: '80vh', width: '100%' }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13323.515319098475!2d-70.5056056!3d-33.4003253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x78594ceeb4b0b1b5!2sDuoc%20UC!5e0!3m2!1ses-419!2scl!4v1604448405197!5m2!1ses-419!2scl" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
                <div className="col-sm-12 col-md-4">
                    <p className="texto-roboto-contacto ml-2">Contáctanos</p>
                    <p className="subtitulos-popular ml-2">Escribenos al whatsapp o mail:</p>
                    <a href="https://web.whatsapp.com/" target="_blank" style={{ display: 'flex' }}><WhatsAppOutlined style={{ width: '50px' }} /> <p className="subtitulos-popular">+569 8765 4321</p></a>
                    <p className="subtitulos-popular" style={{ display: 'flex' }}><EnvironmentFilled style={{ width: '50px' }} />Camino El Alba 12881, Las Condes, Región Metropolitana</p>
                    <p className="subtitulos-popular" style={{ display: 'flex' }}><MailOutlined style={{ width: '50px' }} />  reservas@turismoreal.com</p>
                </div>
            </div>

            <Footer>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <p className="texto-roboto-general">Síguenos</p>
                        <p className="subtitulos-general" >Siguenos en nuestras redes sociales:</p>

                        <a className="subtitulos-general" href="www.fb.com" target="_blank" style={{ display: 'flex' }}><FacebookFilled style={{ width: '50px' }} /> <p>Turismo Real</p></a>
                        <a className="subtitulos-general" href="www.instagram.com" target="_blank" style={{ display: 'flex' }}><InstagramFilled style={{ width: '50px' }} /><p>Turismo Real</p></a>
                        <p className="subtitulos-general" style={{ display: 'flex' }}><GlobalOutlined style={{ width: '50px' }} /> www.turismoreal.cl</p>

                    </div>

                    <div className="col-sm-12 col-md-4">
                        <p className="texto-roboto-general">Innogestión</p>
                        <h5 /* style={{marginTop: '80px'}} */>Web desarrollada por:</h5>
                        <img className="logo" src="/img/logo-empresa.png"></img>

                        <p className="subtitulos-general">Empresa dedicada a desarrollar tus ideas en formato digital.</p>
                        <p className="subtitulos-general">2020 &copy; Innogestión</p>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <p className="texto-roboto-general">Menu</p>
                        <p className="subtitulos-general">Navega por:</p>
                        <ul>
                            <li> <a className="subtitulos-general" onClick={event => window.location.href = '#arriba'}>Ir arriba</a></li>
                            <li> <a className="subtitulos-general" onClick={event => window.location.href = '#tours'}>Tours</a></li>
                            <li> <a className="subtitulos-general" onClick={event => window.location.href = '#misviajes'}>Mis Viajes</a></li>
                            <li> <a className="subtitulos-general" onClick={event => window.location.href = '#hoteles'}>Hoteles Populares</a></li>
                        </ul>
                    </div>

                </div>

            </Footer>
        </>
    )
}

export default InicioWebsite;