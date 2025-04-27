import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="bg-dark-200 shadow-md py-4">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
          <Calendar className="w-6 h-6 text-primary-600" />
          <h1 className="text-xl font-bold">Gerenciador de Eventos</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isHomePage && (
            <Button
              as={Link}
              to="/eventos/novo"
              icon={<Plus className="w-4 h-4" />}
            >
              Novo Evento
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;