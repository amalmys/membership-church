import React from 'react';
import MemberForm from '../components/MemberForm';
import MemberTable from '../components/MemberTable';
import LogoutButton from '../components/LogoutButton';

function HomePage() {
  return (
    <div className="container mt-5">
      <div style={{display:'flex',justifyContent:'space-between'}}><h2>MGOCSM AND OCYM Annual Membership Form</h2><LogoutButton/></div>
      <MemberForm />
      <MemberTable />
    </div>
  );
}

export default HomePage;
