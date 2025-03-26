import React, { useState } from 'react';
import { useClientStore } from '../../store/clientStore';
import ClientForm from '../../components/admin/clients/ClientForm';
import ClientCard from '../../components/admin/clients/ClientCard';
import type { Client } from '../../types/client';

const ClientsManager = () => {
  const { clients, addClient, updateClient, deleteClient } = useClientStore();
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleSubmit = (data: Omit<Client, 'id'>) => {
    if (editingClient) {
      updateClient(editingClient.id, data);
      setEditingClient(null);
    } else {
      addClient(data);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Clients</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingClient ? 'Edit Client' : 'Add New Client'}
          </h2>
          <ClientForm
            client={editingClient || undefined}
            onSubmit={handleSubmit}
            onCancel={editingClient ? () => setEditingClient(null) : undefined}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Clients</h2>
          <div className="space-y-4">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={setEditingClient}
                onDelete={deleteClient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsManager;