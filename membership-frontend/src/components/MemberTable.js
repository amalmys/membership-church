import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import * as XLSX from 'xlsx';

function MemberTable() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editModalShow, setEditModalShow] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/members`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
    setMembers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/members/${id}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
    fetchData();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(members);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
    XLSX.writeFile(workbook, "members.xlsx");
  };

  const filteredMembers = members
    .filter(m => m.firstName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
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
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-2">
        <Form.Control
          type="text"
          placeholder="Search by First Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => toggleSort('firstName')} style={{ cursor: 'pointer' }}>Name</th>
            <th onClick={() => toggleSort('dob')} style={{ cursor: 'pointer' }}>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(m => (
            <tr key={m._id}>
              <td>{m.firstName} {m.lastName}</td>
              <td>{new Date(m.dob).toLocaleDateString()}</td>
              <td>{m.phone}</td>
              <td>{m.email}</td>
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
            <Form.Control name="firstName" value={editData.firstName || ''} onChange={handleEditChange} className="mb-2" />
            <Form.Control name="lastName" value={editData.lastName || ''} onChange={handleEditChange} className="mb-2" />
            <Form.Control name="phone" value={editData.phone || ''} onChange={handleEditChange} className="mb-2" />
            <Form.Control name="email" value={editData.email || ''} onChange={handleEditChange} className="mb-2" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberTable;
