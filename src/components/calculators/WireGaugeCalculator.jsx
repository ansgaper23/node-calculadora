import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Cable, AlertCircle } from 'lucide-react';

const WireGaugeCalculator = () => {
  const { toast } = useToast();
  const [current, setCurrent] = useState('');
  const [voltageDropPercent, setVoltageDropPercent] = useState('3');
  const [distance, setDistance] = useState('');
  const [voltage, setVoltage] = useState('');
  const [material, setMaterial] = useState('copper');
  const [phases, setPhases] = useState('single');
  const [result, setResult] = useState(null);

  const ampacityData = {
    copper: {
      '60C': { '14': 15, '12': 20, '10': 30, '8': 40, '6': 55, '4': 70, '3': 85, '2': 95, '1': 110, '1/0': 125, '2/0': 145, '3/0': 165, '4/0': 195 },
      '75C': { '14': 15, '12': 20, '10': 30, '8': 50, '6': 65, '4': 85, '3': 100, '2': 115, '1': 130, '1/0': 150, '2/0': 175, '3/0': 200, '4/0': 230 },
      '90C': { '14': 15, '12': 25, '10': 35, '8': 55, '6': 75, '4': 95, '3': 110, '2': 130, '1': 150, '1/0': 170, '2/0': 195, '3/0': 225, '4/0': 260 },
    },
    aluminum: {
      '60C': { '12': 15, '10': 25, '8': 30, '6': 40, '4': 55, '3': 65, '2': 75, '1': 85, '1/0': 100, '2/0': 115, '3/0': 130, '4/0': 150 },
      '75C': { '12': 20, '10': 25, '8': 40, '6': 50, '4': 65, '3': 75, '2': 90, '1': 100, '1/0': 120, '2/0': 135, '3/0': 155, '4/0': 180 },
      '90C': { '12': 25, '10': 30, '8': 45, '6': 60, '4': 75, '3': 85, '2': 100, '1': 115, '1/0': 135, '2/0': 150, '3/0': 175, '4/0': 205 },
    }
  };
  const wireResistivity = { 
    copper: { '14': 3.14, '12': 1.98, '10': 1.24, '8': 0.778, '6': 0.491, '4': 0.308, '2': 0.194, '1/0': 0.122, '2/0': 0.0967, '3/0': 0.0766, '4/0': 0.0608 }, 
    aluminum: { '12': 3.18, '10': 2.00, '8': 1.26, '6': 0.790, '4': 0.499, '2': 0.313, '1/0': 0.197, '2/0': 0.156, '3/0': 0.124, '4/0': 0.0980 }
  };


  const handleCalculate = () => {
    if (!current || !voltageDropPercent || !distance || !voltage) {
      toast({
        title: 'Error de Validación',
        description: 'Por favor, complete todos los campos obligatorios.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    const I = parseFloat(current);
    const VD_percent = parseFloat(voltageDropPercent);
    const L = parseFloat(distance);
    const V = parseFloat(voltage);

    if (isNaN(I) || isNaN(VD_percent) || isNaN(L) || isNaN(V)) {
      toast({
        title: 'Error en los Datos',
        description: 'Por favor, ingrese valores numéricos válidos.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    const maxVoltageDrop = (V * VD_percent) / 100;
    
    let requiredCMA;
    if (phases === 'single') {
      requiredCMA = (2 * 10.75 * I * L) / maxVoltageDrop; 
    } else { 
      requiredCMA = (Math.sqrt(3) * 10.75 * I * L) / maxVoltageDrop;
    }
    
    const K_copper = 10.75; 
    const K_aluminum = 17.7; 
    const K = material === 'copper' ? K_copper : K_aluminum;

    let calculatedWireSizeVD = null;
    const sortedWireSizes = Object.entries(wireResistivity[material])
      .map(([size, res]) => {
        let cma;
        if (size.includes('/0')) {
          const zeros = size.split('/')[0].length;
          cma = Math.pow(10, zeros -1) * 105600; 
        } else if (!isNaN(parseInt(size))) {
          cma = 211600 / Math.pow(1.1229322, 2*(parseInt(size) - 1)); 
        } else {
          cma = 0;
        }
        return { size, res, cma };
      })
      .sort((a, b) => b.cma - a.cma); 

    for (const wire of sortedWireSizes) {
      let vd;
      if (phases === 'single') {
        vd = (2 * I * wire.res * L) / 1000;
      } else {
        vd = (Math.sqrt(3) * I * wire.res * L) / 1000;
      }
      if (vd <= maxVoltageDrop) {
        calculatedWireSizeVD = wire.size;
        break;
      }
    }
    
    let calculatedWireSizeAmpacity = null;
    const ampacityTable = ampacityData[material]['75C']; 
    const sortedAmpacitySizes = Object.keys(ampacityTable).sort((a, b) => {
        const valA = a.includes('/') ? parseInt(a.split('/')[0]) + 100 : parseInt(a);
        const valB = b.includes('/') ? parseInt(b.split('/')[0]) + 100 : parseInt(b);
        return valA - valB;
    });

    for (const size of sortedAmpacitySizes) {
        if (ampacityTable[size] >= I) {
            calculatedWireSizeAmpacity = size;
            break;
        }
    }
    
    let finalWireSize = null;
    if (calculatedWireSizeVD && calculatedWireSizeAmpacity) {
        const vdCMA = sortedWireSizes.find(w => w.size === calculatedWireSizeVD)?.cma || 0;
        const ampCMA = sortedWireSizes.find(w => w.size === calculatedWireSizeAmpacity)?.cma || 0;
        finalWireSize = vdCMA > ampCMA ? calculatedWireSizeVD : calculatedWireSizeAmpacity;
    } else if (calculatedWireSizeVD) {
        finalWireSize = calculatedWireSizeVD;
    } else if (calculatedWireSizeAmpacity) {
        finalWireSize = calculatedWireSizeAmpacity;
    }


    if (finalWireSize) {
      setResult({
        wireSize: finalWireSize,
        reasonVD: `Basado en caída de tensión: ${calculatedWireSizeVD || 'N/A'} AWG`,
        reasonAmpacity: `Basado en ampacidad (75°C): ${calculatedWireSizeAmpacity || 'N/A'} AWG`,
        requiredCMA: requiredCMA.toFixed(0)
      });
      toast({
        title: 'Cálculo Exitoso',
        description: `Calibre de cable recomendado: ${finalWireSize} AWG (${material})`,
      });
    } else {
      setResult(null);
      toast({
        title: 'No se encontró un calibre adecuado',
        description: 'Verifique los parámetros o la carga es demasiado alta para los calibres disponibles.',
        variant: 'destructive',
      });
    }
  };
  
  useEffect(() => {
    setResult(null);
  }, [material, phases]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Cable className="w-6 h-6 text-primary" />
            <CardTitle>Calculadora de Calibre de Cable</CardTitle>
          </div>
          <CardDescription>
            Determine el calibre de cable (AWG) adecuado según la corriente, caída de tensión permitida, distancia y material.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="current">Corriente (A)</Label>
              <Input id="current" type="number" placeholder="Ej: 20" value={current} onChange={(e) => setCurrent(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="voltageDropPercent">Caída de Tensión Máxima (%)</Label>
              <Select value={voltageDropPercent} onValueChange={setVoltageDropPercent}>
                <SelectTrigger id="voltageDropPercent">
                  <SelectValue placeholder="Seleccione %" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1%</SelectItem>
                  <SelectItem value="2">2%</SelectItem>
                  <SelectItem value="3">3% (Recomendado Ramales)</SelectItem>
                  <SelectItem value="4">4%</SelectItem>
                  <SelectItem value="5">5% (Recomendado Alimentadores)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="distance">Distancia Unidireccional (pies)</Label>
              <Input id="distance" type="number" placeholder="Ej: 150" value={distance} onChange={(e) => setDistance(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="voltage">Voltaje del Sistema (V)</Label>
              <Input id="voltage" type="number" placeholder="Ej: 240" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
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
            Calcular Calibre de Cable
          </Button>
        </CardContent>
        {result && (
          <CardFooter className="flex flex-col items-start p-6 mt-6 space-y-4 border-t">
            <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className="w-full">
              <h3 className="text-lg font-semibold gradient-text">Resultados del Cálculo:</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><strong className="text-muted-foreground">Calibre Recomendado:</strong> {result.wireSize} AWG ({material})</p>
                <p><strong className="text-muted-foreground">CMA Requerido (VD):</strong> {result.requiredCMA} cmil</p>
                <p className="text-xs text-muted-foreground/80">{result.reasonVD}</p>
                <p className="text-xs text-muted-foreground/80">{result.reasonAmpacity}</p>
              </div>
              <div className="flex items-center p-3 mt-4 text-sm border rounded-md border-yellow-500 bg-yellow-500/10 text-yellow-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>Consulte siempre el NEC y códigos locales. Este cálculo es una estimación.</span>
              </div>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default WireGaugeCalculator;