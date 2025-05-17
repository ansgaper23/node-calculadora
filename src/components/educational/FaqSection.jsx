import React from 'react';
import Section from './Section';

const FAQItem = ({ question, answer }) => (
  <details className="bg-muted p-4 rounded-lg group">
    <summary className="font-semibold text-lg cursor-pointer text-foreground list-none flex justify-between items-center">
      {question}
      <ChevronDownIcon className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
    </summary>
    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{answer}</p>
  </details>
);

const ChevronDownIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" />
  </svg>
);

const FaqSection = () => {
  const faqs = [
    { question: "¿Qué es un interruptor diferencial y por qué es importante?", answer: "Un interruptor diferencial (ID), también conocido como RCD o GFCI, es un dispositivo de protección que desconecta el circuito al detectar una fuga de corriente a tierra. Es crucial para proteger a las personas contra electrocuciones, especialmente en áreas húmedas como baños y cocinas." },
    { question: "¿Cuál es la diferencia entre un cable THHN y THWN?", answer: "Ambos son cables comunes para instalaciones eléctricas. THHN (Thermoplastic High Heat-resistant Nylon-coated) es resistente al calor. THWN (Thermoplastic Heat and Water-resistant Nylon-coated) es resistente tanto al calor como a la humedad. La elección depende del ambiente de instalación; THWN es adecuado para lugares húmedos o mojados." },
    { question: "¿Cada cuánto tiempo se debe realizar una inspección eléctrica en una vivienda?", answer: "Se recomienda una inspección eléctrica completa por un profesional cualificado cada 5-10 años para viviendas existentes. Para propiedades más antiguas (más de 25 años) o si se realizan modificaciones importantes, se observan problemas (chispas, olores extraños, interruptores que saltan frecuentemente) o al comprar una propiedad, la inspección debe ser más frecuente o inmediata." },
    { question: "¿Qué significa el término 'factor de potencia'?", answer: "El factor de potencia (FP) es una medida de la eficiencia con la que se utiliza la energía eléctrica. Un FP de 1 (o 100%) indica la máxima eficiencia. Un FP bajo significa que se está consumiendo más energía de la necesaria para realizar el mismo trabajo, lo que puede llevar a mayores costos y penalizaciones por parte de la compañía eléctrica." },
    { question: "¿Es seguro realizar pequeñas reparaciones eléctricas en casa?", answer: "Para tareas muy simples como cambiar una bombilla, generalmente es seguro si se toman precauciones (desconectar la energía). Sin embargo, para cualquier trabajo que implique manipular cableado, interruptores, o tomacorrientes, se recomienda encarecidamente contratar a un electricista cualificado. La electricidad puede ser peligrosa y un error puede tener consecuencias graves." },
    { question: "¿Qué es la sobrecarga y qué es un cortocircuito?", answer: "Una sobrecarga ocurre cuando se conectan demasiados aparatos a un circuito, demandando más corriente de la que el cableado puede soportar de forma segura. Un cortocircuito es un fallo donde la corriente eléctrica toma un camino no intencionado de muy baja resistencia, provocando un flujo de corriente extremadamente alto. Ambos son peligrosos y pueden causar incendios; los interruptores automáticos (breakers) protegen contra estas situaciones." },
  ];

  return (
    <Section id="faq-recursos" title="Preguntas Frecuentes (FAQ)">
      <p className="text-muted-foreground mb-6">Encuentra respuestas a tus dudas más comunes.</p>
      <div className="space-y-3">
        {faqs.map(faq => <FAQItem key={faq.question} {...faq} />)}
      </div>
    </Section>
  );
};

export default FaqSection;