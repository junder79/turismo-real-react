import React, { useState, useEffect } from 'react';
import { Modal, Spin, Row ,List} from 'antd';
import { BlockOutlined} from '@ant-design/icons';



function ModalAcondicionados(objeto) {




    const showModal = () => {
        objeto.setEstadoAcond(true);
    };
    const handleOk = e => {
        console.log(e);
        objeto.setEstadoAcond(false);
        // objeto.setImagenD([]);
        objeto.setEstadoCargaA(false);
    };

    const handleCancel = e => {
        console.log(e);
        objeto.setEstadoAcond(false);
        // objeto.setImagenD([]);
        objeto.setEstadoCargaA(false);
    };


    return (
        <Modal
            title="Acondicionados"
            visible={objeto.estadoAcond}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
        >
            {
                !objeto.estadoCargaA ?
                    <Row justify={'center'}>
                        <Spin size="large" />
                    </Row>
                    :
                    <List
                        itemLayout="horizontal"
                        dataSource={objeto.acondicionadoSelect}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<BlockOutlined />}
                                    title={<a >{item.NOMBREACONDI}</a>}
                                   
                                />
                            </List.Item>
                        )}
                    />
            }

        </Modal >
    )
}

export default ModalAcondicionados;