import { apiRequest } from '../utils/api';
import { Participante } from '../types';

const BASE_PATH = '/participantes';

export const participanteService = {
  getParticipantesByEventoId: async (eventoId: number): Promise<Participante[]> => {
    const response = await apiRequest<Participante[]>({
      method: 'GET',
      url: `${BASE_PATH}/evento/${eventoId}`,
    });
    return response.data;
  },

  createParticipante: async (eventoId: number, participante: Omit<Participante, 'id' | 'eventoId'>): Promise<Participante> => {
    const response = await apiRequest<Participante>({
      method: 'POST',
      url: `/eventos/${eventoId}/participantes`,
      data: participante,
    });
    return response.data;
  },

  updateParticipante: async (id: number, participante: Omit<Participante, 'id'>): Promise<Participante> => {
    const response = await apiRequest<Participante>({
      method: 'PUT',
      url: `${BASE_PATH}/${id}`,
      data: participante,
    });
    return response.data;
  },

  deleteParticipante: async (id: number): Promise<void> => {
    await apiRequest<void>({
      method: 'DELETE',
      url: `${BASE_PATH}/${id}`,
    });
  },
};