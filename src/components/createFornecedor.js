import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function Create() {
    const [data, setData] = useState({
        nome: '',
        cnpjOuCpf: '',
        email: '',
        rg: '',
        dataNascimento: '',
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
            if (name === 'cnpjOuCpf') {
                // Remover caracteres especiais do valor
                updatedValue = value.replace(/[-./]/g, '');

                // Verificar o comprimento do valor e formatá-lo adequadamente
                if (updatedValue.length <= 11) {
                    updatedValue = updatedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else {
                    updatedValue = updatedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                }
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
            console.log('Dados a serem enviados:', data); // Adicione este console.log

            const response = await axios.post(
                'http://localhost:8080/fornecedor',
                {
                    nome: data.nome,
                    cnpjOuCpf: data.cnpjOuCpf,
                    email: data.email,
                    rg: data.rg,
                    dataNascimento: data.dataNascimento,
                    endereco: {
                        cep: data.endereco.cep,
                        logradouro: data.endereco.logradouro,
                        bairro: data.endereco.bairro,
                        cidade: data.endereco.cidade,
                        uf: data.endereco.uf
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Resposta do servidor:', response.data);

            setData({
                nome: '',
                cnpjOuCpf: '',
                email: '',
                rg: '',
                dataNascimento: '',
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

    const getDocumentoMask = (valor) => {
        if (valor && valor.length) {
            if (valor.length <= 11) {
                return '999.999.999-99'; // CPF
            } else {
                return '99.999.999/9999-99'; // CNPJ
            }
        }
        return '999.999.999-99'; // Padrão para um novo campo
    };


    return (
        <div>
            <div className="ui inverted segment">
                <form className="ui inverted form" onSubmit={addUser}>
                    <div className="equal width fields">
                        <div className="field">
                            <label>Nome</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    value={data.nome}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>CNPJ ou CPF</label>
                            <div className="ui fluid input">
                                <InputMask
                                    mask={data.cnpjOuCpf.length <= 11 ? '999.999.999-99' : '99.999.999/9999-99'}
                                    maskChar={null}
                                    size="large"
                                    type="text"
                                    placeholder="CNPJ ou CPF"
                                    name="cnpjOuCpf"
                                    value={data.cnpjOuCpf}
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
                            <label>Email</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>RG</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="RG"
                                    name="rg"
                                    value={data.rg}
                                    onChange={valueInput}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Data de Nascimento</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="date"
                                    placeholder="Data de Nascimento"
                                    name="dataNascimento"
                                    value={data.dataNascimento}
                                    onChange={valueInput}
                                />
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
