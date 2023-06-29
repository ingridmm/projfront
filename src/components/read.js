import { Table, Button, Modal } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {

    const [APIData, setAPIData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('http://localhost:8080/empresa')
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            });
    };

    const onDelete = (id) => {
        setDeleteConfirmation(true);
        setItemToDelete(id);
    };

    const confirmDelete = () => {
        axios
            .delete(`http://localhost:8080/empresa/${itemToDelete}`)
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.log('Error deleting data:', error);
            })
            .finally(() => {
                setDeleteConfirmation(false);
                setItemToDelete(null);
            });
    };

    const cancelDelete = () => {
        setDeleteConfirmation(false);
        setItemToDelete(null);
    };

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nome Fantasia</Table.HeaderCell>
                        <Table.HeaderCell>CNPJ</Table.HeaderCell>
                        <Table.HeaderCell>Ativo</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Ações</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        const status = data.ativo ? 'Ativo' : 'Desabilitado';
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>
                                    <Link to={`/view/${data.id}`}>{data.nomeFantasia}</Link>
                                </Table.Cell>
                                <Table.Cell>{data.cnpj}</Table.Cell>
                                <Table.Cell>{status}</Table.Cell>
                                <td>
                                    <Link to={`/update/${data.id}`}>
                                        <Button>Update</Button>
                                    </Link>
                                </td>
                                <Table.Cell>
                                    <Button negative circular onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Link to={`/create/`}>
                <Button>Cadastrar </Button>
            </Link>
            <Modal open={deleteConfirmation} onClose={cancelDelete} size="tiny">
                <Modal.Header>Confirmar Exclusão</Modal.Header>
                <Modal.Content>
                    <p>Você tem certeza que deseja excluir este item?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={cancelDelete}>
                        Cancelar
                    </Button>
                    <Button positive onClick={confirmDelete}>
                        Confirmar
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}
