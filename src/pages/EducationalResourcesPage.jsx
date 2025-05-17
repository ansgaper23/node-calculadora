import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, HelpCircle, Users, Download, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InteractiveTutorialsSection from '@/components/educational/InteractiveTutorialsSection';
import ArticlesSection from '@/components/educational/ArticlesSection';
import FaqSection from '@/components/educational/FaqSection';
import TemplatesSection from '@/components/educational/TemplatesSection';
import DictionarySection from '@/components/educational/DictionarySection';

const ResourceCard = ({ icon, title, description, action }) => (
  <motion.div
    className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center text-brand-yellow mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3 text-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
    {action}
  </motion.div>
);

const EducationalResourcesPage = () => {
  const resources = [
    { icon: <BookOpen size={32} />, title: 'Tutoriales Interactivos', description: 'Aprende con simulaciones prácticas de procedimientos y conceptos eléctricos.', actionText: "Ver Tutoriales", sectionId: "tutoriales" },
    { icon: <Lightbulb size={32} />, title: 'Artículos Informativos', description: 'Mantente al día con contenido relevante y actualizado sobre la industria eléctrica.', actionText: "Leer Artículos", sectionId: "articulos" },
    { icon: <HelpCircle size={32} />, title: 'Preguntas Frecuentes (FAQ)', description: 'Encuentra respuestas claras a las dudas más comunes en el campo eléctrico.', actionText: "Consultar FAQ", sectionId: "faq-recursos" },
    { icon: <Users size={32} />, title: 'Foro de la Comunidad', description: 'Conéctate, comparte y aprende con otros profesionales del sector.', actionLink: "/foro", actionText: "Ir al Foro" },
    { icon: <Download size={32} />, title: 'Plantillas Descargables', description: 'Accede a documentos y formularios útiles para tu trabajo diario.', actionText: "Descargar Plantillas", sectionId: "plantillas" },
    { icon: <MessageSquare size={32} />, title: 'Diccionario de Términos', description: 'Consulta un completo glosario de términos eléctricos.', actionText: "Ver Diccionario", sectionId: "diccionario" },
  ];

  const renderAction = (resource) => {
    if (resource.actionLink) {
      return <Link to={resource.actionLink}><Button variant="outline" className="w-full">{resource.actionText}</Button></Link>;
    }
    return <ScrollLinkButton sectionId={resource.sectionId} text={resource.actionText} />;
  };

  return (
    <div className="main-container">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recursos Educativos
      </motion.h1>
      <motion.p 
        className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Amplía tus conocimientos y habilidades con nuestra selección de materiales educativos y herramientas de aprendizaje.
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <ResourceCard {...resource} action={renderAction(resource)} />
          </motion.div>
        ))}
      </div>

      <InteractiveTutorialsSection />
      <ArticlesSection />
      <FaqSection />
      <TemplatesSection />
      <DictionarySection />

    </div>
  );
};

const ScrollLinkButton = ({ sectionId, text }) => (
  <Button variant="outline" className="w-full" onClick={() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })}>
    {text}
  </Button>
);

export default EducationalResourcesPage;