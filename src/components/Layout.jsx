
import React from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Zap, Home, Calculator, BookOpen, Wrench, Users, FileText, ShoppingBag, Download, Lightbulb } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/calculators', label: 'Calculadoras', icon: Calculator },
  { to: '/databases', label: 'Bases de Datos', icon: BookOpen },
  { to: '/resources', label: 'Recursos', icon: Lightbulb },
  { to: '/tools', label: 'Herramientas', icon: Wrench },
  { to: '/community', label: 'Comunidad', icon: Users },
];

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 max-w-screen-2xl">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Electrician's Power Hub</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavLink 
                    to={link.to} 
                    className={({ isActive }) => 
                      cn(navigationMenuTriggerStyle(), isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground')
                    }
                  >
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-grow container max-w-screen-2xl py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="py-8 mt-auto border-t bg-background/80">
        <div className="container flex flex-col items-center justify-between max-w-screen-2xl md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Electrician's Power Hub. Todos los derechos reservados.
          </p>
          <div className="flex mt-4 space-x-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidad</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Términos de Servicio</Link>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
  