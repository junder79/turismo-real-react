import React, { useState, useEffect } from 'react';
import { Modal, Spin, Row } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};



function ModalGalleryImagen(objeto) {




    const showModal = () => {
        objeto.setEstado(true);
    };
    const handleOk = e => {
        console.log(e);
        objeto.setEstado(false);
        objeto.setImagenD([]);
        objeto.setEstadoCargaI(false);
    };

    const handleCancel = e => {
        console.log(e);
        objeto.setEstado(false);
        objeto.setImagenD([]);
        objeto.setEstadoCargaI(false);
    };


    return (
        <Modal
            title="Imagenes"
            visible={objeto.estado}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
        >
            {
                !objeto.estadoCargaI ?
                    <Row justify={'center'}>
                        <Spin size="large" />
                    </Row>
                    :
                    <Carousel>
                        {

                            objeto.imagenD.map((elemento, i) => (
                                <div>
                                    <img src={elemento.RUTAIMAGEN} />

                                </div>
                            ))
                        }


                    </Carousel>
            }

        </Modal >
    )
}

export default ModalGalleryImagen;