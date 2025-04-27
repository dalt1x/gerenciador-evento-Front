import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Evento } from '../../types';
import { formatDateInput } from '../../utils/date';

// Schema de validação com Zod
const eventoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  data: z.string().min(1, 'Data é obrigatória'),
  local: z.string().min(3, 'Local deve ter pelo menos 3 caracteres'),
  organizador: z.string().min(3, 'Organizador deve ter pelo menos 3 caracteres'),
});

type EventoFormData = z.infer<typeof eventoSchema>;

interface EventoFormProps {
  evento?: Evento;
  onSubmit: (data: EventoFormData) => Promise<void>;
  isLoading: boolean;
}

const EventoForm: React.FC<EventoFormProps> = ({
  evento,
  onSubmit,
  isLoading,
}) => {
  const isEditMode = !!evento;
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventoFormData>({
    resolver: zodResolver(eventoSchema),
    defaultValues: {
      nome: evento?.nome || '',
      descricao: evento?.descricao || '',
      data: evento?.data ? formatDateInput(evento.data) : '',
      local: evento?.local || '',
      organizador: evento?.organizador || '',
    },
  });
  
  const onCancel = () => {
    navigate(isEditMode ? `/eventos/${evento.id}` : '/');
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nome do Evento"
          placeholder="Digite o nome do evento"
          {...register('nome')}
          error={errors.nome?.message}
        />
        
        <Input
          label="Data e Hora"
          type="datetime-local"
          {...register('data')}
          error={errors.data?.message}
        />
        
        <Input
          label="Local"
          placeholder="Digite o local do evento"
          {...register('local')}
          error={errors.local?.message}
        />
        
        <Input
          label="Organizador"
          placeholder="Digite o nome do organizador"
          {...register('organizador')}
          error={errors.organizador?.message}
        />
      </div>
      
      <TextArea
        label="Descrição"
        placeholder="Digite a descrição do evento"
        {...register('descricao')}
        error={errors.descricao?.message}
        rows={4}
      />
      
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          icon={<X />}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          isLoading={isLoading}
          icon={<Save />}
        >
          {isEditMode ? 'Atualizar' : 'Criar'} Evento
        </Button>
      </div>
    </form>
  );
};

export default EventoForm;