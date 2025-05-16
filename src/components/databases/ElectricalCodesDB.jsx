import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const codesData = [
  {
    id: 'nec',
    name: 'NEC (National Electrical Code) - NFPA 70',
    description: 'El estándar de referencia para instalaciones eléctricas seguras en Estados Unidos. Cubre el cableado, la protección contra sobrecorriente, la puesta a tierra y los requisitos de equipos.',
    key_topics: ['Definiciones y Requisitos Generales (Art. 100-110)', 'Cableado y Protección (Art. 200-285)', 'Métodos y Materiales de Cableado (Art. 300-399)', 'Equipos de Uso General (Art. 400-490)', 'Condiciones Especiales (Art. 500-590)'],
    link: 'https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70'
  },
  {
    id: 'ul',
    name: 'UL (Underwriters Laboratories) Standards',
    description: 'UL desarrolla estándares y prueba productos para la seguridad. La marca UL indica que un producto ha sido probado para cumplir con los requisitos de seguridad reconocidos a nivel nacional.',
    key_topics: ['Seguridad de Productos Eléctricos', 'Pruebas de Rendimiento', 'Certificación de Equipos'],
    link: 'https://www.ul.com/standards'
  },
  {
    id: 'ieee',
    name: 'IEEE (Institute of Electrical and Electronics Engineers) Standards',
    description: 'IEEE es una organización profesional que desarrolla estándares en una amplia gama de tecnologías, incluyendo energía eléctrica, electrónica y telecomunicaciones.',
    key_topics: ['IEEE Std 1547 (Interconexión de Recursos Distribuidos)', 'IEEE Std C62 (Protección contra Sobretensiones)', 'National Electrical Safety Code (NESC - IEEE C2)'],
    link: 'https://standards.ieee.org/'
  },
];

const ElectricalCodesDB = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Code className="w-6 h-6 text-primary" />
            <CardTitle>Base de Datos: Códigos Eléctricos</CardTitle>
          </div>
          <CardDescription>
            Resúmenes y referencias a normativas y estándares eléctricos importantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {codesData.map((code) => (
              <AccordionItem value={code.id} key={code.id}>
                <AccordionTrigger className="text-lg hover:no-underline">
                  {code.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="text-muted-foreground">{code.description}</p>
                  <h4 className="font-semibold">Temas Clave:</h4>
                  <ul className="list-disc list-inside pl-4 text-sm text-muted-foreground space-y-1">
                    {code.key_topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                  <Button variant="link" asChild className="px-0">
                    <a href={code.link} target="_blank" rel="noopener noreferrer">
                      Visitar Sitio Oficial <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-6 text-xs text-muted-foreground">
            Esta es una lista introductoria. Siempre consulte las versiones más recientes de los códigos y estándares aplicables, así como las regulaciones locales y jurisdiccionales.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ElectricalCodesDB;