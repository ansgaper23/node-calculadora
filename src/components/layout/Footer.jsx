
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-brand-darkBlue via-brand-blue to-brand-lightBlue text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap size={32} className="text-brand-yellow" />
              <span className="text-2xl font-bold text-white">ElectroPro</span>
            </Link>
            <p className="text-sm">
              Tu aliado profesional en el mundo de la electricidad. Herramientas, recursos y comunidad para electricistas.
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold text-white mb-4">Enlaces Rápidos</p>
            <ul className="space-y-2">
              <li><Link to="/herramientas" className="hover:text-brand-yellow transition-colors">Herramientas</Link></li>
              <li><Link to="/directorio-proveedores" className="hover:text-brand-yellow transition-colors">Directorio de Proveedores</Link></li>
              <li><Link to="/recursos-educativos" className="hover:text-brand-yellow transition-colors">Recursos Educativos</Link></li>
              <li><Link to="/#faq" className="hover:text-brand-yellow transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-semibold text-white mb-4">Síguenos</p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors"><Facebook size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors"><Twitter size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors"><Linkedin size={24} /></a>
            </div>
            <p className="mt-4 text-sm">
              Mantente actualizado con las últimas noticias y tutoriales.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} ElectroPro. Todos los derechos reservados.
          </p>
          <p className="text-xs mt-1">
            Diseñado con <span className="text-brand-yellow">energía</span> por Hostinger Horizons.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
