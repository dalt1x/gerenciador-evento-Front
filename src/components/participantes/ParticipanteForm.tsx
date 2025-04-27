import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UserPlus } from 'lucide-react';

// Schema de validação para participante
const participanteSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
});

type ParticipanteFormData = z.infer<typeof participanteSchema>;

interface ParticipanteFormProps {
  eventoId: number;
  onSubmit: (data: ParticipanteFormData & { eventoId: number }) => Promise<void>;
  isLoading: boolean;
}

const ParticipanteForm: React.FC<ParticipanteFormProps> = ({
  eventoId,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParticipanteFormData>({
    resolver: zodResolver(participanteSchema),
  });
  
  const handleFormSubmit = async (data: ParticipanteFormData) => {
    await onSubmit({ ...data, eventoId });
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Nome"
          placeholder="Nome do participante"
          {...register('nome')}
          error={errors.nome?.message}
        />
        
        <Input
          label="Email"
          placeholder="email@exemplo.com"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <Input
          label="Telefone (opcional)"
          placeholder="(00) 00000-0000"
          {...register('telefone')}
          error={errors.telefone?.message}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          icon={<UserPlus />}
        >
          Adicionar Participante
        </Button>
      </div>
    </form>
  );
};

export default ParticipanteForm;