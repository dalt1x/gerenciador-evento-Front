export interface Evento {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  local: string;
  organizador: string;
  participantes?: Participante[];
}

export interface Participante {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  eventoId: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
}