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
            .get('http://localhost:8080/fornecedor')
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
            .delete(`http://localhost:8080/fornecedor/${itemToDelete}`)
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
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>CNPJ</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Ações</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>
                                    <Link to={`/viewFornecedor/${data.id}`}>{data.nome}</Link>
                                </Table.Cell>
                                <Table.Cell>{data.cnpjOuCpf}</Table.Cell>
                                <td>
                                    <Link to={`/updateFornecedor/${data.id}`}>
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
            <Link to={`/createFornecedor/`}>
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
