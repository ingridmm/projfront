import { Segment, Form, Input, Button, Header, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function View() {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`http://localhost:8080/empresa/${id}`)
                .then((response) => {
                    setFormData(response.data[0]);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                });
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {formData && (
                <Segment inverted>
                    <Form inverted key={formData.id}>
                        <Header inverted as='h2'>
                            <Icon name='archive' />
                            <Header.Content>Empresa {formData.id}</Header.Content>
                        </Header>
                        <Form.Field>
                            <label>Nome Fantasia</label>
                            <div className="ui fluid input">
                                <Input size="large" placeholder='Read only' readOnly value={formData.nomeFantasia} />
                            </div>
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>CNPJ</label>
                                <Input size="large" placeholder='Read only' readOnly value={formData.cnpj} />
                            </Form.Field>
                            <Form.Field>
                                <label>Ativo</label>
                                <Input size="large" placeholder='Read only' readOnly value={formData.ativo ? 'Ativo' : 'Desabilitado'} />
                            </Form.Field>
                        </Form.Group>
                        <Button onClick={() => window.history.back()}>Voltar</Button>
                    </Form>
                </Segment>
            )}
        </div>
    );
}
