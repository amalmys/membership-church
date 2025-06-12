import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';


function MemberTable() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editModalShow, setEditModalShow] = useState(false);
  const [editData, setEditData] = useState({});
    const [showDelete, setShowDelete] = useState(null);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/members`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
    setMembers(res.data);
  };

  const handleDelete = (id) => {
    setShowDelete(id);
  };

  const proceedToDelete = async ()=>{
 await axios.delete(`${process.env.REACT_APP_API_URL}/members/${showDelete}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
    fetchData();
    setShowDelete(null);
    toast.error('Member deleted.');
  }

 const exportToExcel = () => {
  const customHeaders = [
    "First Name",
    "Last Name",
    "DOB",
    "Age",
    "Gender",
    "Phone Number",
    "Email ID",
    "Blood Group",
    "Occupation",
    "Address",
    "Father's Name",
    "Mother's Name",
    "Parent Contact Number",
    "Home Parish"
  ];

  const exportData = members.map(member => ({
    "First Name": member.firstName,
    "Last Name": member.lastName,
    "DOB": member.dob ? new Date(member.dob).toLocaleDateString() : '',
    "Age": member.age,
    "Gender": member.gender,
    "Phone Number": member.phone,
    "Email ID": member.email,
    "Blood Group": member.bloodGroup,
    "Occupation": member.occupation,
    "Address": member.address,
    "Father's Name": member.fatherName,
    "Mother's Name": member.motherName,
    "Parent Contact Number": member.parentContact,
    "Home Parish": member.homeParish
  }));



  const worksheet = XLSX.utils.json_to_sheet(exportData, { header: customHeaders });

     worksheet['!cols'] = [
    { wch: 15 }, // First Name
    { wch: 15 }, // Last Name
    { wch: 12 }, // DOB
    { wch: 5 },  // Age
    { wch: 8 },  // Gender
    { wch: 15 }, // Phone Number
    { wch: 25 }, // Email ID
    { wch: 12 }, // Blood Group
    { wch: 20 }, // Occupation
    { wch: 30 }, // Address
    { wch: 20 }, // Father's Name
    { wch: 20 }, // Mother's Name
    { wch: 20 }, // Parent Contact Number
    { wch: 20 }, // Home Parish
  ];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
  XLSX.writeFile(workbook, "members.xlsx");
};

  const filteredMembers = members.filter(member =>
  Object.values(member).some(value =>
    value?.toString().toLowerCase().includes(search.toLowerCase())
  )
).sort((a, b) => {
      if (!sortField) return 0;
      const aField = a[sortField];
      const bField = b[sortField];
      if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
      if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const toggleSort = (field) => {
    setSortField(field);
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const openEditModal = (member) => {
    setEditData(member);
    setEditModalShow(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/members/${editData._id}`, editData,
      {  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
    setEditModalShow(false);
    fetchData();
    toast.info('Member details updated.');

  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-2">
        <Form.Control
          type="text"
          placeholder="Search by any field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>
     <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th onClick={() => toggleSort('firstName')} style={{ cursor: 'pointer' }}>First Name</th>
      <th onClick={() => toggleSort('lastName')} style={{ cursor: 'pointer' }}>Last Name</th>
      <th onClick={() => toggleSort('dob')} style={{ cursor: 'pointer' }}>DOB</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Blood Group</th>
      <th>Occupation</th>
      <th>Address</th>
      <th>Father's Name</th>
      <th>Mother's Name</th>
      <th>Parent Contact</th>
      <th>Home Parish</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.map(m => (
      <tr key={m._id}>
        <td>{m.firstName}</td>
        <td>{m.lastName}</td>
        <td>{m.dob ? new Date(m.dob).toLocaleDateString() : ''}</td>
        <td>{m.age}</td>
        <td>{m.gender}</td>
        <td>{m.phone}</td>
        <td>{m.email}</td>
        <td>{m.bloodGroup}</td>
        <td>{m.occupation}</td>
        <td>{m.address}</td>
        <td>{m.fatherName}</td>
        <td>{m.motherName}</td>
        <td>{m.parentContact}</td>
        <td>{m.homeParish}</td>
        <td>
          <Button variant="warning" size="sm" onClick={() => openEditModal(m)}>Edit</Button>{' '}
          <Button variant="danger" size="sm" onClick={() => handleDelete(m._id)}>Delete</Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

      <div className="d-flex justify-content-center">
        {[...Array(Math.ceil(filteredMembers.length / itemsPerPage))].map((_, i) => (
          <Button key={i} variant={i + 1 === currentPage ? 'primary' : 'light'} onClick={() => paginate(i + 1)} className="mx-1">
            {i + 1}
          </Button>
        ))}
      </div>

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
  <Form.Group className="mb-2">
    <Form.Label>First Name</Form.Label>
    <Form.Control name="firstName" value={editData.firstName || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Last Name</Form.Label>
    <Form.Control name="lastName" value={editData.lastName || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Date of Birth</Form.Label>
    <Form.Control type="date" name="dob" value={editData.dob ? editData.dob.substring(0, 10) : ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Age</Form.Label>
    <Form.Control type="number" name="age" value={editData.age || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Gender</Form.Label>
    <div>
      <Form.Check
        inline
        label="Male"
        name="gender"
        type="radio"
        id="gender-male"
        value="male"
        checked={editData.gender === 'male'}
        onChange={handleEditChange}
      />
      <Form.Check
        inline
        label="Female"
        name="gender"
        type="radio"
        id="gender-female"
        value="female"
        checked={editData.gender === 'female'}
        onChange={handleEditChange}
      />
    </div>
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control name="phone" value={editData.phone || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Email ID</Form.Label>
    <Form.Control type="email" name="email" value={editData.email || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Blood Group</Form.Label>
    <Form.Control name="bloodGroup" value={editData.bloodGroup || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Occupation</Form.Label>
    <Form.Control name="occupation" value={editData.occupation || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Address</Form.Label>
    <Form.Control name="address" value={editData.address || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Father's Name</Form.Label>
    <Form.Control name="fatherName" value={editData.fatherName || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Mother's Name</Form.Label>
    <Form.Control name="motherName" value={editData.motherName || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Parent Contact Number</Form.Label>
    <Form.Control name="parentContact" value={editData.parentContact || ''} onChange={handleEditChange} />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Home Parish</Form.Label>
    <Form.Control name="homeParish" value={editData.homeParish || ''} onChange={handleEditChange} />
  </Form.Group>
</Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>

            <Modal show={showDelete} onHide={() => setShowDelete(null)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDelete(null)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={proceedToDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  );
}

export default MemberTable;
