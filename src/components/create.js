import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function Create() {
    const [data, setData] = useState({
        nomeFantasia: '',
        cnpj: '',
        endereco: {
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: ''
        }
    });

    const valueInput = (e) => {
        const { name, value } = e.target;

        let updatedValue = value;

        if (name.includes('endereco.')) {
            const enderecoField = name.split('.')[1];
            setData((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    [enderecoField]: updatedValue
                }
            }));
        } else {
            if (name === 'cnpj' || name === 'endereco.cep') {
                updatedValue = value.replace(/[-./]/g, '');
            }

            setData((prevState) => ({
                ...prevState,
                [name]: updatedValue
            }));
        }

        if (name === 'endereco.cep') {
            fetchAddressData(updatedValue);
        }
    };

    const fetchAddressData = async (cep) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/cep/${cep}`);
          const { logradouro, bairro, cidade, uf } = response.data;
          console.log(response.data);

      
          setData((prevState) => ({
            ...prevState,
            endereco: {
              ...prevState.endereco,
              logradouro,
              bairro,
              cidade,
              uf
            }
          }));
        } catch (error) {
          console.error(error);
        }
      };

    const addUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8080/empresa',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(response.data);

            setData({
                nomeFantasia: '',
                cnpj: '',
                endereco: {
                    cep: '',
                    logradouro: '',
                    bairro: '',
                    cidade: '',
                    uf: ''
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="ui inverted segment">
                <form className="ui inverted form" onSubmit={addUser}>
                    <div className="equal width fields">
                        <div className="field">
                            <label>Nome Fantasia</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Nome"
                                    name="nomeFantasia"
                                    value={data.nomeFantasia}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>CNPJ</label>
                            <div className="ui fluid input">
                                <InputMask
                                    mask="99.999.999/9999-99"
                                    maskChar={null}
                                    size="large"
                                    type="text"
                                    placeholder="CNPJ"
                                    name="cnpj"
                                    value={data.cnpj}
                                    onChange={valueInput}
                                >
                                    {(inputProps) => (
                                        <Input
                                            fluid
                                            inputComponent="input"
                                            {...inputProps}
                                        />
                                    )}
                                </InputMask>

                            </div>
                        </div>
                    </div>
                    <div className="equal width fields">
                        <div className="field">
                            <label>CEP</label>
                            <div className="ui fluid input">
                                <InputMask
                                    mask="99999-999"
                                    maskChar={null}
                                    size="large"
                                    type="text"
                                    placeholder="CEP"
                                    name="endereco.cep"
                                    value={data.endereco.cep}
                                    onChange={valueInput}
                                >
                                    {(inputProps) => (
                                        <Input
                                            fluid
                                            inputComponent="input"
                                            {...inputProps}
                                        />
                                    )}
                                </InputMask>

                            </div>
                        </div>
                        <div className="field">
                            <label>Logradouro</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Logradouro"
                                    name="endereco.logradouro"
                                    value={data.endereco.logradouro}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="equal width fields">
                        <div className="field">
                            <label>Bairro</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Bairro"
                                    name="endereco.bairro"
                                    value={data.endereco.bairro}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Cidade</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Cidade"
                                    name="endereco.cidade"
                                    value={data.endereco.cidade}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>UF</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="UF"
                                    name="endereco.uf"
                                    value={data.endereco.uf}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Cadastrar</Button>
                </form>
            </div>
        </div>
    );
}
