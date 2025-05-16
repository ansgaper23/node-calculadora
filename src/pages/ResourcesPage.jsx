
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Book, HelpCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: '¿Cómo seleccionar el calibre de cable correcto?',
    answer: 'La selección del calibre de cable depende de la corriente que transportará, la longitud del conductor, la temperatura ambiente y el tipo de instalación. Consulte las tablas de ampacidad del NEC (Código Eléctrico Nacional) y utilice nuestra calculadora de calibre de cable para una estimación.',
  },
  {
    question: '¿Qué es la caída de tensión y por qué es importante?',
    answer: 'La caída de tensión es la reducción del voltaje a lo largo de un conductor debido a su resistencia. Una caída de tensión excesiva puede causar un mal funcionamiento de los equipos y un desperdicio de energía. Generalmente, se recomienda una caída de tensión no superior al 3% para ramales y al 5% para alimentadores.',
  },
  {
    question: '¿Dónde puedo encontrar los códigos eléctricos locales?',
    answer: 'Los códigos eléctricos locales suelen basarse en el NEC, pero pueden tener enmiendas específicas. Consulte con la autoridad local competente (AHJ) o el departamento de inspección de edificios de su municipio.',
  },
];

const ResourcesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight gradient-text md:text-5xl">Recursos Educativos</h1>
        <p className="mt-4 text-lg text-muted-foreground">Amplíe sus conocimientos con nuestros artículos, tutoriales y FAQs.</p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="h-full glassmorphism-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <CardTitle>Artículos Informativos</CardTitle>
              </div>
              <CardDescription>Explore temas eléctricos en profundidad.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><Link to="#" className="text-primary hover:underline">Guía para la Instalación de Puesta a Tierra</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Principios de Protección contra Sobretensiones</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Eficiencia Energética en Sistemas Eléctricos</Link></li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">(Próximamente más artículos)</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="h-full glassmorphism-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Book className="w-8 h-8 text-primary" />
                <CardTitle>Tutoriales Interactivos</CardTitle>
              </div>
              <CardDescription>Aprenda paso a paso conceptos clave.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><Link to="#" className="text-primary hover:underline">Simulador de Circuitos Básicos</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Tutorial de Lectura de Diagramas Eléctricos</Link></li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">(Próximamente más tutoriales)</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="h-full glassmorphism-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                <CardTitle>Preguntas Frecuentes (FAQ)</CardTitle>
              </div>
              <CardDescription>Respuestas a sus dudas más comunes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default ResourcesPage;
  