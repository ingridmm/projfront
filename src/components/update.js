import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Button, Input } from 'semantic-ui-react';
import InputMask from 'react-input-mask';

export default function Update() {
    let history = useHistory();
    

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const [id, setID] = useState(null);

useEffect(() => {
        setID(localStorage.getItem('ID'))
        setNomeFantasia(localStorage.setItem('Nome Fantasia', nomeFantasia));
        setCnpj(localStorage.setItem('CNPJ', cnpj));
        
}, []);

    const updateAPIData = () => {
        axios
            .put(`http://localhost:8080/empresa/${id}`, {
                nomeFantasia,
                cnpj,
                endereco,
                cep,
                logradouro,
                bairro,
                cidade,
                uf,
            })
            .then(() => {
                history.push('/read');
            })
            .catch((error) => {
                console.log('Error updating data:', error);
            });
    };

    return (
        <div>
            <div className="ui inverted segment">
                <form className="ui inverted form">
                    <div className="equal width fields">
                        <div className="field">
                            <label>Nome Fantasia</label>
                            <div className="ui fluid input">
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Nome"
                                    name="nomeFantasia"
                                    value={nomeFantasia}
                                    onChange={(e) => setNomeFantasia(e.target.value)}
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
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
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
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
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
                                    value={logradouro}
                                    onChange={(e) => setLogradouro(e.target.value)}
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
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
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
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
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
                                    value={uf}
                                    onChange={(e) => setUf(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type='submit' onClick={updateAPIData}>Update</Button>
                </form>
            </div>
        </div>
    );
}
