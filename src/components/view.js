import { Form, Input, Button } from 'semantic-ui-react';
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
                <Form key={formData.id}>
                    <Form.Field>
                        <label>Nome Fantasia</label>
                        <Input disabled value={formData.nomeFantasia} />
                    </Form.Field>
                    <Form.Field>
                        <label>CNPJ</label>
                        <Input disabled value={formData.cnpj} />
                    </Form.Field>
                    <Form.Field>
                        <label>Ativo</label>
                        <Input disabled value={formData.ativo ? 'Ativo' : 'Desabilitado'} />
                    </Form.Field>
                    <Button onClick={() => window.history.back()}>Voltar</Button>
                </Form>
            )}
        </div>
    );
}
