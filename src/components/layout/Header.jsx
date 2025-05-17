
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Herramientas', path: '/herramientas' },
    { title: 'Directorio de Proveedores', path: '/directorio-proveedores' },
    { title: 'Recursos Educativos', path: '/recursos-educativos' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-brand-yellow via-yellow-500 to-brand-blue text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Zap size={32} className="text-white" />
          <span className="text-2xl font-bold">ElectroPro</span>
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="hover:text-yellow-300 transition-colors duration-300 text-lg"
            >
              {link.title}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                  <UserCircle size={28} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/panel-usuario')}>
                  Panel de Usuario
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-blue">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="hover:text-yellow-300 transition-colors duration-300 text-lg py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/panel-usuario"
                  className="hover:text-yellow-300 transition-colors duration-300 text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Panel de Usuario
                </Link>
                <Button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  variant="ghost"
                  className="w-full justify-start text-lg py-2 hover:bg-brand-darkBlue"
                >
                  <LogOut className="mr-2 h-5 w-5" /> Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full bg-white text-brand-blue hover:bg-gray-100 mt-2">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
