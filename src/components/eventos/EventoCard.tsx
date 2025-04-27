import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Evento } from '../../types';
import { formatDateShort } from '../../utils/date';

interface EventoCardProps {
  evento: Evento;
}

const EventoCard: React.FC<EventoCardProps> = ({ evento }) => {
  const { id, nome, descricao, data, local, organizador } = evento;
  
  return (
    <Link to={`/eventos/${id}`}>
      <Card 
        className="hover:shadow-lg transition-all duration-200 h-full" 
        hover
      >
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <Badge className="mb-2">Evento</Badge>
            <h3 className="text-xl font-semibold mb-2 text-white line-clamp-1">{nome}</h3>
            <p className="text-gray-400 line-clamp-2 mb-4">{descricao}</p>
          </div>
          
          <div className="mt-auto space-y-2">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-primary-500" />
              <span className="text-sm">{formatDateShort(data)}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-primary-500" />
              <span className="text-sm line-clamp-1">{local}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <User className="w-4 h-4 mr-2 text-primary-500" />
              <span className="text-sm line-clamp-1">{organizador}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default EventoCard;