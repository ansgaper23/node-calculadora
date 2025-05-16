
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Zap, Cable, Power, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

const calculatorLinks = [
  { name: 'Caída de Tensión', path: 'voltage-drop', icon: Zap, description: 'Calcule la caída de tensión en circuitos.' },
  { name: 'Calibre de Cable', path: 'wire-gauge', icon: Cable, description: 'Determine el calibre de cable adecuado.' },
  { name: 'Consumo de Energía', path: 'energy-consumption', icon: Power, description: 'Estime el consumo energético.' },
  { name: 'Conversión de Unidades', path: 'unit-conversion', icon: Repeat, description: 'Convierta unidades eléctricas comunes.' },
];

const CalculatorsPage = () => {
  const location = useLocation();
  const isCalculatorHome = location.pathname === '/calculators';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight gradient-text md:text-5xl">Calculadoras Eléctricas</h1>
        <p className="mt-4 text-lg text-muted-foreground">Herramientas precisas para sus cálculos eléctricos diarios.</p>
      </header>

      {isCalculatorHome && (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {calculatorLinks.map((calc) => (
            <motion.div
              key={calc.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"}}
            >
              <Link to={calc.path}>
                <Card className="h-full transition-shadow duration-300 ease-in-out hover:shadow-xl glassmorphism-card">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10 text-primary">
                      <calc.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{calc.name}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary hover:underline">Acceder a la calculadora &rarr;</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </section>
      )}
      
      {!isCalculatorHome && (
        <Tabs defaultValue={location.pathname.split('/').pop()} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {calculatorLinks.map((calc) => (
              <TabsTrigger key={calc.path} value={calc.path} asChild>
                <Link to={calc.path} className="flex items-center justify-center gap-2">
                  <calc.icon className="w-4 h-4" /> {calc.name}
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

export default CalculatorsPage;
  