
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Wrench, BookOpen, Users, ShoppingCart, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description, link, linkText }) => (
  <motion.div
    className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center text-brand-yellow mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3 text-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
    {link && (
      <Link to={link}>
        <Button variant="outline" className="w-full group">
          {linkText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    )}
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      <section className="py-20 bg-gradient-to-br from-brand-blue via-blue-700 to-brand-darkBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bienvenido a <span className="text-brand-yellow">ElectroPro</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            La plataforma definitiva para electricistas profesionales. Herramientas, recursos y comunidad, todo en un solo lugar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/registro">
              <Button size="lg" className="bg-brand-yellow text-brand-darkBlue hover:bg-yellow-400 text-lg px-8 py-3">
                Únete Gratis Ahora <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 main-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Potencia Tu Trabajo Diario
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wrench size={32} />}
            title="Calculadoras Esenciales"
            description="Accede a calculadoras precisas para caída de tensión, calibre de cable, consumo energético y más."
            link="/herramientas"
            linkText="Ir a Herramientas"
          />
          <FeatureCard
            icon={<BookOpen size={32} />}
            title="Base de Conocimiento"
            description="Consulta códigos eléctricos, símbolos, un diccionario técnico y tutoriales interactivos."
            link="/recursos-educativos"
            linkText="Explorar Recursos"
          />
          <FeatureCard
            icon={<Users size={32} />}
            title="Comunidad Activa"
            description="Conéctate con otros profesionales, comparte experiencias y resuelve dudas en nuestro foro."
            link="/recursos-educativos#foro"
            linkText="Unirse al Foro"
          />
          <FeatureCard
            icon={<ShoppingCart size={32} />}
            title="Directorio de Proveedores"
            description="Encuentra fácilmente proveedores de materiales y equipos eléctricos en tu zona."
            link="/directorio-proveedores"
            linkText="Buscar Proveedores"
          />
           <FeatureCard
            icon={<Zap size={32} />}
            title="Generador de Presupuestos"
            description="Crea presupuestos profesionales de forma rápida y sencilla, y guárdalos en tu panel."
            link="/herramientas#presupuestos"
            linkText="Crear Presupuesto"
          />
           <FeatureCard
            icon={<img  alt="Plantillas descargables" className="w-8 h-8" src="https://images.unsplash.com/photo-1658204212985-e0126040f88f" />}
            title="Plantillas Útiles"
            description="Descarga plantillas de documentos y formularios esenciales para tu trabajo diario."
            link="/recursos-educativos#plantillas"
            linkText="Ver Plantillas"
          />
        </div>
      </section>
      
      <section id="faq" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Preguntas Frecuentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <summary className="font-semibold text-lg cursor-pointer text-foreground">¿Cómo me registro en ElectroPro?</summary>
              <p className="mt-2 text-muted-foreground">Es muy fácil. Haz clic en "Únete Gratis Ahora" en la página de inicio o en "Iniciar Sesión" y luego "Crear cuenta". Solo necesitas un correo electrónico y una contraseña.</p>
            </details>
            <details className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <summary className="font-semibold text-lg cursor-pointer text-foreground">¿Las herramientas de cálculo son gratuitas?</summary>
              <p className="mt-2 text-muted-foreground">Sí, todas nuestras calculadoras esenciales y la mayoría de los recursos son completamente gratuitos para los usuarios registrados.</p>
            </details>
             <details className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <summary className="font-semibold text-lg cursor-pointer text-foreground">¿Puedo guardar mis presupuestos generados?</summary>
              <p className="mt-2 text-muted-foreground">¡Absolutamente! Si estás registrado e inicias sesión, todos los presupuestos que generes se guardarán automáticamente en tu panel de usuario personal.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-electric text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Llevar tu Trabajo al Siguiente Nivel?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Únete a la comunidad de ElectroPro y accede a todas las herramientas y recursos que necesitas para triunfar.
          </p>
          <Link to="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-8 py-3">
              Regístrate Hoy Mismo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
