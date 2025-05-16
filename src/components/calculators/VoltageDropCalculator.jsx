
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Zap, AlertCircle } from 'lucide-react';

const VoltageDropCalculator = () => {
  const { toast } = useToast();
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [distance, setDistance] = useState('');
  const [wireSize, setWireSize] = useState('');
  const [material, setMaterial] = useState('copper'); 
  const [phases, setPhases] = useState('single');
  const [result, setResult] = useState(null);

  const wireResistivity = { 
    copper: { '14': 3.14, '12': 1.98, '10': 1.24, '8': 0.778, '6': 0.491, '4': 0.308, '2': 0.194, '1/0': 0.122, '2/0': 0.0967, '3/0': 0.0766, '4/0': 0.0608 }, 
    aluminum: { '12': 3.18, '10': 2.00, '8': 1.26, '6': 0.790, '4': 0.499, '2': 0.313, '1/0': 0.197, '2/0': 0.156, '3/0': 0.124, '4/0': 0.0980 }
  };

  const handleCalculate = () => {
    if (!voltage || !current || !distance || !wireSize) {
      toast({
        title: 'Error de Validación',
        description: 'Por favor, complete todos los campos obligatorios.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const R_per_1000ft = wireResistivity[material]?.[wireSize];

    if (isNaN(V) || isNaN(I) || isNaN(L) || !R_per_1000ft) {
       toast({
        title: 'Error en los Datos',
        description: 'Por favor, ingrese valores numéricos válidos y seleccione un calibre de cable válido.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }
    
    let voltageDrop;
    if (phases === 'single') {
      voltageDrop = (2 * I * R_per_1000ft * L) / 1000;
    } else { // Three-phase
      voltageDrop = (Math.sqrt(3) * I * R_per_1000ft * L) / 1000; 
    }
    
    const percentageDrop = (voltageDrop / V) * 100;

    setResult({
      voltageDrop: voltageDrop.toFixed(2),
      percentageDrop: percentageDrop.toFixed(2),
      finalVoltage: (V - voltageDrop).toFixed(2),
    });

    toast({
      title: 'Cálculo Exitoso',
      description: `Caída de Tensión: ${voltageDrop.toFixed(2)}V (${percentageDrop.toFixed(2)}%)`,
    });
  };

  const availableWireSizes = Object.keys(wireResistivity[material] || {});
  useEffect(() => {
    setWireSize(''); 
    setResult(null);
  }, [material]);


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-primary" />
            <CardTitle>Calculadora de Caída de Tensión</CardTitle>
          </div>
          <CardDescription>
            Calcule la caída de tensión para conductores de cobre o aluminio en sistemas monofásicos o trifásicos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="voltage">Voltaje del Sistema (V)</Label>
              <Input id="voltage" type="number" placeholder="Ej: 120" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="current">Corriente (A)</Label>
              <Input id="current" type="number" placeholder="Ej: 15" value={current} onChange={(e) => setCurrent(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="distance">Distancia Unidireccional (pies)</Label>
              <Input id="distance" type="number" placeholder="Ej: 100" value={distance} onChange={(e) => setDistance(e.target.value)} />
            </div>
             <div>
              <Label htmlFor="material">Material del Conductor</Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger id="material">
                  <SelectValue placeholder="Seleccione material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="copper">Cobre</SelectItem>
                  <SelectItem value="aluminum">Aluminio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="wireSize">Calibre del Cable (AWG)</Label>
               <Select value={wireSize} onValueChange={setWireSize} disabled={!material}>
                <SelectTrigger id="wireSize">
                  <SelectValue placeholder="Seleccione calibre" />
                </SelectTrigger>
                <SelectContent>
                  {availableWireSizes.length > 0 ? (
                    availableWireSizes.map(size => <SelectItem key={size} value={size}>{size} AWG</SelectItem>)
                  ) : (
                    <SelectItem value="" disabled>Seleccione material primero</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phases">Número de Fases</Label>
              <Select value={phases} onValueChange={setPhases}>
                <SelectTrigger id="phases">
                  <SelectValue placeholder="Seleccione fases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Monofásico</SelectItem>
                  <SelectItem value="three">Trifásico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
            Calcular Caída de Tensión
          </Button>
        </CardContent>
        {result && (
          <CardFooter className="flex flex-col items-start p-6 mt-6 space-y-4 border-t">
             <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className="w-full">
              <h3 className="text-lg font-semibold gradient-text">Resultados del Cálculo:</h3>
              <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-3 text-sm">
                <p><strong className="text-muted-foreground">Caída de Tensión:</strong> {result.voltageDrop} V</p>
                <p><strong className="text-muted-foreground">Porcentaje de Caída:</strong> {result.percentageDrop}%</p>
                <p><strong className="text-muted-foreground">Voltaje Final:</strong> {result.finalVoltage} V</p>
              </div>
              {parseFloat(result.percentageDrop) > 5 && (
                <div className="flex items-center p-3 mt-4 text-sm border rounded-md border-destructive bg-destructive/10 text-destructive">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Advertencia: La caída de tensión supera el 5%. Considere un calibre de cable mayor o reducir la distancia.</span>
                </div>
              )}
              {parseFloat(result.percentageDrop) > 3 && parseFloat(result.percentageDrop) <= 5 && (
                 <div className="flex items-center p-3 mt-4 text-sm border rounded-md border-yellow-500 bg-yellow-500/10 text-yellow-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Nota: La caída de tensión es superior al 3% recomendado para ramales. Revise sus requerimientos.</span>
                </div>
              )}
             </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default VoltageDropCalculator;

  