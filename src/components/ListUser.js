import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaTrash, FaPencilAlt,FaAngleDown } from 'react-icons/fa';

function ListUser({ data, onEdit, onDelete, onOrderBy, onDeleteAll }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Name <Button variant="outline-secondary" onClick={() => onOrderBy('name')}>
          <FaAngleDown />
          </Button> </th>
          <th>Lastname <Button size='xs' variant="outline-secondary" onClick={() => onOrderBy('lastname')}>
            <FaAngleDown />
          </Button></th>
          <th>Age <Button variant="outline-secondary" onClick={() => onOrderBy('age')}>
            <FaAngleDown />
          </Button> </th>
          <th> <Button variant="outline-danger" onClick={() => onDeleteAll('deleteAll')}>
                <FaTrash />
              </Button> </th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.name} </td>
            <td>{user.lastname} </td>
            <td>{user.age} </td>
            <td>
              <Button variant="outline-primary" onClick={() => onEdit('update', user)}>
                <FaPencilAlt />
              </Button>
              <Button variant="outline-danger" onClick={() => onDelete('delete', user)}>
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ListUser;