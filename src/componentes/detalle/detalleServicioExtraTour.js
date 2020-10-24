import React from 'react';
import { Button, Card, Row } from 'antd';
import { useHistory } from "react-router-dom";
const { Meta } = Card;
function ServicioExtraTour() {
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleTransporte';
        history.push(path);
    }
    return (
        <div className="container">
            <h1 className="texto-calistoga">Tours</h1>
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

export default ServicioExtraTour;