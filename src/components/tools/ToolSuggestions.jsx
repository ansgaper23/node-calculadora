import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Package, ExternalLink } from 'lucide-react';

const toolCategories = [
  {
    name: 'Herramientas Manuales Esenciales',
    tools: [
      { name: 'Juego de Destornilladores Aislados', description: 'Para trabajar de forma segura en circuitos energizados (cuando sea inevitable y permitido).', link: 'https://www.amazon.com/s?k=juego+destornilladores+aislados+electricista' },
      { name: 'Pinzas Pelacables/Cortadoras', description: 'Esenciales para preparar cables de diferentes calibres.', link: 'https://www.amazon.com/s?k=pinzas+pelacables+electricista' },
      { name: 'Multímetro Digital (DMM)', description: 'Para medir voltaje, corriente, resistencia y continuidad.', link: 'https://www.amazon.com/s?k=multimetro+digital+electricista' },
      { name: 'Pinza Amperimétrica', description: 'Para medir corriente sin interrumpir el circuito.', link: 'https://www.amazon.com/s?k=pinza+amperimetrica' },
      { name: 'Cinta Métrica y Nivel', description: 'Para mediciones precisas e instalaciones niveladas.', link: 'https://www.amazon.com/s?k=cinta+metrica+nivel+herramientas' },
    ]
  },
  {
    name: 'Herramientas de Potencia',
    tools: [
      { name: 'Taladro Inalámbrico', description: 'Versátil para perforar y atornillar.', link: 'https://www.amazon.com/s?k=taladro+inalambrico+profesional' },
      { name: 'Sierra Caladora o Sierra de Sable', description: 'Para cortes en diversos materiales.', link: 'https://www.amazon.com/s?k=sierra+caladora+sable' },
    ]
  },
  {
    name: 'Equipos de Seguridad (EPP)',
    tools: [
      { name: 'Guantes Aislantes', description: 'Clasificados para el voltaje con el que se trabaja.', link: 'https://www.amazon.com/s?k=guantes+aislantes+electricista' },
      { name: 'Gafas de Seguridad', description: 'Protección ocular indispensable.', link: 'https://www.amazon.com/s?k=gafas+seguridad+trabajo' },
      { name: 'Casco de Seguridad (si aplica)', description: 'Para protección contra impactos.', link: 'https://www.amazon.com/s?k=casco+seguridad+industrial' },
    ]
  }
];

const ToolSuggestions = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-3xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-primary" />
            <CardTitle>Sugerencias de Herramientas</CardTitle>
          </div>
          <CardDescription>Descubra herramientas útiles y esenciales para electricistas. Los enlaces son ejemplos y no patrocinios.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {toolCategories.map((category, catIndex) => (
            <motion.div 
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text">{category.name}</h3>
              <div className="space-y-4">
                {category.tools.map((tool, toolIndex) => (
                  <Card key={toolIndex} className="bg-muted/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer">
                          Ver ejemplos <ExternalLink className="w-3 h-3 ml-1.5" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
          <p className="text-xs text-muted-foreground pt-4 border-t">
            <strong>Descargo de responsabilidad:</strong> Esta lista es solo una guía general. La selección de herramientas depende del tipo de trabajo específico. Priorice siempre la seguridad y la calidad. Los enlaces proporcionados son ejemplos y no constituyen un respaldo o patrocinio de ningún vendedor o marca específica. Investigue y elija las herramientas que mejor se adapten a sus necesidades y cumplan con los estándares de seguridad.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolSuggestions;