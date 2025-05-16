
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator, BookOpen, Wrench, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const featureCards = [
  {
    title: 'Calculadoras Esenciales',
    description: 'Caída de tensión, calibre de cable, consumo y más.',
    icon: Calculator,
    link: '/calculators',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  {
    title: 'Bases de Datos Completas',
    description: 'Calibres, códigos, símbolos y diccionario técnico.',
    icon: BookOpen,
    link: '/databases',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  {
    title: 'Herramientas Profesionales',
    description: 'Generador de presupuestos, listas de materiales y más.',
    icon: Wrench,
    link: '/tools',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
  },
  {
    title: 'Recursos Educativos',
    description: 'Tutoriales interactivos, artículos y FAQs.',
    icon: Lightbulb,
    link: '/resources',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
];

const HomePage = () => {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative py-20 text-center rounded-xl overflow-hidden hero-gradient"
      >
        <div className="absolute inset-0 opacity-20">
           <img  alt="Abstract electrical patterns" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b" />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Bienvenido al <span className="block">Electrician's Power Hub</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-primary-foreground/90 md:text-xl">
            Su centro de referencia para herramientas, recursos y conocimientos eléctricos. Simplificamos su trabajo diario.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link to="/calculators">
                Empezar Ahora <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="py-12"
      >
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl gradient-text">
          Herramientas y Recursos a su Alcance
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
            >
              <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-2xl glassmorphism-card hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <card.icon className={`w-10 h-10 ${card.textColor}`} />
                  </div>
                  <CardTitle className="mt-4 text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                  <Button variant="link" className="text-primary" asChild>
                    <Link to={card.link}>
                      Explorar <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="py-16 bg-muted/50 rounded-xl"
      >
        <div className="container grid items-center gap-12 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">
              Optimice su Flujo de Trabajo
            </h2>
            <p className="mt-4 text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Desde cálculos precisos hasta la gestión de materiales y la generación de presupuestos, nuestra plataforma está diseñada para electricistas modernos que buscan eficiencia y precisión.
            </p>
            <ul className="mt-6 space-y-3 text-foreground/70">
              <li className="flex items-center"><Calculator className="w-5 h-5 mr-3 text-primary" /> Cálculos eléctricos rápidos y fiables.</li>
              <li className="flex items-center"><BookOpen className="w-5 h-5 mr-3 text-primary" /> Acceso a bases de datos actualizadas.</li>
              <li className="flex items-center"><Wrench className="w-5 h-5 mr-3 text-primary" /> Herramientas para simplificar tareas complejas.</li>
            </ul>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link to="/tools">
                  Descubrir Herramientas <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              alt="Electricista trabajando con herramientas"
              className="overflow-hidden rounded-xl object-cover aspect-video max-w-md"
             src="https://images.unsplash.com/photo-1680050977815-b4099be524f7" />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
  