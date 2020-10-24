import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { DownloadOutlined } from '@ant-design/icons';
const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

function AgregarHuespedes() {
    const [form] = Form.useForm();
    const history = useHistory();
    const redireccionRuta = () => {
        let path = 'detalleTour';
        history.push(path);
    }
    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };
    return (
        <div className="container">
            <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                {/* <Form.Item name="area" label="Area" rules={[{ required: true, message: 'Missing area' }]}>
                    <Select options={areas} onChange={handleChange} />
                </Form.Item> */}
                <h1 className="texto-calistoga">Registra tus acompompañantes</h1>
                <Form.List name="sights">
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} align="start">
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    label="Nombre"
                                                    name={[field.name, 'sight']}
                                                    fieldKey={[field.fieldKey, 'sight']}
                                                    rules={[{ required: true, message: 'Missing sight' }]}
                                                >
                                                   <Input />
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Apellido"
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                            rules={[{ required: true, message: 'Missing price' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Teléfono"
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                            rules={[{ required: true, message: 'Missing price' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Correo"
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                            rules={[{ required: true, message: 'Missing price' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        <PlusOutlined  className="texto-calistoga"/> Añadir Acompompañantes
                  </Button>
                                </Form.Item>
                            </>
                        );
                    }}
                </Form.List>

                <Form.Item>
                <Button type="primary" shape="round"  htmlType="submit" icon={<DownloadOutlined />} size={'large'}>
          Siguiente
        </Button>
          {/* <Button onClick={redireccionRuta} type="primary">Omitir</Button> */}
          <Button type="primary" onClick={redireccionRuta} className="ml-2" shape="round" icon={<DownloadOutlined />} size={'large'}>
          Omitir
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AgregarHuespedes;