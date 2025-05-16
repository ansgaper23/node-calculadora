
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PlaceholderPage = ({ title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 p-4"
    >
      <Card className="w-full max-w-lg glassmorphism-card">
        <CardHeader className="items-center">
          <Construction className="w-16 h-16 text-primary mb-4" />
          <CardTitle className="text-3xl gradient-text">{title || 'Página en Construcción'}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            {message || 'Esta sección está actualmente en desarrollo. Estamos trabajando arduamente para traerle nuevas funcionalidades pronto. ¡Gracias por su paciencia!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/">Volver a la Página de Inicio</Link>
          </Button>
        </CardContent>
      </Card>
       <img 
          alt="Esquema de un sitio web en construcción"
          className="w-full max-w-sm mt-8 rounded-lg"
         src="https://images.unsplash.com/photo-1585072746984-82cbcc8388cf" />
    </motion.div>
  );
};

export default PlaceholderPage;
  