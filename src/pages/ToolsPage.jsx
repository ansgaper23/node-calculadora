
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Wrench, FileText, ListChecks, Package, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const toolLinks = [
  { name: 'Generador de Presupuestos', path: '/tools/quote-generator', icon: FileText, description: 'Cree presupuestos profesionales rápidamente.' },
  { name: 'Listas de Materiales', path: '/tools/material-lists', icon: ListChecks, description: 'Organice y gestione sus listas de materiales.' },
  { name: 'Sugerencias de Herramientas', path: '/tools/tool-suggestions', icon: Package, description: 'Descubra herramientas útiles para su trabajo.' },
  { name: 'Plantillas Descargables', path: '/tools/templates', icon: Download, description: 'Optimice flujos de trabajo con plantillas listas.' },
];

const ToolsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight gradient-text md:text-5xl">Herramientas para Electricistas</h1>
        <p className="mt-4 text-lg text-muted-foreground">Optimice su trabajo con nuestras utilidades especializadas.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {toolLinks.map((tool) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"}}
          >
            <Link to={tool.path}>
              <Card className="h-full transition-shadow duration-300 ease-in-out hover:shadow-xl glassmorphism-card">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-accent/10 text-accent">
                     <tool.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary hover:underline">Acceder a la herramienta &rarr;</p>
                  <p className="mt-2 text-xs text-muted-foreground">(Funcionalidad en desarrollo)</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
};

export default ToolsPage;
  