import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

function Sidebar({ show, handleClose, action, user, refreshUsers}) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (action === 'update' && user) {
      setName(user.name);
      setLastname(user.lastname);
      setAge(user.age);
    } else if (action === 'delete' && user) {
      setName(user.name);
      setLastname(user.lastname);
      setAge(user.age);
    } else {
      setName('');
      setLastname('');
      setAge('');
    }
  }, [action, user]);

 async function handleSubmit() {
    if (action === 'create') {
      await createUser();
    } else if (action === 'update') {
      await updateUser();
    }
    handleClose();
    refreshUsers();
  };

  async function handleDelete() {
    if (action === 'delete') {
        await deleteUser();
      } else if (action === 'deleteAll') {
        await deleteAllUsers();
      }
      handleClose();
      refreshUsers();
    };

  async function createUser()  {
    try {
      const response = await axios.post('http://localhost/exercise-php-react-backend/api/users/CreateUser.php', {
        name,
        lastname,
        age
      });
      if (response.data.user) {
        toast.success('User created successfully');
      } else {
        toast.error('Error creating user');
      }
    } catch (error) {
      console.error("There was an error!", error);
      toast.error('Error creating user');
    }
  };

  async function updateUser() {
    try {
      const response = await axios.put(`http://localhost/exercise-php-react-backend/api/users/UpdateUser.php?id=${user.id}`, {
        name,
        lastname,
        age
      });
      if (response.data.user) {
        toast.success('User updated successfully');
      } else {
        toast.error('Error updating user');
      }
    } catch (error) {
      console.error("There was an error!", error);
      toast.error('Error updating user');
    }
  };

  async function deleteUser(){
    try {
      await axios.delete(`http://localhost/exercise-php-react-backend/api/users/DeleteUser.php?id=${user.id}`);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error("There was an error!", error);
      toast.error('Error deleting user');
    }
  };

  async function deleteAllUsers(){
    try {
      await axios.delete('http://localhost/exercise-php-react-backend/api/users/DeleteAll.php');
      toast.success('All users deleted successfully');
    } catch (error) {
      console.error("There was an error!", error);
      toast.error('Error deleting all users');
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {action === 'create' && 'Create a New User'}
          {action === 'update' && 'Update User'}
          {action === 'delete' && 'Delete User'}
          {action === 'deleteAll' && 'Delete All Users'}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {action !== 'delete' && action !== 'deleteAll' && (
          <>
            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
              <Form.Control type="text" placeholder="John" value={name} onChange={(e) => setName(e.target.value)} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3">
              <Form.Control type="text" placeholder="Doe" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Age" className="mb-3">
              <Form.Control type="number" placeholder="33" value={age} onChange={(e) => setAge(e.target.value)} required />
            </FloatingLabel>
            <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
              {action === 'create' && 'Submit'}
              {action === 'update' && 'Update'}
            </Button>
          </>
        )}
        {action === 'delete' && (
          <>
            <p>Are you sure you want to delete this user?</p>
            <Button variant="outline-danger" id="button-addon2" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
        {action === 'deleteAll' && (
          <>
            <p>Are you sure you want to delete all users?</p>
            <Button variant="outline-danger" id="button-addon2" onClick={handleDelete}>
              Delete All
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;