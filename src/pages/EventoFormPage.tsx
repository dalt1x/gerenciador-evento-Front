import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventoService } from '../services/eventoService';
import MainLayout from '../components/layouts/MainLayout';
import EventoForm from '../components/eventos/EventoForm';
import AlertMessage from '../components/ui/AlertMessage';
import { useAlert } from '../hooks/useAlert';

const EventoFormPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { alert, showSuccess, showError, hideAlert } = useAlert();
  
  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await eventoService.createEvento(data);
      showSuccess('Evento criado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any) {
      showError(error.message || 'Erro ao criar evento');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Novo Evento</h2>
        
        {alert.isVisible && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
            className="mb-6"
          />
        )}
        
        <div className="card">
          <EventoForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventoFormPage;