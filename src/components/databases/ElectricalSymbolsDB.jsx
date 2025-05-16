import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Atom, Search } from 'lucide-react';

const symbolsData = [
  { name: 'Resistencia', category: 'Componentes Pasivos', symbol: 'R', description: 'Componente que se opone al flujo de corriente.', image_url_placeholder: 'Resistor symbol' },
  { name: 'Capacitor (No Polarizado)', category: 'Componentes Pasivos', symbol: 'C', description: 'Componente que almacena energía en un campo eléctrico.', image_url_placeholder: 'Non-polarized capacitor symbol' },
  { name: 'Capacitor (Polarizado)', category: 'Componentes Pasivos', symbol: 'C', description: 'Capacitor con polaridad específica.', image_url_placeholder: 'Polarized capacitor symbol' },
  { name: 'Inductor / Bobina', category: 'Componentes Pasivos', symbol: 'L', description: 'Componente que almacena energía en un campo magnético.', image_url_placeholder: 'Inductor coil symbol' },
  { name: 'Fuente de Voltaje DC', category: 'Fuentes', symbol: 'V', description: 'Proporciona un voltaje de corriente continua constante.', image_url_placeholder: 'DC voltage source symbol' },
  { name: 'Fuente de Voltaje AC', category: 'Fuentes', symbol: 'V', description: 'Proporciona un voltaje de corriente alterna.', image_url_placeholder: 'AC voltage source symbol' },
  { name: 'Interruptor (SPST)', category: 'Interruptores y Relés', symbol: 'S', description: 'Interruptor de un polo, una vía (Single Pole, Single Throw).', image_url_placeholder: 'SPST switch symbol' },
  { name: 'Interruptor (SPDT)', category: 'Interruptores y Relés', symbol: 'S', description: 'Interruptor de un polo, dos vías (Single Pole, Double Throw).', image_url_placeholder: 'SPDT switch symbol' },
  { name: 'Pulsador (Normalmente Abierto)', category: 'Interruptores y Relés', symbol: '', description: 'Contacto que se cierra al presionar.', image_url_placeholder: 'Normally open push button symbol' },
  { name: 'Pulsador (Normalmente Cerrado)', category: 'Interruptores y Relés', symbol: '', description: 'Contacto que se abre al presionar.', image_url_placeholder: 'Normally closed push button symbol' },
  { name: 'Tierra / Ground', category: 'Conexiones', symbol: '', description: 'Punto de referencia de voltaje cero.', image_url_placeholder: 'Ground symbol' },
  { name: 'Lámpara / Bombilla', category: 'Salidas', symbol: '', description: 'Dispositivo que produce luz.', image_url_placeholder: 'Lamp bulb symbol' },
  { name: 'Motor', category: 'Salidas', symbol: 'M', description: 'Convierte energía eléctrica en mecánica.', image_url_placeholder: 'Motor symbol' },
  { name: 'Diodo', category: 'Semiconductores', symbol: 'D', description: 'Permite el flujo de corriente en una dirección.', image_url_placeholder: 'Diode symbol' },
  { name: 'LED (Diodo Emisor de Luz)', category: 'Semiconductores', symbol: '', description: 'Diodo que emite luz cuando pasa corriente.', image_url_placeholder: 'LED symbol' },
  { name: 'Transistor (NPN)', category: 'Semiconductores', symbol: 'Q', description: 'Dispositivo semiconductor para amplificación o conmutación.', image_url_placeholder: 'NPN transistor symbol' },
  { name: 'Transformador', category: 'Transformadores', symbol: 'T', description: 'Transfiere energía eléctrica entre circuitos mediante inducción.', image_url_placeholder: 'Transformer symbol' },
  { name: 'Fusible', category: 'Protección', symbol: 'F', description: 'Dispositivo de protección contra sobrecorriente.', image_url_placeholder: 'Fuse symbol' },
  { name: 'Disyuntor / Breaker', category: 'Protección', symbol: '', description: 'Interruptor automático de protección contra sobrecorriente.', image_url_placeholder: 'Circuit breaker symbol' },
];

const ElectricalSymbolsDB = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...new Set(symbolsData.map(symbol => symbol.category))];

  const filteredData = symbolsData.filter(symbol => {
    const matchesSearch = symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          symbol.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || symbol.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Atom className="w-6 h-6 text-primary" />
            <CardTitle>Base de Datos: Símbolos Eléctricos</CardTitle>
          </div>
          <CardDescription>
            Guía visual de símbolos eléctricos estándar utilizados en diagramas y esquemas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-md bg-background text-foreground focus:ring-primary focus:border-primary sm:max-w-xs"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.map((symbol, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{symbol.name}</CardTitle>
                      <CardDescription>{symbol.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-2">
                      <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-md my-2">
                        <img  alt={symbol.name + " symbol"} className="max-w-full max-h-full p-2" src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                      </div>
                      <p className="text-xs text-center text-muted-foreground h-16 overflow-y-auto">{symbol.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No se encontraron símbolos que coincidan con su búsqueda.</p>
          )}
           <p className="mt-6 text-xs text-muted-foreground">
            Nota: Las imágenes de los símbolos son representaciones. Los estilos exactos pueden variar según el estándar (ANSI, IEC, etc.).
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ElectricalSymbolsDB;