import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-200 py-6 mt-auto">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Gerenciador de Eventos. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;