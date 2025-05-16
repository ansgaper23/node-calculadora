import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';

const termsData = [
  { term: 'Ampacidad (Ampacity)', definition: 'La máxima corriente, en amperes, que un conductor puede transportar continuamente bajo las condiciones de uso sin exceder su clasificación de temperatura.' },
  { term: 'Voltaje (Voltage)', definition: 'La diferencia de potencial eléctrico entre dos puntos, también conocida como tensión o fuerza electromotriz. Se mide en Volts (V).' },
  { term: 'Corriente (Current)', definition: 'El flujo de carga eléctrica. Se mide en Amperes (A).' },
  { term: 'Resistencia (Resistance)', definition: 'La oposición al flujo de corriente eléctrica. Se mide en Ohms (Ω).' },
  { term: 'Potencia (Power)', definition: 'La tasa a la que se transfiere la energía eléctrica. Se mide en Watts (W).' },
  { term: 'Ley de Ohm (Ohm\'s Law)', definition: 'Establece que la corriente a través de un conductor entre dos puntos es directamente proporcional al voltaje a través de los dos puntos e inversamente proporcional a la resistencia entre ellos (I = V/R).' },
  { term: 'Circuito (Circuit)', definition: 'Una trayectoria cerrada a través de la cual puede fluir la corriente eléctrica.' },
  { term: 'Conductor (Conductor)', definition: 'Un material que permite que la corriente eléctrica fluya fácilmente a través de él (Ej: cobre, aluminio).' },
  { term: 'Aislante (Insulator)', definition: 'Un material que resiste el flujo de corriente eléctrica (Ej: caucho, plástico, vidrio).' },
  { term: 'Puesta a Tierra (Grounding)', definition: 'Conectar un sistema eléctrico o equipo a la tierra para protección y referencia de voltaje.' },
  { term: 'Disyuntor (Circuit Breaker)', definition: 'Un dispositivo de protección que interrumpe automáticamente un circuito eléctrico para prevenir daños por sobrecorriente o cortocircuito.' },
  { term: 'Fusible (Fuse)', definition: 'Un dispositivo de seguridad que contiene un alambre que se derrite e interrumpe el circuito si la corriente excede un nivel seguro.' },
  { term: 'Transformador (Transformer)', definition: 'Un dispositivo que transfiere energía eléctrica de un circuito a otro a través de conductores acoplados inductivamente, usualmente cambiando el nivel de voltaje.' },
  { term: 'Corriente Alterna (AC)', definition: 'Corriente eléctrica que invierte periódicamente su dirección.' },
  { term: 'Corriente Continua (DC)', definition: 'Corriente eléctrica que fluye en una sola dirección.' },
  { term: 'Frecuencia (Frequency)', definition: 'El número de ciclos por segundo en una corriente alterna. Se mide en Hertz (Hz).' },
  { term: 'Fase (Phase)', definition: 'En sistemas de AC, se refiere a la distribución de la carga. Los sistemas monofásicos y trifásicos son comunes.' },
  { term: 'Armónicos (Harmonics)', definition: 'Voltajes o corrientes sinusoidales cuyas frecuencias son múltiplos enteros de la frecuencia fundamental del sistema de potencia.' },
  { term: 'Factor de Potencia (Power Factor)', definition: 'La relación entre la potencia real (kW) que realiza trabajo y la potencia aparente (kVA) consumida por una carga AC. Un valor entre 0 y 1.' },
];

const ElectricalTermsDB = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = termsData.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <CardTitle>Diccionario de Términos Eléctricos</CardTitle>
          </div>
          <CardDescription>
            Definiciones claras y concisas de terminología eléctrica común.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Buscar término o definición..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredTerms.length > 0 ? (
            <Accordion type="multiple" className="w-full space-y-2">
              {filteredTerms.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border rounded-md px-4 bg-background/50">
                  <AccordionTrigger className="text-left hover:no-underline">{item.term}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.definition}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground py-8">No se encontraron términos que coincidan con su búsqueda.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ElectricalTermsDB;