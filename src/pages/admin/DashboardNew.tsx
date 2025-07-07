import React from 'react';
import PagePlaceholder from '../PagePlaceholder';

const DashboardNew = () => {
  return (
    <PagePlaceholder
      title="Admin Dashboard"
      description="Manage your website content and settings"
      icon="📊"
      isAdmin={true}
    />
  );
};

export default DashboardNew;