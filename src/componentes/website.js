import React, { useState } from 'react';
import { Layout, Menu, Modal, Row, Card, Col, Form, Input, DatePicker, Button, Divider, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
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
    const { Meta } = Card;
    const history = useHistory();
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

    const buscarDepart = values => {

        const getDaysDiff = (start_date, end_date, date_format = 'YYYY-MM-DD') => {
            const getDateAsArray = (date) => {
                return moment(date.split(/\D+/), date_format);
            }
            return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
        }

        setVisible(true);
        setLugar(values.lugar);
        setTitulo("Buscando en " + values.lugar);
        setSubtitulo('');
        setestadoBuscar(1);
        var fechaInicio = moment(values.fecha[0]).format("YYYY-MM-DD");

        var fechaTermino = moment(values.fecha[1]).format("YYYY-MM-DD");
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
            setTitulo("Resultado de " + lugar);
            setVisible(false);


            console.log("CANTIDAD FILAS" + res.data.length);
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
    return (

        <>
            <UpCircleTwoTone className="scrollTop" onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} />
         
            <img style={{ marginLeft: '25%' }} className="logotr" src="/img/turismoreal-logo.png" width="50%" height="100%"></img>
            <Row style={{borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}} className="banner centrar fondo-cuadro" >
                {/* inicio probando fondo con video  */}
                {/* <img src="https://cdn.dribbble.com/users/1355613/screenshots/10374363/media/0aeca8e7c535e3784a2d9a562a30acc6.jpg"  class="header-video "></img> */}
                {/* fin probando fondo con video  */}

                {/* <Card className="cuadro texto-roboto shadow negro" style={{ width: '75%', color: 'black' }} bordered={false} > */}
                    {/* <h2>Alojamiento con Reserva Flexible</h2> */}
                  
                    
                    {/* <p className="texto-roboto negro">Encuentra hoteles que puedes cancelar si tus planes cambian</p> */}

                    <div className="row" styles="border: 1px solid black" >
                        <Form

                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={buscarDepart}

                        >
                            <div class="col-sm-12 col-md-12 " style={{ color: 'white' }}>

                                <Form.Item label="Destino" label={<label className="titulo-buscar" style={{ color: "white" , fontSize:27}}>Lugar de Destino</label>} style={{ color: 'white',borderRadius: 25 }} name="lugar" className="ml-2" wrapperCol={{ span: 24 }} rules={[{ required: true, message: 'Ingresa un Lugar de destino' }]}>
                                    <Input placeholder="" style={{borderRadius: '10px'}}  />
                                </Form.Item>

                            </div>
                            <div class="col-sm-12 col-md-12">
                                <Form.Item name="fecha" label={<label className="titulo-buscar" style={{ color: "white" , fontSize:27}}>Entrada y Salida</label>}   wrapperCol={{ span: 24 }} rules={[{ required: true, message: 'Selecciona el rango de fecha' }]} className="ml-2"  >
                                    <RangePicker style={{borderRadius: '10px'}} />
                                </Form.Item>
                            </div>
                            <div class="col-sm-12 col-md-4">

                                <Form.Item >
                                    <Button className="btnes texto-roboto" htmlType="submit">
                                        Buscar
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                {/* </Card> */}

            </Row>

            <Row className="hot-pop " >
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
                                    <Carousel responsive={responsive} className="mb-2 mt-2">
                                        <Card
                                            hoverable
                                            style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                            className="shadow"
                                            cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://media.cnnchile.com/sites/2/2019/08/la-serena-mop.jpg" />}
                                        >
                                            <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                            <Meta title="La serena" description="Desde $59.000" />
                                            {/*      <Button onClick={redirigir}>Ver más</Button> 
          */}
                                            <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                                Ver más <RightOutlined /></Button>
                                        </Card>
                                        <Card
                                            hoverable
                                            className="shadow  "
                                            style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                            cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://media-cdn.tripadvisor.com/media/photo-s/15/7d/ed/0c/img-20181117-160125972.jpg" />}
                                        >
                                            <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                            <Meta title="Viña del Mar" description="Desde $59.000" />
                                            {/*      <Button onClick={redirigir}>Ver más</Button> 
          */}
                                            <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                                Ver más <RightOutlined /></Button>

                                        </Card>
                                        <Card
                                            hoverable
                                            className="shadow"
                                            style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                            cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://pyme.emol.com/wp-content/uploads/2020/01/Fedetur-puc%C3%B3n.jpg" />}
                                        >
                                            <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                            <Meta title="Pucón" description="Desde $59.000" />
                                            {/*      <Button onClick={redirigir}>Ver más</Button> 
          */}
                                            <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                                Ver más <RightOutlined /></Button>
                                        </Card>
                                        <Card
                                            hoverable
                                            className="shadow"
                                            style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                            cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://www.ola.com.ar/files/circuitos/puerto-varas.jpg" />}
                                        >
                                            <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                            <Meta title="Puerto Varas" description="Desde $59.000" />
                                            {/*      <Button onClick={redirigir}>Ver más</Button> 
          */}
                                            <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                                Ver más <RightOutlined /></Button>
                                        </Card>

                                        <Card
                                            hoverable
                                            style={{ width: 240, borderRadius: 20, margin: '1%' }}
                                            className="shadow "
                                            cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://media.cnnchile.com/sites/2/2019/08/la-serena-mop.jpg" />}
                                        >
                                            <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                            <Meta title="La serena" description="Desde $59.000" />
                                            {/*      <Button onClick={redirigir}>Ver más</Button> 
          */}
                                            <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                                Ver más <RightOutlined /></Button>
                                        </Card>
                                    </Carousel> :
                                    <Carousel responsive={responsive} className="mb-2 mt-2">
                                        {

                                            cantF > 0 ?
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

                                                )) :

                                                <div className="d-flex justify-content-center">
                                                    <UseAnimations strokeColor={'#512da8'} animation={alertOctagon} size={80}></UseAnimations>
                                                </div>


                                        }
                                    </Carousel>

                        }


                    </center>

                </div>
            </Row>
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

                    <h3 className="texto-roboto-elegir centrar" style={{ marginTop: 15, marginBottom: 15 }}>Elige Turismo Real para tus viajes</h3>
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

            <Row className="hot-pop " >
                <div id="tours">
                    <h3 className="texto-roboto-popular " style={{ marginTop: 10 }}>Algunos Tours Populares</h3>
                    <p className="subtitulos-popular">
                        Te mostramos los tours más reservados y con mejor puntuación para que elijas.
                    </p>

                    <div className="row flex justify-content-center" >

                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <Card
                                hoverable
                                style={{ borderRadius: 20, }}
                                className="shadow mt-2 mb-2"
                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://www.foodtripchile.cl/wp-content/uploads/2019/06/tour-palacio-la-moneda-1.jpg" />}
                            >
                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <Meta title="Santiago" description="Desde $59.000" />

                                <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                    Ver más <RightOutlined /></Button>
                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <Card
                                hoverable
                                style={{ borderRadius: 20, }}
                                className="shadow mt-2 mb-2"
                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://www.baltazar.cl/w3/wp-content/uploads/2015/01/Ascensor_Artiller%C3%ADa.jpg" />}
                            >
                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <Meta title="Valparaiso" description="Desde $59.000" />
                                {/*      <Button onClick={redirigir}>Ver más</Button> 
                        */}
                                <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                    Ver más <RightOutlined /></Button>

                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <Card
                                hoverable
                                style={{ borderRadius: 20, }}
                                className="shadow mt-2 mb-2"
                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://www.gochile.cl/fotos/full/105976-pucon-hector-garcia-1-@2x.jpg" />}
                            >
                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <Meta title="Puerto Montt" description="Desde $59.000" />
                                {/*      <Button onClick={redirigir}>Ver más</Button> 
                        */}
                                <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                    Ver más <RightOutlined /></Button>
                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <Card
                                hoverable
                                style={{ borderRadius: 20, }}
                                className="shadow mt-2 mb-2"
                                cover={<img alt="Imagen" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src="https://www.gochile.cl/fotos/full/105610-14700791_1254267347978399_2625816188240095663_o@2x.jpg" />}
                            >
                                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <Meta title="Pucón" description="Desde $59.000" />
                                {/*      <Button onClick={redirigir}>Ver más</Button> 
                        */}
                                <Button style={{ marginTop: 10 }} onClick={event => window.location.href = 'detalleDepartamento'} type="primary" shape="round" >
                                    Ver más <RightOutlined /></Button>
                            </Card>
                        </div>


                    </div>

                </div>
            </Row>


            {/* <Row style={{ backgroundColor: '#EEEEEE' }}>
                <h3 className="texto-roboto-paisajes centrar" style={{ marginTop: 15, color: 'black', marginBottom: 15 }}>Algunos paisajes que podrás ver</h3>
            </Row> */}
            {/* <Carousel className="carousel" autoplay>

                <div>
                    <img className="galeria" src="https://i.pinimg.com/originals/6d/4f/7a/6d4f7a7c5c377e8554f020bf814bd5a2.jpg"></img>
                </div>
                <div>
                    <img className="galeria" src="https://content.skyscnr.com/m/7a5757675453387a/original/GettyImages-100517538_doc.jpg?resize=1800px:1800px&quality=100"></img>
                </div>
                <div>
                    <img className="galeria" src="https://speakzeasy.files.wordpress.com/2015/04/santiago.jpg"></img>
                </div>
                <div>
                    <img className="galeria" src="https://i1.wp.com/www.alltherooms.com/blog/wp-content/uploads/2018/11/Feature-9-Adventure-Travel-Experiences-in-Pucon-Chile-By-Guaxinim.jpg?fit=1000%2C667&ssl=1"></img>
                </div>
                <div>
                    <img className="galeria" src="https://www.diariodeosorno.cl/files/5f597635ab876_890x533.jpg"></img>
                </div>

            </Carousel> */}
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