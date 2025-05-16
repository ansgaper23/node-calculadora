import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Repeat, ArrowRightLeft } from 'lucide-react';

const unitCategories = {
  length: {
    name: 'Longitud',
    units: {
      m: { name: 'Metro (m)', factor: 1 },
      cm: { name: 'Centímetro (cm)', factor: 0.01 },
      mm: { name: 'Milímetro (mm)', factor: 0.001 },
      km: { name: 'Kilómetro (km)', factor: 1000 },
      in: { name: 'Pulgada (in)', factor: 0.0254 },
      ft: { name: 'Pie (ft)', factor: 0.3048 },
      yd: { name: 'Yarda (yd)', factor: 0.9144 },
      mi: { name: 'Milla (mi)', factor: 1609.34 },
    }
  },
  power: {
    name: 'Potencia',
    units: {
      W: { name: 'Watt (W)', factor: 1 },
      kW: { name: 'Kilowatt (kW)', factor: 1000 },
      MW: { name: 'Megawatt (MW)', factor: 1000000 },
      hp: { name: 'Caballo de Fuerza (hp)', factor: 745.7 },
      btu_hr: { name: 'BTU/hora', factor: 0.293071 },
    }
  },
  energy: {
    name: 'Energía',
    units: {
      J: { name: 'Joule (J)', factor: 1 },
      kJ: { name: 'Kilojoule (kJ)', factor: 1000 },
      Wh: { name: 'Watt-hora (Wh)', factor: 3600 },
      kWh: { name: 'Kilowatt-hora (kWh)', factor: 3600000 },
      cal: { name: 'Caloría (cal)', factor: 4.184 },
      kcal: { name: 'Kilocaloría (kcal)', factor: 4184 },
      btu: { name: 'BTU', factor: 1055.06 },
    }
  },
  voltage: {
    name: 'Voltaje',
    units: {
      V: { name: 'Volt (V)', factor: 1 },
      mV: { name: 'Milivolt (mV)', factor: 0.001 },
      kV: { name: 'Kilovolt (kV)', factor: 1000 },
    }
  },
  current: {
    name: 'Corriente',
    units: {
      A: { name: 'Ampere (A)', factor: 1 },
      mA: { name: 'Miliampere (mA)', factor: 0.001 },
      kA: { name: 'Kiloampere (kA)', factor: 1000 },
    }
  },
  resistance: {
    name: 'Resistencia',
    units: {
      ohm: { name: 'Ohm (Ω)', factor: 1 },
      kohm: { name: 'Kiloohm (kΩ)', factor: 1000 },
      mohm: { name: 'Megaohm (MΩ)', factor: 1000000 },
    }
  }
};

const UnitConversionCalculator = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState(Object.keys(unitCategories.length.units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(unitCategories.length.units)[1]);
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');

  useEffect(() => {
    const currentUnits = Object.keys(unitCategories[category].units);
    setFromUnit(currentUnits[0]);
    setToUnit(currentUnits.length > 1 ? currentUnits[1] : currentUnits[0]);
    setInputValue('1');
  }, [category]);

  useEffect(() => {
    if (inputValue === '') {
      setOutputValue('');
      return;
    }

    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setOutputValue('Entrada inválida');
      return;
    }

    const fromFactor = unitCategories[category].units[fromUnit]?.factor;
    const toFactor = unitCategories[category].units[toUnit]?.factor;

    if (fromFactor === undefined || toFactor === undefined) {
      setOutputValue('Error de unidad');
      return;
    }

    const result = (val * fromFactor) / toFactor;
    setOutputValue(result.toPrecision(5));

  }, [inputValue, fromUnit, toUnit, category]);

  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Repeat className="w-6 h-6 text-primary" />
            <CardTitle>Conversor de Unidades</CardTitle>
          </div>
          <CardDescription>
            Convierta fácilmente entre diferentes unidades eléctricas y comunes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="category">Categoría de Unidad</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleccione categoría" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitCategories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Label htmlFor="inputValue">Valor</Label>
              <Input 
                id="inputValue" 
                type="number" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ingrese valor"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="fromUnit">De</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger id="fromUnit">
                  <SelectValue placeholder="Unidad origen" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitCategories[category].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={handleSwapUnits} aria-label="Intercambiar unidades">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
          </div>

          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Label htmlFor="outputValue">Resultado</Label>
              <Input 
                id="outputValue" 
                type="text" 
                value={outputValue} 
                readOnly 
                className="font-semibold text-lg"
                placeholder="Resultado"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="toUnit">A</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="toUnit">
                  <SelectValue placeholder="Unidad destino" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitCategories[category].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UnitConversionCalculator;