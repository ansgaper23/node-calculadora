import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Section from './Section';

const DictionaryTerm = ({ term, definition }) => (
   <div className="bg-muted p-4 rounded-lg">
    <p><strong className="text-foreground text-md">{term}:</strong></p>
    <p className="text-sm text-muted-foreground mt-1">{definition}</p>
  </div>
);

const DictionarySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dictionary, setDictionary] = useState([
    { term: "Amperio (A)", definition: "Unidad de medida de la intensidad de la corriente eléctrica. Representa el flujo de un coulombio de carga por segundo." },
    { term: "Voltaje (V)", definition: "Diferencia de potencial eléctrico entre dos puntos; también conocido como tensión. Impulsa el flujo de corriente." },
    { term: "Resistencia (Ω)", definition: "Oposición al flujo de corriente eléctrica. Se mide en Ohmios." },
    { term: "Potencia (W)", definition: "Tasa a la que se transfiere la energía eléctrica. Se mide en Watts (Vatios)." },
    { term: "Corriente Alterna (CA/AC)", definition: "Tipo de corriente eléctrica en la que la dirección del flujo de electrones cambia periódicamente o cíclicamente." },
    { term: "Corriente Continua (CC/DC)", definition: "Tipo de corriente eléctrica en la que el flujo de electrones es constante en una dirección." },
    { term: "Interruptor Termomagnético", definition: "Dispositivo de protección que combina protección contra sobrecargas (efecto térmico) y cortocircuitos (efecto magnético)." },
    { term: "Puesta a Tierra (PAT)", definition: "Conexión conductora, intencionada o accidental, entre un circuito o equipo eléctrico y la tierra, o algún cuerpo conductor que sirva en lugar de la tierra. Esencial para la seguridad." },
    { term: "Transformador", definition: "Dispositivo electromagnético que transfiere energía eléctrica de un circuito a otro a través de conductores acoplados inductivamente, usualmente cambiando el nivel de voltaje y corriente." },
    { term: "Conductor", definition: "Material que permite el flujo fácil de la corriente eléctrica, como el cobre o el aluminio." },
    { term: "Aislante", definition: "Material que resiste el flujo de la corriente eléctrica, como el plástico o el caucho, usado para recubrir conductores." },
    { term: "Circuito en Serie", definition: "Circuito donde los componentes están conectados uno después del otro, formando un único camino para la corriente." },
    { term: "Circuito en Paralelo", definition: "Circuito donde los componentes están conectados en ramales separados, de modo que la corriente se divide entre ellos." },
    { term: "Fusible", definition: "Dispositivo de protección que contiene un hilo o lámina metálica que se derrite e interrumpe el circuito si la corriente excede un valor seguro." },
    { term: "Ley de Ohm", definition: "Relación fundamental en los circuitos eléctricos que establece que el voltaje (V) es igual a la corriente (I) multiplicada por la resistencia (R), es decir, V = I * R." },
    { term: "Capacitor (Condensador)", definition: "Componente pasivo que almacena energía en un campo eléctrico. Se mide en Faradios (F)." },
    { term: "Inductor (Bobina)", definition: "Componente pasivo que almacena energía en un campo magnético cuando fluye corriente eléctrica a través de él. Se mide en Henrios (H)." },
    { term: "Frecuencia (Hz)", definition: "En corriente alterna, es el número de ciclos completos que ocurren por segundo. Se mide en Hertz (Hz)." },
    { term: "Armónicos", definition: "Componentes de frecuencia múltiplo de la frecuencia fundamental en una señal de corriente alterna, que pueden causar distorsión y problemas en los sistemas eléctricos." },
    { term: "Tablero Eléctrico (Panel de Distribución)", definition: "Caja o gabinete que contiene interruptores automáticos, fusibles y otros dispositivos para distribuir la energía eléctrica a diferentes circuitos de una edificación." },
  ]);

  const filteredDictionary = dictionary.filter(
    entry => entry.term.toLowerCase().includes(searchTerm.toLowerCase()) || entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section id="diccionario" title="Diccionario de Términos Eléctricos">
      <p className="text-muted-foreground mb-4">Consulta definiciones claras de términos técnicos. Utiliza el buscador para encontrar rápidamente lo que necesitas.</p>
      <Input 
          type="text" 
          placeholder="Buscar término..." 
          className="mb-6 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {filteredDictionary.length > 0 ? filteredDictionary.map(entry => (
              <DictionaryTerm key={entry.term} term={entry.term} definition={entry.definition} />
          )) : <p className="text-muted-foreground">No se encontraron términos para "{searchTerm}".</p>}
      </div>
    </Section>
  );
};

export default DictionarySection;