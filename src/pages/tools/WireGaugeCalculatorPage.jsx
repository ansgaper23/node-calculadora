import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Cable } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WireGaugeCalculatorPage = () => {
  const [current, setCurrent] = useState('');
  const [distance, setDistance] = useState('');
  const [voltage, setVoltage] = useState('220');
  const [material, setMaterial] = useState('copper');
  const [voltageDropPercentageAllowed, setVoltageDropPercentageAllowed] = useState('3');
  const [phases, setPhases] = useState('1');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const resistivity = {
    copper: 1.68e-8,
    aluminum: 2.82e-8,
  };

  const ampacityData = { 
    copper: { "18":10, "16":13, "14":20, "12":25, "10":30, "8":40, "6":55, "4":70, "2":95, "1":110, "1/0":125, "2/0":145, "3/0":165, "4/0":195, "250":215, "300":240, "350":260, "400":280, "500":320 },
    aluminum: { "12":20, "10":25, "8":30, "6":40, "4":55, "2":75, "1":85, "1/0":100, "2/0":115, "3/0":130, "4/0":150, "250":170, "300":190, "350":210, "400":225, "500":260 }
  };
  
  const wireGaugeAreas = { 
    "18": 0.823, "16": 1.31, "14": 2.08, "12": 3.31, "10": 5.26, 
    "8": 8.37, "6": 13.3, "4": 21.2, "2": 33.6, "1": 42.4, 
    "1/0": 53.5, "2/0": 67.4, "3/0": 85.0, "4/0": 107.2,
    "250": 127, "300": 152, "350": 177, "400": 203, "500": 253 
  };

  const calculateWireGauge = () => {
    setError('');
    setResult(null);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const V = parseFloat(voltage);
    const VDP = parseFloat(voltageDropPercentageAllowed) / 100;
    const numPhases = parseInt(phases);

    if (isNaN(I) || isNaN(L) || isNaN(V) || isNaN(VDP) || I <= 0 || L <= 0 || V <= 0 || VDP <= 0) {
      setError('Por favor, ingresa valores válidos y positivos para todos los campos.');
      return;
    }

    const maxVoltageDrop = V * VDP;
    
    let requiredAreaMM2;
    if (numPhases === 1) {
      requiredAreaMM2 = (2 * resistivity[material] * I * L) / maxVoltageDrop * 1_000_000; 
    } else if (numPhases === 3) {
      requiredAreaMM2 = (Math.sqrt(3) * resistivity[material] * I * L) / maxVoltageDrop * 1_000_000;
    } else {
      setError('Número de fases no válido.');
      return;
    }

    let suitableGaugeAmpacity = null;
    const materialAmpacity = ampacityData[material];
    for (const gauge in materialAmpacity) {
      if (materialAmpacity[gauge] >= I) {
        suitableGaugeAmpacity = gauge;
        break;
      }
    }
    if (!suitableGaugeAmpacity) {
        setError(`No se encontró un calibre estándar con ampacidad suficiente para ${I}A en ${material}. Considera dividir la carga o usar conductores en paralelo.`);
        return;
    }


    let suitableGaugeVoltageDrop = null;
    const sortedGauges = Object.entries(wireGaugeAreas)
      .sort(([, areaA], [, areaB]) => areaA - areaB); 

    for (const [gauge, area] of sortedGauges) {
      if (area >= requiredAreaMM2) {
        suitableGaugeVoltageDrop = gauge;
        break;
      }
    }
    
    if (!suitableGaugeVoltageDrop) {
        setError(`No se encontró un calibre estándar para el área calculada (${requiredAreaMM2.toFixed(2)} mm²). Esto puede indicar una distancia muy larga o una caída de tensión permitida muy baja.`);
        return;
    }

    const finalGauge = wireGaugeAreas[suitableGaugeAmpacity] > wireGaugeAreas[suitableGaugeVoltageDrop] ? suitableGaugeAmpacity : suitableGaugeVoltageDrop;

    setResult({
      gaugeAWG: finalGauge,
      areaMM2: wireGaugeAreas[finalGauge].toFixed(2),
      calculatedAreaMM2: requiredAreaMM2.toFixed(2),
      ampacityGauge: suitableGaugeAmpacity,
      voltageDropGauge: suitableGaugeVoltageDrop,
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
              <Cable size={32} />
              <CardTitle className="text-3xl">Calculadora de Calibre de Cable</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Determina el calibre de cable (AWG/kcmil o mm²) adecuado para tu instalación.
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
                <Label htmlFor="current">Corriente (A)</Label>
                <Input id="current" type="number" placeholder="Ej: 20" value={current} onChange={(e) => setCurrent(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Longitud del Conductor (metros)</Label>
                <Input id="distance" type="number" placeholder="Ej: 30" value={distance} onChange={(e) => setDistance(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="voltage">Voltaje del Sistema (V)</Label>
                <Select value={voltage} onValueChange={setVoltage}>
                  <SelectTrigger id="voltage"><SelectValue placeholder="Selecciona voltaje" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="110">110V</SelectItem>
                    <SelectItem value="120">120V</SelectItem>
                    <SelectItem value="208">208V</SelectItem>
                    <SelectItem value="220">220V</SelectItem>
                    <SelectItem value="230">230V</SelectItem>
                    <SelectItem value="240">240V</SelectItem>
                    <SelectItem value="380">380V</SelectItem>
                    <SelectItem value="400">400V</SelectItem>
                    <SelectItem value="480">480V</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="voltageDropPercentage">Caída de Tensión Permitida (%)</Label>
                <Select value={voltageDropPercentageAllowed} onValueChange={setVoltageDropPercentageAllowed}>
                  <SelectTrigger id="voltageDropPercentage"><SelectValue placeholder="Selecciona %" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1%</SelectItem>
                    <SelectItem value="2">2%</SelectItem>
                    <SelectItem value="3">3% (Recomendado para circuitos ramales)</SelectItem>
                    <SelectItem value="4">4%</SelectItem>
                    <SelectItem value="5">5% (Recomendado para alimentadores)</SelectItem>
                  </SelectContent>
                </Select>
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
            <Button onClick={calculateWireGauge} className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white">Calcular Calibre</Button>
            
            {result && (
              <motion.div 
                className="mt-6 p-6 bg-muted rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">Calibre Recomendado:</h3>
                <p className="text-foreground">Calibre AWG/kcmil: <strong className="text-brand-yellow">{result.gaugeAWG}</strong></p>
                <p className="text-foreground">Área Equivalente: <strong className="text-brand-yellow">{result.areaMM2} mm²</strong></p>
                <p className="text-xs text-muted-foreground mt-2">
                  (Área calculada por caída de tensión: {result.calculatedAreaMM2} mm². Calibre por ampacidad: {result.ampacityGauge} AWG/kcmil. Calibre por caída de tensión: {result.voltageDropGauge} AWG/kcmil. Se selecciona el mayor.)
                </p>
              </motion.div>
            )}
            <div className="mt-6 text-xs text-muted-foreground">
              <p><strong>Nota:</strong> Esta calculadora considera tanto la ampacidad del conductor (capacidad de corriente) como la caída de tensión permitida. Se recomienda el calibre que cumpla ambos criterios. Siempre verifica las tablas de ampacidad y normativas locales (ej. NEC, IEC) para tu aplicación específica, ya que factores como la temperatura ambiente, tipo de canalización y agrupamiento de conductores pueden afectar la ampacidad real. Esta herramienta es una guía y no sustituye el juicio de un profesional cualificado.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WireGaugeCalculatorPage;