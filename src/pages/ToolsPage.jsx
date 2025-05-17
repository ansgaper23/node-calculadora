import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Cable, Zap, Sigma, FileText, ListChecks, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ToolCard = ({ icon, title, description, link }) => (
  <motion.div
    className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
    whileHover={{ y: -5 }}
  >
    <div className="text-brand-yellow mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
    <Link to={link} className="w-full">
      <Button variant="outline" className="w-full group">
        Abrir Herramienta <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  </motion.div>
);

const ToolsPage = () => {
  const tools = [
    { id: 'tension-drop', icon: <Calculator size={48} />, title: 'Caída de Tensión', description: 'Calcula la caída de tensión en un circuito eléctrico.', link: '/herramientas/caida-tension' },
    { id: 'cable-gauge', icon: <Cable size={48} />, title: 'Calibre de Cable', description: 'Determina el calibre de cable AWG o mm² adecuado.', link: '/herramientas/calibre-cable' },
    { id: 'energy-consumption', icon: <Zap size={48} />, title: 'Consumo de Energía', description: 'Calcula el consumo y costo energético detallado por aparato.', link: '/herramientas/consumo-energia' },
    { id: 'unit-conversion', icon: <Sigma size={48} />, title: 'Conversión de Unidades', description: 'Convierte diversas unidades eléctricas (Voltios, Amperios, Watts, etc.).', link: '/herramientas/conversion-unidades' },
    { id: 'budget-generator', icon: <FileText size={48} />, title: 'Generador de Presupuestos', description: 'Crea presupuestos profesionales para tus proyectos eléctricos.', link: '/herramientas/generador-presupuestos' },
    { id: 'material-lists', icon: <ListChecks size={48} />, title: 'Listas de Materiales', description: 'Organiza y gestiona tus listas de componentes y materiales.', link: '/herramientas/listas-materiales' },
  ];

  return (
    <div className="main-container">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Herramientas Esenciales para Electricistas
      </motion.h1>
      <motion.p 
        className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Optimiza tu trabajo con nuestras calculadoras y utilidades diseñadas para profesionales como tú. Accede a cálculos precisos y herramientas de gestión para tus proyectos.
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ToolCard
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              link={tool.link}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;