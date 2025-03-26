import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Client } from '../../../types/client';

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientCard = ({ client, onEdit, onDelete }: ClientCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <img
          src={client.logo}
          alt={client.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="text-lg font-medium">{client.name}</h3>
          <p className="text-gray-600 mt-1">{client.description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(client)}
          className="text-[#04968d] hover:text-opacity-80"
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(client.id)}
          className="text-red-500 hover:text-opacity-80"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;