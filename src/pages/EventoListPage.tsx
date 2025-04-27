import React, { useEffect, useState } from 'react';
import { eventoService } from '../services/eventoService';
import { Evento } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AlertMessage from '../components/ui/AlertMessage';
import EventoCard from '../components/eventos/EventoCard';
import MainLayout from '../components/layouts/MainLayout';
import { useAlert } from '../hooks/useAlert';

const EventoListPage: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { alert, showError, hideAlert } = useAlert();
  
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setIsLoading(true);
        const data = await eventoService.getEventos();
        setEventos(data);
      } catch (error: any) {
        showError(error.message || 'Erro ao carregar eventos');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventos();
  }, []);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Eventos</h2>
        
        {alert.isVisible && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
          />
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : eventos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Nenhum evento encontrado</p>
            <p className="text-gray-500">Clique em "Novo Evento" para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EventoListPage;