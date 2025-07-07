import React from 'react';
import PagePlaceholder from '../PagePlaceholder';

const AdminLoginNew = () => {
  return (
    <PagePlaceholder
      title="Admin Login"
      description="Access the administration dashboard"
      icon="🔐"
      isAdmin={false}
    />
  );
};

export default AdminLoginNew;