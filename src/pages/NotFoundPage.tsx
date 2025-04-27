import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página Não Encontrada</h2>
        <p className="text-gray-400 max-w-md mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button
          as={Link}
          to="/"
          icon={<Home className="w-4 h-4" />}
        >
          Voltar para Home
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;