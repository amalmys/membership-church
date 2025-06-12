import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShow(false);
    toast.success('Logged out successfully!');
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <>
      <Button variant="outline-danger" onClick={() => setShow(true)}>
        Logout
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutButton;
