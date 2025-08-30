import React, { useState } from 'react';
import { useClients } from '../../hooks/useDatabaseIntegration';
import { Loader2 } from 'lucide-react';
import ClientForm from '../../components/admin/clients/ClientForm';
import ClientCard from '../../components/admin/clients/ClientCard';
import type { Client } from '../../types/client';

const ClientsManager = () => {
  const { data: clients, create, update, remove, loading, error } = useClients();
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleSubmit = (data: Omit<Client, 'id'>) => {
    if (editingClient) {
      update(editingClient.id, data);
      setEditingClient(null);
    } else {
      create(data);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#04968d]" />
          <span className="ml-2 text-gray-600">Loading clients...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error loading clients: {error}</p>
        </div>
      </div>
    );
  }

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
            {(clients || []).map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={setEditingClient}
                onDelete={remove}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsManager;