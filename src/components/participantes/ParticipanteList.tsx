import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Participante } from '../../types';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import AlertMessage from '../ui/AlertMessage';

interface ParticipanteListProps {
  participantes: Participante[];
  isLoading: boolean;
  onDelete: (id: number) => Promise<void>;
  isDeleteLoading: boolean;
  error?: string;
}

const ParticipanteList: React.FC<ParticipanteListProps> = ({
  participantes,
  isLoading,
  onDelete,
  isDeleteLoading,
  error,
}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <AlertMessage
        type="error"
        message={error}
      />
    );
  }
  
  if (participantes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Nenhum participante cadastrado para este evento.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-gray-200">
        <thead className="text-xs uppercase bg-dark-300">
          <tr>
            <th scope="col" className="px-6 py-3">Nome</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Telefone</th>
            <th scope="col" className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((participante) => (
            <tr 
              key={participante.id} 
              className="border-b border-dark-300 hover:bg-dark-300"
            >
              <td className="px-6 py-4 font-medium">{participante.nome}</td>
              <td className="px-6 py-4">{participante.email}</td>
              <td className="px-6 py-4">{participante.telefone || '-'}</td>
              <td className="px-6 py-4 text-right">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(participante.id)}
                  isLoading={isDeleteLoading && deletingId === participante.id}
                  icon={<Trash2 className="h-4 w-4" />}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipanteList;