import React from 'react';
import MemberForm from '../components/MemberForm';
import MemberTable from '../components/MemberTable';

function HomePage() {
  return (
    <div className="container mt-5">
      <h2>MGOCSM AND OCYM Annual Membership Form</h2>
      <MemberForm />
      <MemberTable />
    </div>
  );
}

export default HomePage;
