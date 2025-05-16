
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CommunityPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8"
    >
      <header>
        <h1 className="text-4xl font-bold tracking-tight gradient-text md:text-5xl">Comunidad de Electricistas</h1>
        <p className="mt-4 text-lg text-muted-foreground">Conéctese, comparta y aprenda con otros profesionales del sector.</p>
      </header>

      <Card className="w-full max-w-md glassmorphism-card">
        <CardHeader>
          <div className="flex items-center justify-center">
            <Users className="w-12 h-12 mb-4 text-primary" />
          </div>
          <CardTitle className="text-2xl">Foro Comunitario</CardTitle>
          <CardDescription>
            Nuestro foro está actualmente en desarrollo. ¡Vuelva pronto para participar en discusiones, resolver dudas y compartir sus experiencias!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Mientras tanto, puede unirse a comunidades de electricistas existentes en otras plataformas.
          </p>
          <Button disabled className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Acceder al Foro (Próximamente)
          </Button>
           <Button variant="outline" className="w-full" onClick={() => window.open('https://www.reddit.com/r/electricians/', '_blank')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Visitar r/electricians en Reddit
          </Button>
        </CardContent>
      </Card>

      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold">¿Qué esperar del foro?</h2>
        <ul className="mt-4 space-y-2 text-left list-disc list-inside text-muted-foreground">
          <li>Discusiones técnicas sobre normativas y mejores prácticas.</li>
          <li>Resolución de problemas y consultas entre colegas.</li>
          <li>Oportunidades para compartir proyectos y experiencias.</li>
          <li>Noticias y actualizaciones relevantes para la industria eléctrica.</li>
        </ul>
      </div>
       <img 
          alt="Grupo de electricistas colaborando"
          className="w-full max-w-lg mt-8 rounded-lg shadow-lg"
         src="https://images.unsplash.com/photo-1671726805768-93b4c260766b" />
    </motion.div>
  );
};

export default CommunityPage;
  