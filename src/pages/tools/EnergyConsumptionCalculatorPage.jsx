import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Zap, Trash2, PlusCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const EnergyConsumptionCalculatorPage = () => {
  const [appliances, setAppliances] = useState([{ id: 1, name: '', power: '', hours: '' }]);
  const [costPerKWh, setCostPerKWh] = useState('');
  const [currency, setCurrency] = useState('PEN');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleAddAppliance = () => {
    setAppliances([...appliances, { id: Date.now(), name: '', power: '', hours: '' }]);
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  const handleApplianceChange = (id, field, value) => {
    setAppliances(appliances.map(app => app.id === id ? { ...app, [field]: value } : app));
  };

  const calculateConsumption = () => {
    setError('');
    setResults(null);
    const cost = parseFloat(costPerKWh);
    if (isNaN(cost) || cost <= 0) {
      setError('Por favor, ingresa un costo por kWh válido y positivo.');
      return;
    }

    let totalKWh = 0;
    const detailedResults = appliances.map(app => {
      const powerW = parseFloat(app.power);
      const hoursDay = parseFloat(app.hours);

      if (isNaN(powerW) || isNaN(hoursDay) || powerW <= 0 || hoursDay <= 0 || !app.name) {
        setError(`Datos inválidos para el aparato "${app.name || 'Desconocido'}". Por favor, completa todos los campos con valores positivos.`);
        throw new Error("Invalid appliance data"); 
      }

      const kWhPerDay = (powerW / 1000) * hoursDay;
      const kWhPerMonth = kWhPerDay * 30; 
      const costPerMonth = kWhPerMonth * cost;
      totalKWh += kWhPerMonth;
      return {
        ...app,
        kWhPerDay: kWhPerDay.toFixed(2),
        kWhPerMonth: kWhPerMonth.toFixed(2),
        costPerMonth: costPerMonth.toFixed(2),
      };
    });

    if (error) return; 

    setResults({
      appliances: detailedResults,
      totalKWhMonth: totalKWh.toFixed(2),
      totalCostMonth: (totalKWh * cost).toFixed(2),
    });
    toast({ title: "Cálculo Realizado", description: "Se ha calculado el consumo energético." });
  };
  
  useEffect(() => {
    if (error) {
        toast({ title: "Error en el Cálculo", description: error, variant: "destructive" });
    }
  }, [error, toast]);


  return (
    <div className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-electric text-primary-foreground p-6 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <Zap size={32} />
              <CardTitle className="text-3xl">Calculadora de Consumo de Energía</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Estima el consumo eléctrico y el costo mensual de tus aparatos.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {appliances.map((app, index) => (
              <motion.div 
                key={app.id} 
                className="p-4 border rounded-lg space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold text-foreground">Aparato Eléctrico {index + 1}</Label>
                  {appliances.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveAppliance(app.id)} className="text-destructive hover:text-destructive/80">
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor={`appName-${app.id}`}>Nombre del Aparato</Label>
                    <Input id={`appName-${app.id}`} type="text" placeholder="Ej: Refrigerador" value={app.name} onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`appPower-${app.id}`}>Potencia (Watts)</Label>
                    <Input id={`appPower-${app.id}`} type="number" placeholder="Ej: 150" value={app.power} onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`appHours-${app.id}`}>Horas de Uso / Día</Label>
                    <Input id={`appHours-${app.id}`} type="number" placeholder="Ej: 8" value={app.hours} onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)} />
                  </div>
                </div>
              </motion.div>
            ))}
            <Button variant="outline" onClick={handleAddAppliance} className="w-full">
              <PlusCircle size={18} className="mr-2" /> Añadir Otro Aparato
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="costPerKWh">Costo por kWh</Label>
                <Input id="costPerKWh" type="number" placeholder="Ej: 0.50" value={costPerKWh} onChange={(e) => setCostPerKWh(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency"><SelectValue placeholder="Selecciona moneda" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PEN">PEN (Soles Peruanos)</SelectItem>
                    <SelectItem value="USD">USD (Dólares Americanos)</SelectItem>
                    <SelectItem value="EUR">EUR (Euros)</SelectItem>
                    <SelectItem value="MXN">MXN (Pesos Mexicanos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculateConsumption} className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white">Calcular Consumo</Button>
            
            {results && (
              <motion.div 
                className="mt-6 p-6 bg-muted rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Resultados Estimados:</h3>
                {results.appliances.map(app => (
                  <div key={app.id} className="mb-3 pb-3 border-b last:border-b-0">
                    <p className="font-medium text-foreground">{app.name}:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                      <li>Consumo Diario: {app.kWhPerDay} kWh</li>
                      <li>Consumo Mensual: {app.kWhPerMonth} kWh</li>
                      <li>Costo Mensual Estimado: {app.costPerMonth} {currency}</li>
                    </ul>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-lg font-semibold text-foreground">Total Mensual Estimado:</p>
                  <p className="text-foreground">Consumo Total: <strong className="text-brand-yellow">{results.totalKWhMonth} kWh</strong></p>
                  <p className="text-foreground">Costo Total: <strong className="text-brand-yellow">{results.totalCostMonth} {currency}</strong></p>
                </div>
              </motion.div>
            )}
            <div className="mt-6 text-xs text-muted-foreground">
              <p><strong>Nota:</strong> Este cálculo es una estimación. El consumo real puede variar según el uso, la eficiencia del aparato y las tarifas eléctricas exactas. Los cálculos mensuales se basan en un promedio de 30 días.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnergyConsumptionCalculatorPage;