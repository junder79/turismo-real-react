import React from 'react';
import { Button, Card, Row } from 'antd';
import { useHistory } from "react-router-dom";
const { Meta } = Card;

function ServicioExtraTransporte(){
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleTotal';
        history.push(path);
    }
    return(
        <div className="container">
            <h1  className="texto-calistoga">Transportes que podrías hacer mas cómodo tu estadía</h1>
            <Button onClick={redireccionRuta} type="primary">Pagar</Button>
            <Row>
                <Card
                    className="ml-2"
                    hoverable
                    style={{ width: 240, borderRadius: 30 }}
                    cover={<img alt="example" style={{ borderRadius: 30 }} src="https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/26/2018/07/18150652/new-york-movies.jpg" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                    <Button onClick={redireccionRuta} type="primary">Ver más</Button>
                </Card>
                <Card
                    className="ml-2"
                    hoverable
                    style={{ width: 240, borderRadius: 30 }}
                    cover={<img alt="example" style={{ borderRadius: 30 }} src="https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/26/2018/07/18150652/new-york-movies.jpg" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                    <Button onClick={redireccionRuta} type="primary">Ver más</Button>
                </Card>
                <Card
                    className="ml-2"
                    hoverable
                    style={{ width: 240, borderRadius: 30 }}
                    cover={<img alt="example" style={{ borderRadius: 30 }} src="https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/26/2018/07/18150652/new-york-movies.jpg" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                    <Button onClick={redireccionRuta} type="primary">Ver más</Button>
                </Card>
                <Card
                    className="ml-2"
                    hoverable
                    style={{ width: 240, borderRadius: 30 }}
                    cover={<img alt="example" style={{ borderRadius: 30 }} src="https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/26/2018/07/18150652/new-york-movies.jpg" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                    <Button onClick={redireccionRuta} type="primary">Ver más</Button>
                </Card>
            </Row>
        </div>
    )
}

export default ServicioExtraTransporte;