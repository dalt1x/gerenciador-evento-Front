import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Edit, 
  Trash, 
  UserPlus, 
  ArrowLeft
} from 'lucide-react';
import { eventoService } from '../services/eventoService';
import { participanteService } from '../services/participanteService';
import { Evento, Participante } from '../types';
import MainLayout from '../components/layouts/MainLayout';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AlertMessage from '../components/ui/AlertMessage';
import Modal from '../components/ui/Modal';
import EventoForm from '../components/eventos/EventoForm';
import ParticipanteForm from '../components/participantes/ParticipanteForm';
import ParticipanteList from '../components/participantes/ParticipanteList';
import { formatDate } from '../utils/date';
import { useAlert } from '../hooks/useAlert';

const EventoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventoId = Number(id);
  
  const [evento, setEvento] = useState<Evento | null>(null);
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEventoActionLoading, setIsEventoActionLoading] = useState(false);
  const [isParticipanteFormLoading, setIsParticipanteFormLoading] = useState(false);
  const [isParticipanteDeleteLoading, setIsParticipanteDeleteLoading] = useState(false);
  const [participanteError, setParticipanteError] = useState<string | undefined>();
  
  const { alert, showSuccess, showError, hideAlert } = useAlert();
  
  // Carregar dados do evento
  useEffect(() => {
    const fetchEventoData = async () => {
      try {
        setIsLoading(true);
        const eventoData = await eventoService.getEventoById(eventoId);
        setEvento(eventoData);
        fetchParticipantes();
      } catch (error: any) {
        showError(error.message || 'Erro ao carregar evento');
        setIsLoading(false);
      }
    };
    
    fetchEventoData();
  }, [eventoId]);
  
  // Buscar participantes
  const fetchParticipantes = async () => {
    try {
      const data = await participanteService.getParticipantesByEventoId(eventoId);
      setParticipantes(data);
      setParticipanteError(undefined);
    } catch (error: any) {
      setParticipanteError(error.message || 'Erro ao carregar participantes');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Atualizar evento
  const handleUpdateEvento = async (data: any) => {
    try {
      setIsEventoActionLoading(true);
      await eventoService.updateEvento(eventoId, data);
      
      // Atualizar os dados locais
      setEvento((prev) => prev ? { ...prev, ...data } : null);
      
      showSuccess('Evento atualizado com sucesso!');
      setIsEditModalOpen(false);
    } catch (error: any) {
      showError(error.message || 'Erro ao atualizar evento');
    } finally {
      setIsEventoActionLoading(false);
    }
  };
  
  // Excluir evento
  const handleDeleteEvento = async () => {
    try {
      setIsEventoActionLoading(true);
      await eventoService.deleteEvento(eventoId);
      showSuccess('Evento excluído com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any) {
      showError(error.message || 'Erro ao excluir evento');
      setIsEventoActionLoading(false);
    }
  };
  
  // Adicionar participante
  const handleAddParticipante = async (data: any) => {
    try {
      setIsParticipanteFormLoading(true);
      const novoParticipante = await participanteService.createParticipante(Number(id), {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      });
      setParticipantes([...participantes, novoParticipante]);
      showSuccess('Participante adicionado com sucesso!');
    } catch (error: any) {
      showError(error.message || 'Erro ao adicionar participante');
    } finally {
      setIsParticipanteFormLoading(false);
    }
  };
  
  // Remover participante
  const handleDeleteParticipante = async (participanteId: number) => {
    try {
      setIsParticipanteDeleteLoading(true);
      await participanteService.deleteParticipante(participanteId);
      setParticipantes(participantes.filter(p => p.id !== participanteId));
      showSuccess('Participante removido com sucesso!');
    } catch (error: any) {
      showError(error.message || 'Erro ao remover participante');
    } finally {
      setIsParticipanteDeleteLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </MainLayout>
    );
  }
  
  if (!evento) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Evento não encontrado</h2>
          <Link to="/" className="text-primary-500 hover:underline">
            Voltar para a lista de eventos
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-primary-500 hover:text-primary-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para a lista
          </Link>
          
          {alert.isVisible && (
            <AlertMessage
              type={alert.type}
              message={alert.message}
              onClose={hideAlert}
              className="mb-6"
            />
          )}
        </div>
        
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold">{evento.nome}</h2>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                icon={<Edit />}
                onClick={() => setIsEditModalOpen(true)}
              >
                Editar
              </Button>
              
              <Button
                variant="danger"
                size="sm"
                icon={<Trash />}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Excluir
              </Button>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">{evento.descricao}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-3 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Data e Hora</p>
                <p>{formatDate(evento.data)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Local</p>
                <p>{evento.local}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Organizador</p>
                <p>{evento.organizador}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary-500" />
              Participantes
            </h3>
            <span className="text-primary-500 text-sm font-medium">
              {participantes.length} {participantes.length === 1 ? 'participante' : 'participantes'}
            </span>
          </div>
          
          <div className="mb-8">
            <ParticipanteForm
              eventoId={eventoId}
              onSubmit={handleAddParticipante}
              isLoading={isParticipanteFormLoading}
            />
          </div>
          
          <div>
            <ParticipanteList
              participantes={participantes}
              isLoading={isLoading}
              onDelete={handleDeleteParticipante}
              isDeleteLoading={isParticipanteDeleteLoading}
              error={participanteError}
            />
          </div>
        </div>
      </div>
      
      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Evento"
      >
        <EventoForm
          evento={evento}
          onSubmit={handleUpdateEvento}
          isLoading={isEventoActionLoading}
        />
      </Modal>
      
      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Excluir Evento"
        size="sm"
      >
        <div className="text-center">
          <p className="mb-6">
            Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            
            <Button
              variant="danger"
              onClick={handleDeleteEvento}
              isLoading={isEventoActionLoading}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default EventoDetailPage;