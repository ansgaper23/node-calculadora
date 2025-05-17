import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-yellow-400 via-yellow-500 to-blue-500 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.8 }}
      >
        <AlertTriangle size={100} className="mx-auto text-yellow-300 mb-8 animate-pulse" />
      </motion.div>
      
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        404
      </motion.h1>
      
      <motion.p
        className="text-2xl md:text-3xl font-semibold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        ¡Ups! Página No Encontrada
      </motion.p>
      
      <motion.p
        className="text-lg mb-10 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
        Verifica la URL o regresa al inicio.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link to="/">
          <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-200 text-lg px-8 py-3 shadow-lg">
            <Home className="mr-2 h-5 w-5" />
            Volver al Inicio
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;