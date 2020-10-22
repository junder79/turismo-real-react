import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Card, Col, Form, Input, DatePicker, Button,Carousel } from 'antd';

const { Header, Content, Footer } = Layout;
function InicioWebsite() {
    const { RangePicker } = DatePicker;
    const { Meta } = Card;
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <div>
            <Header style={{ backgroundColor: '#FFFFFF' }}>
                <div className="logo" />
                <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">LOGO</Menu.Item>
                    <Menu.Item key="2">Inicio Sesion</Menu.Item>
                    <Menu.Item key="3">Mis Viajes</Menu.Item>
                </Menu>
            </Header>
            <Row style={{ backgroundColor: '#DDD5F5', justifyContent: 'center', alignItems: 'center' }}>


                <div >
                    <Card title="Alojamiento con Reserva Flexible" color={'white'} style={{ backgroundColor: '#270570', borderRadius: 15, width: 800, marginTop: 15, marginBottom: 15, color: 'white', boxShadow: '40' }} bordered={false} >
                        <p className="texto-roboto">Encuentra hoteles que puedes cancelar si tus planes cambian</p>
                        <Row>
                            <Col span={6}>
                                <Form.Item label="Destino" name="lugar" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                    <Input placeholder="" />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item name="range-picker" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="ml-2" label="Entrada y salida" >
                                    <RangePicker />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Button style={{ alignItems: 'right', borderRadius: 20, backgroundColor: 'orange' }} className="texto-roboto" type="primary">Buscar</Button>
                            </Col>

                        </Row>
                    </Card>
                </div>


            </Row>
            <Row style={{ backgroundColor: '#EEEEEE', height: 600 }}>
                <div className="container">
                    <h3 className="texto-calistoga" style={{ marginTop: 10  }}>Hoteles Populares</h3>
                    <Row>
                        <Card
                            hoverable
                            style={{ width: 240, marginLeft: 10, borderRadius: 20 }}
                            cover={<img alt="example" src="https://img.ev.mu/images/attractions/624/960x640/440131.jpg" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240, marginLeft: 10, borderRadius: 20 }}
                            cover={<img alt="example" src="https://img.ev.mu/images/attractions/624/960x640/440131.jpg" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240, marginLeft: 10, borderRadius: 20 }}
                            cover={<img alt="example" src="https://img.ev.mu/images/attractions/624/960x640/440131.jpg" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240, marginLeft: 10, borderRadius: 20 }}
                            cover={<img alt="example" src="https://img.ev.mu/images/attractions/624/960x640/440131.jpg" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>

                    </Row>

                </div>
            </Row>
            <Row style={{   backgroundImage: "url(" + "https://image.freepik.com/vetores-gratis/papel-de-parede-ondulado-escuro_23-2148385294.jpg" + ")", height: 400 }}>
                <div className="container">
                    <h3 className="texto-calistoga" style={{ marginTop: 15, color: 'white', marginBottom: 15 }}>Elige Despegar para tus viajes</h3>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Compra tu viaje fácil y rápidamente" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Consigue todo lo que necesitas para tu próximo viaje de forma simple, ágil y segura desde nuestra web o app gratuita, disponible para iOS y Android

        </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Aprovecha las formas de pago y beneficios" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Viajar es lo único que al comprar te hace mas rico, por eso te ofrecemos el medio de pago que mas te convenga. Puedes pagar en cuotas, con 2 tarjetas o en efectivo
        </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Gestiona tus reservas desde Mis Viajes" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Antes o durante tu viaje, puedes consultar toda la información de tus reservas desde Mis Viajes en la web o la app. puedes gestionar cambios, hacer el web check-in y ¡mucho más!
        </Card>
                        </Col>
                    </Row>

                </div>
            </Row>

            <Row style={{ backgroundColor: '#EEEEEE', height: 500 }}>
                <div className="container">
                    <h3 className="texto-calistoga" style={{ marginTop: 15, color: 'black', marginBottom: 15 }}>Descubre tu Tour</h3>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Compra tu viaje fácil y rápidamente" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Consigue todo lo que necesitas para tu próximo viaje de forma simple, ágil y segura desde nuestra web o app gratuita, disponible para iOS y Android

        </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Aprovecha las formas de pago y beneficios" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Viajar es lo único que al comprar te hace mas rico, por eso te ofrecemos el medio de pago que mas te convenga. Puedes pagar en cuotas, con 2 tarjetas o en efectivo
        </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Gestiona tus reservas desde Mis Viajes" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Antes o durante tu viaje, puedes consultar toda la información de tus reservas desde Mis Viajes en la web o la app. puedes gestionar cambios, hacer el web check-in y ¡mucho más!
        </Card>
                        </Col>
                    </Row>

                </div>
            </Row>

            <Row style={{ backgroundColor: '#EEEEEE', height: 500 }}>
                <div className="container">
                    <h3 className="texto-roboto" style={{ marginTop: 15, color: 'black', marginBottom: 15 }}>Recomendaciones para viajar con tranquilidad</h3>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Compra tu viaje fácil y rápidamente" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Consigue todo lo que necesitas para tu próximo viaje de forma simple, ágil y segura desde nuestra web o app gratuita, disponible para iOS y Android

        </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Aprovecha las formas de pago y beneficios" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Viajar es lo único que al comprar te hace mas rico, por eso te ofrecemos el medio de pago que mas te convenga. Puedes pagar en cuotas, con 2 tarjetas o en efectivo
        </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Gestiona tus reservas desde Mis Viajes" style={{ borderRadius: 20, height: 300 }} bordered={false}>
                                Antes o durante tu viaje, puedes consultar toda la información de tus reservas desde Mis Viajes en la web o la app. puedes gestionar cambios, hacer el web check-in y ¡mucho más!
        </Card>
                        </Col>
                    </Row>

                </div>
            </Row>

         
                <Carousel autoplay>
                    <div>
                        <img src="https://i.pinimg.com/originals/44/36/18/4436181ef01c67fc45a84f203bca5e07.jpg"></img>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <Footer>footer</Footer>
        </div>
    )
}

export default InicioWebsite;