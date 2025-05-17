import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Calculator } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const VoltageDropCalculatorPage = () => {
  const [material, setMaterial] = useState('copper');
  const [wireSize, setWireSize] = useState('');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [distance, setDistance] = useState('');
  const [phases, setPhases] = useState('1');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const resistivity = {
    copper: 1.68e-8, 
    aluminum: 2.82e-8,
  };

  const wireGaugeData = { 
    "18": 0.823, "16": 1.31, "14": 2.08, "12": 3.31, "10": 5.26, 
    "8": 8.37, "6": 13.3, "4": 21.2, "2": 33.6, "1": 42.4, 
    "1/0": 53.5, "2/0": 67.4, "3/0": 85.0, "4/0": 107.2,
    "250": 127, "300": 152, "350": 177, "400": 203, "500": 253 
  };


  const calculateVoltageDrop = () => {
    setError('');
    setResult(null);
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const numPhases = parseInt(phases);

    if (isNaN(V) || isNaN(I) || isNaN(L) || V <= 0 || I <= 0 || L <= 0 || !wireSize) {
      setError('Por favor, ingresa valores válidos y positivos para todos los campos y selecciona un calibre.');
      return;
    }

    const areaMM2 = wireGaugeData[wireSize];
    if (!areaMM2) {
      setError('Calibre de cable no válido o no encontrado en la base de datos.');
      return;
    }
    const areaM2 = areaMM2 / 1000000; 
    const R = (resistivity[material] * L) / areaM2;
    
    let voltageDrop;
    let voltageDropPercentage;

    if (numPhases === 1) {
      voltageDrop = 2 * I * R;
    } else if (numPhases === 3) {
      voltageDrop = Math.sqrt(3) * I * R;
    } else {
      setError('Número de fases no válido.');
      return;
    }
    
    voltageDropPercentage = (voltageDrop / V) * 100;

    setResult({
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercentage: voltageDropPercentage.toFixed(2),
      finalVoltage: (V - voltageDrop).toFixed(2),
    });
  };

  return (
    <div className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-electric text-primary-foreground p-6 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <Calculator size={32} />
              <CardTitle className="text-3xl">Calculadora de Caída de Tensión</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Calcula la caída de tensión en un conductor eléctrico.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material del Conductor</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="material"><SelectValue placeholder="Selecciona material" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">Cobre</SelectItem>
                    <SelectItem value="aluminum">Aluminio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wireSize">Calibre del Cable (AWG/kcmil)</Label>
                 <Select value={wireSize} onValueChange={setWireSize}>
                  <SelectTrigger id="wireSize"><SelectValue placeholder="Selecciona calibre" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(wireGaugeData).map(gauge => (
                      <SelectItem key={gauge} value={gauge}>{gauge} AWG/kcmil ({wireGaugeData[gauge]} mm²)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="voltage">Voltaje del Sistema (V)</Label>
                <Input id="voltage" type="number" placeholder="Ej: 220" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current">Corriente (A)</Label>
                <Input id="current" type="number" placeholder="Ej: 15" value={current} onChange={(e) => setCurrent(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Longitud del Conductor (metros)</Label>
                <Input id="distance" type="number" placeholder="Ej: 50" value={distance} onChange={(e) => setDistance(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phases">Número de Fases</Label>
                <Select value={phases} onValueChange={setPhases}>
                  <SelectTrigger id="phases"><SelectValue placeholder="Selecciona fases" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Monofásico</SelectItem>
                    <SelectItem value="3">Trifásico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculateVoltageDrop} className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white">Calcular Caída de Tensión</Button>
            
            {result && (
              <motion.div 
                className="mt-6 p-6 bg-muted rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">Resultados:</h3>
                <p className="text-foreground">Caída de Tensión: <strong className="text-brand-yellow">{result.voltageDrop} V</strong></p>
                <p className="text-foreground">Porcentaje de Caída: <strong className="text-brand-yellow">{result.voltageDropPercentage} %</strong></p>
                <p className="text-foreground">Voltaje Final Estimado: <strong className="text-brand-yellow">{result.finalVoltage} V</strong></p>
                {parseFloat(result.voltageDropPercentage) > 5 && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Advertencia</AlertTitle>
                        <AlertDescription>La caída de tensión es superior al 5%, lo cual puede ser excesivo para muchas aplicaciones. Considera usar un calibre de cable mayor o reducir la longitud.</AlertDescription>
                    </Alert>
                )}
              </motion.div>
            )}
             <div className="mt-6 text-xs text-muted-foreground">
              <p><strong>Nota:</strong> Esta calculadora proporciona una estimación. Los valores reales pueden variar debido a factores como la temperatura, el tipo de instalación y las tolerancias del material. Siempre consulta los códigos eléctricos y normativas locales. Para cálculos de precisión, utiliza software especializado o consulta a un ingeniero eléctrico.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VoltageDropCalculatorPage;