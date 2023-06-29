import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Button, Input, Form, Segment, Header, Icon } from 'semantic-ui-react';

export default function Update() {

    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');


    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`http://localhost:8080/fornecedor/${id}`)
                .then((response) => {
                    setFormData(response.data[0]);
                    setNome(response.data[0].nome);
                    setCnpj(response.data[0].cnpjOuCpf);

                    console.log(response.data);
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                });
        };

        fetchData();
    }, [id]);

    const updateAPIData = () => {
        axios
            .put(`http://localhost:8080/fornecedor/${id}`, {
                nome,
                cnpjOuCpf: cnpj,
            })
            .catch((error) => {
                console.log('Error updating data:', error);
            });
    };


    return (
        <div>
            {formData && (
                <Segment inverted>
                    <Form inverted key={formData.id}>
                        <Header inverted as='h2'>
                            <Icon name='box' />
                            <Header.Content>Fornecedor {formData.id}</Header.Content>
                        </Header>
                        <Form.Field>
                            <label>Nome</label>
                            <div className='ui fluid input'>
                                <Input
                                    size='large'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                            </div>
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>CNPJ/CPF</label>
                                <Input
                                    size='large'
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Button type='submit' onClick={updateAPIData}>
                            Update
                        </Button>
                    </Form>
                </Segment>
            )}
        </div>
    );
}
