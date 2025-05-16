
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, Atom, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

const databaseLinks = [
  { name: 'Calibres de Cable', path: 'wire-gauges', icon: ListChecks, description: 'Información detallada sobre calibres AWG y MCM.' },
  { name: 'Códigos Eléctricos', path: 'electrical-codes', icon: Code, description: 'Resúmenes y referencias a normativas importantes.' },
  { name: 'Símbolos Eléctricos', path: 'electrical-symbols', icon: Atom, description: 'Guía visual de símbolos estándar.' },
  { name: 'Diccionario de Términos', path: 'electrical-terms', icon: BookOpen, description: 'Definiciones de terminología eléctrica.' },
];

const DatabasesPage = () => {
  const location = useLocation();
  const isDatabaseHome = location.pathname === '/databases';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight gradient-text md:text-5xl">Bases de Datos Eléctricas</h1>
        <p className="mt-4 text-lg text-muted-foreground">Consulte información técnica esencial para sus proyectos.</p>
      </header>

      {isDatabaseHome && (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {databaseLinks.map((db) => (
             <motion.div
              key={db.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"}}
            >
              <Link to={db.path}>
                <Card className="h-full transition-shadow duration-300 ease-in-out hover:shadow-xl glassmorphism-card">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-secondary text-secondary-foreground">
                       <db.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{db.name}</CardTitle>
                      <CardDescription>{db.description}</CardDescription>
                    </div>
                  </CardHeader>
                   <CardContent>
                    <p className="text-sm text-primary hover:underline">Consultar base de datos &rarr;</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </section>
      )}
      
      {!isDatabaseHome && (
        <Tabs defaultValue={location.pathname.split('/').pop()} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {databaseLinks.map((db) => (
              <TabsTrigger key={db.path} value={db.path} asChild>
                <Link to={db.path} className="flex items-center justify-center gap-2">
                  <db.icon className="w-4 h-4" /> {db.name}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-6">
             <Outlet />
          </div>
        </Tabs>
      )}
    </motion.div>
  );
};

export default DatabasesPage;
  