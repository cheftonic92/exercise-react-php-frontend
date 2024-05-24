import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { RiUserAddFill } from "react-icons/ri";
import ListUser from './components/ListUser';
import Sidebar from './components/SideBar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState("");
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarAction, setSidebarAction] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  function handleCloseSidebar(){setShowSidebar(false)};
  function handleShowSidebar(action, user = null)  {
    setSidebarAction(action);
    setSelectedUser(user);
    setShowSidebar(true);
  };

  async function searchUser() {
    if (!user) {
      toast.error("Please enter a user name.");
      return;
    }
    try {
      const response = await axios.post('http://localhost/exercise-php-react-backend/api/users/GetUserByName.php', { name: user });
      setData(response.data);
    } catch (error) {
      console.error("There was an error!", error);
      toast.error('Error fetching user');
    }
  }

  async function getAllUsers() {
    try {
      const response = await axios.get('http://localhost/exercise-php-react-backend/api/users/GetAll.php');
      setData(response.data);
    } catch (error) {
      console.error("There was an error!", error);
      toast.error('Error fetching users');
    }
  }

  function handleOrderBy(field) {
    const sortedData = [...data];
    sortedData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    setData(sortedData);
  };

  useEffect(() => {
    getAllUsers(); // Llama a getAllUsers cuando la aplicación se monta por primera vez
  }, []);

  return (
    <Container fluid>
      <Row className='mb-3'>
      </Row>
      <Row className='mb-3'>
        <Col>
        <Button className="btn btn-block d-block d-md-none" variant="outline-secondary" id="button-addon2" onClick={() => handleShowSidebar('create')}>
        <RiUserAddFill /> 
          </Button>
          {/* El botón se muestra como texto en dispositivos no móviles */}
          <Button className="btn btn-block d-none d-md-block" variant="outline-secondary" id="button-addon2" onClick={() => handleShowSidebar('create')}>
            Create a new User
          </Button>
        </Col>
        <Col xs={10} md={4}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search a user"
              aria-label="Search a user"
              aria-describedby="basic-addon2"
              onChange={event => setUser(event.target.value)}
              value={(user)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={searchUser}>
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col md={4}>
        </Col>
      </Row>

      <ToastContainer />

      {data && data.length > 0 && (
        <ListUser data={data} onEdit={handleShowSidebar} onDelete={handleShowSidebar} onOrderBy={handleOrderBy} onDeleteAll={handleShowSidebar}></ListUser>
      )}

      <Sidebar
        show={showSidebar}
        handleClose={handleCloseSidebar}
        action={sidebarAction}
        user={selectedUser}
        refreshUsers={getAllUsers}
      />
    </Container>
  );
}

export default App;