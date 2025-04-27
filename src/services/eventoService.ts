import { apiRequest } from '../utils/api';
import { Evento } from '../types';

const BASE_PATH = '/eventos';

export const eventoService = {
  getEventos: async (): Promise<Evento[]> => {
    const response = await apiRequest<Evento[]>({
      method: 'GET',
      url: BASE_PATH,
    });
    return response.data;
  },

  getEventoById: async (id: number): Promise<Evento> => {
    const response = await apiRequest<Evento>({
      method: 'GET',
      url: `${BASE_PATH}/${id}`,
    });
    return response.data;
  },

  createEvento: async (evento: Omit<Evento, 'id'>): Promise<Evento> => {
    const response = await apiRequest<Evento>({
      method: 'POST',
      url: BASE_PATH,
      data: evento,
    });
    return response.data;
  },

  updateEvento: async (id: number, evento: Omit<Evento, 'id'>): Promise<Evento> => {
    const response = await apiRequest<Evento>({
      method: 'PUT',
      url: `${BASE_PATH}/${id}`,
      data: evento,
    });
    return response.data;
  },

  deleteEvento: async (id: number): Promise<void> => {
    await apiRequest<void>({
      method: 'DELETE',
      url: `${BASE_PATH}/${id}`,
    });
  },
};