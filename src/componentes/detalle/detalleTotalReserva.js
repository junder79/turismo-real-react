import React from 'react';
import { Card, Row, Col, Button, Radio , Input  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { InfoCircleOutlined} from '@ant-design/icons';
function TotalReserva() {
    return (
        <div style={{ backgroundColor: '#EEEEEE' }} >
            <div className="container">
                <h5 className="texto-calistoga" >¡Falta poco! Completa tus datos y finaliza tu compra</h5>

                <Row gutter={[16, 16]}>
                    <Col span={8} >
                        <Card style={{ width: 300, backgroundColor: '#FFFFFF', height: 500, borderRadius: 30 }}>
                            <p>Detalle del pago</p>

                        </Card>
                    </Col>
                    <Col span={8} >
                        <Card style={{ width: 300, backgroundColor: '#FFFFFF', height: 500, borderRadius: 30 }}>
                            <p className="texto-calistoga">Detalle de la compra</p>
                            <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                            <hr></hr>
                        </Card>
                    </Col>
                    <Col span={8} >
                        <Row>
                            <Col span={16}>
                                <Card style={{ width: 400, backgroundColor: '#FFFFFF', height: 300, borderRadius: 30 }}>
                                    <p>Donde enviamos tus vouchers
Este email será fundamental para que gestiones tu reserva y recibas información importante de tu viaje.</p>
<Input disabled={true} placeholder="nicolascisterna@gmail.com" />
                                    <p>¡Quiero recibir las mejores ofertas!
Recibirás emails y llamados telefónicos de Despegar con las mejores promociones para tu viaje. Si no lo deseas, destilda este mensaje. Para más información consulta las políticas de privacidad.</p>
                                </Card>
                            </Col>
                            <Col span={16}>
                                <Card style={{ width: 400, backgroundColor: '#4300D2', color: 'white', marginTop: 10, height: 140, borderRadius: 30 }}>
                                    <p><InfoCircleOutlined />Ver política de cambios y cancelaciones</p>
                                    <Button type="primary" shape="round"  size={'large'}>
                                        Ver Condiciones
        </Button>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button type="primary" shape="round" size={'large'}>
                    Pagar Ahora
        </Button>
            </div>
        </div>
    )
}

export default TotalReserva;