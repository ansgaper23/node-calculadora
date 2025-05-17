import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Section from './Section';

const Article = ({ title, date, summary, link, isExternal, externalLink }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-6">
      <h4 className="font-semibold text-xl text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-3">Publicado: {date}</p>
      <p className="text-sm text-muted-foreground mb-4">{summary}</p>
      {isExternal ? (
        <a href={externalLink || link} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">Leer Artículo Completo <ExternalLink size={16} className="ml-2" /></Button>
        </a>
      ) : (
         <Button variant="outline" disabled>Leer más (Próximamente)</Button>
      )}
    </CardContent>
  </Card>
);

const ArticlesSection = () => {
  const articles = [
    { title: "5 Consejos para un Mantenimiento Eléctrico Preventivo Eficaz", date: "2025-05-12", summary: "Descubre cómo el mantenimiento preventivo puede ahorrarte costos y evitar problemas mayores en instalaciones eléctricas.", link: "#" },
    { title: "Introducción a la Domótica: El Hogar Inteligente", date: "2025-05-05", summary: "Conoce los conceptos básicos de la domótica, sus beneficios y cómo empezar a implementarla en proyectos residenciales.", link: "#" },
    { title: "Normativa de Seguridad Eléctrica en Perú: Actualización 2025", date: "2025-04-28", summary: "Un resumen de los cambios más importantes en el Código Nacional de Electricidad de Perú y cómo afectan tus proyectos.", link: "#", isExternal: true, externalLink: "https://www.gob.pe/minem" },
    { title: "Eficiencia Energética en Instalaciones Industriales", date: "2025-05-15", summary: "Estrategias y tecnologías para reducir el consumo energético y optimizar costos en entornos industriales.", link: "#" },
  ];

  return (
    <Section id="articulos" title="Artículos Informativos">
      <p className="text-muted-foreground mb-6">Mantente informado con nuestros artículos sobre normativas, nuevas tecnologías y consejos prácticos.</p>
      <div className="space-y-4">
        {articles.map(article => <Article key={article.title} {...article} />)}
      </div>
    </Section>
  );
};

export default ArticlesSection;