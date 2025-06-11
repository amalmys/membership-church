import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function MemberForm() {
  const [show, setShow] = useState(false);
  const [member, setMember] = useState({});

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/members`, member, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
    setShow(false);
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Add Member</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>MGOCSM AND OCYM Annual Membership Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control name="firstName" placeholder="First Name" onChange={handleChange} />
            <Form.Control name="lastName" placeholder="Last Name" onChange={handleChange} className="mt-2" />
            <Form.Control type="date" name="dob" placeholder="DOB" onChange={handleChange} className="mt-2" />
            <Form.Control name="age" placeholder="Age" onChange={handleChange} className="mt-2" />
            <div className="mt-2">
              Gender:
              <Form.Check inline label="Male" name="gender" type="radio" value="male" onChange={handleChange} />
              <Form.Check inline label="Female" name="gender" type="radio" value="female" onChange={handleChange} />
            </div>
            <Form.Control name="phone" placeholder="Phone" onChange={handleChange} className="mt-2" />
            <Form.Control name="email" placeholder="Email" onChange={handleChange} className="mt-2" />
            <Form.Control name="bloodGroup" placeholder="Blood Group" onChange={handleChange} className="mt-2" />
            <Form.Control name="occupation" placeholder="Occupation" onChange={handleChange} className="mt-2" />
            <Form.Control name="address" placeholder="Address" onChange={handleChange} className="mt-2" />
            <Form.Control name="fatherName" placeholder="Father's Name" onChange={handleChange} className="mt-2" />
            <Form.Control name="motherName" placeholder="Mother's Name" onChange={handleChange} className="mt-2" />
            <Form.Control name="parentContact" placeholder="Parent Contact Number" onChange={handleChange} className="mt-2" />
            <Form.Control name="homeParish" placeholder="Home Parish" onChange={handleChange} className="mt-2" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberForm;
