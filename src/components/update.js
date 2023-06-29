import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Button, Input, Form, Segment, Header, Icon } from 'semantic-ui-react';

export default function Update() {

  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:8080/empresa/${id}`)
        .then((response) => {
          setFormData(response.data[0]);
          setNomeFantasia(response.data[0].nomeFantasia);
          setCnpj(response.data[0].cnpj);
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
      .put(`http://localhost:8080/empresa/${id}`, {
        nomeFantasia,
        cnpj,
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
              <Icon name='archive' />
              <Header.Content>Empresa {formData.id}</Header.Content>
            </Header>
            <Form.Field>
              <label>Nome Fantasia</label>
              <div className='ui fluid input'>
                <Input
                  size='large'
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                />
              </div>
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>CNPJ</label>
                <Input
                  size='large'
            
                  value={cnpj}
                />
              </Form.Field>
              <Form.Field>
                <label>Ativo</label>
                <Input
                  size='large'
                  placeholder='Read only'
                  readOnly
                  value={formData.ativo ? 'Ativo' : 'Desabilitado'}
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
