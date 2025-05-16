import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Power, Trash2, PlusCircle } from 'lucide-react';

const EnergyConsumptionCalculator = () => {
  const { toast } = useToast();
  const [appliances, setAppliances] = useState([{ id: 1, name: '', power: '', hours: '' }]);
  const [costPerKWh, setCostPerKWh] = useState('');
  const [result, setResult] = useState(null);

  const handleAddAppliance = () => {
    setAppliances([...appliances, { id: Date.now(), name: '', power: '', hours: '' }]);
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(appliances.filter(appliance => appliance.id !== id));
  };

  const handleApplianceChange = (id, field, value) => {
    setAppliances(appliances.map(appliance => 
      appliance.id === id ? { ...appliance, [field]: value } : appliance
    ));
  };

  const handleCalculate = () => {
    if (!costPerKWh || appliances.some(app => !app.power || !app.hours)) {
      toast({
        title: 'Error de Validación',
        description: 'Complete la potencia, horas de uso para cada aparato y el costo por kWh.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    let totalEnergyWh = 0;
    const detailedConsumption = appliances.map(appliance => {
      const P = parseFloat(appliance.power);
      const H = parseFloat(appliance.hours);
      if (isNaN(P) || isNaN(H)) {
        toast({ title: 'Error en Datos', description: `Datos inválidos para ${appliance.name || 'un aparato'}.`, variant: 'destructive' });
        throw new Error('Invalid appliance data');
      }
      const energyWh = P * H;
      totalEnergyWh += energyWh;
      return { name: appliance.name || 'Aparato sin nombre', energyWh };
    });

    const totalEnergyKWh = totalEnergyWh / 1000;
    const C = parseFloat(costPerKWh);

    if (isNaN(C)) {
      toast({ title: 'Error en Datos', description: 'Costo por kWh inválido.', variant: 'destructive' });
      setResult(null);
      return;
    }

    const totalCost = totalEnergyKWh * C;

    setResult({
      totalEnergyKWh: totalEnergyKWh.toFixed(2),
      totalCost: totalCost.toFixed(2),
      detailedConsumption,
    });

    toast({
      title: 'Cálculo Exitoso',
      description: `Consumo Total: ${totalEnergyKWh.toFixed(2)} kWh, Costo Estimado: $${totalCost.toFixed(2)}`,
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-3xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Power className="w-6 h-6 text-primary" />
            <CardTitle>Calculadora de Consumo de Energía</CardTitle>
          </div>
          <CardDescription>
            Estime el consumo de energía y el costo asociado para múltiples aparatos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {appliances.map((appliance, index) => (
            <motion.div 
              key={appliance.id} 
              className="p-4 space-y-3 border rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Aparato {index + 1}</Label>
                {appliances.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveAppliance(appliance.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
              <Input 
                placeholder="Nombre del Aparato (Ej: Refrigerador)" 
                value={appliance.name} 
                onChange={(e) => handleApplianceChange(appliance.id, 'name', e.target.value)} 
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="number" 
                  placeholder="Potencia (Watts)" 
                  value={appliance.power} 
                  onChange={(e) => handleApplianceChange(appliance.id, 'power', e.target.value)} 
                />
                <Input 
                  type="number" 
                  placeholder="Horas de Uso / Día" 
                  value={appliance.hours} 
                  onChange={(e) => handleApplianceChange(appliance.id, 'hours', e.target.value)} 
                />
              </div>
            </motion.div>
          ))}
          <Button variant="outline" onClick={handleAddAppliance} className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" /> Añadir Aparato
          </Button>
          <div>
            <Label htmlFor="costPerKWh">Costo por kWh ($)</Label>
            <Input id="costPerKWh" type="number" placeholder="Ej: 0.15" value={costPerKWh} onChange={(e) => setCostPerKWh(e.target.value)} />
          </div>
          <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
            Calcular Consumo
          </Button>
        </CardContent>
        {result && (
          <CardFooter className="flex flex-col items-start p-6 mt-6 space-y-4 border-t">
            <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className="w-full">
              <h3 className="text-lg font-semibold gradient-text">Resultados del Cálculo Diario:</h3>
              <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 text-sm">
                <p><strong className="text-muted-foreground">Consumo Total:</strong> {result.totalEnergyKWh} kWh</p>
                <p><strong className="text-muted-foreground">Costo Estimado:</strong> ${result.totalCost}</p>
              </div>
              <h4 className="mt-4 text-md font-semibold">Desglose por Aparato:</h4>
              <ul className="mt-1 space-y-1 text-xs list-disc list-inside">
                {result.detailedConsumption.map((item, idx) => (
                  <li key={idx}>{item.name}: {(item.energyWh / 1000).toFixed(2)} kWh</li>
                ))}
              </ul>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default EnergyConsumptionCalculator;