import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: string): string => {
  try {
    return format(parseISO(date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    return date;
  }
};

export const formatDateShort = (date: string): string => {
  try {
    return format(parseISO(date), 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return date;
  }
};

export const formatDateInput = (date: string): string => {
  try {
    return format(parseISO(date), 'yyyy-MM-dd\'T\'HH:mm');
  } catch (error) {
    return '';
  }
};