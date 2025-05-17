import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sigma, Repeat } from 'lucide-react';

const unitCategories = {
  power: {
    name: 'Potencia',
    units: {
      W: { name: 'Watt (W)', factor: 1 },
      kW: { name: 'Kilowatt (kW)', factor: 1000 },
      MW: { name: 'Megawatt (MW)', factor: 1000000 },
      hp: { name: 'Caballo de Fuerza (hp)', factor: 745.7 },
      BTUhr: { name: 'BTU/hora', factor: 0.293071 },
    },
  },
  voltage: {
    name: 'Voltaje',
    units: {
      V: { name: 'Volt (V)', factor: 1 },
      mV: { name: 'Milivolt (mV)', factor: 0.001 },
      kV: { name: 'Kilovolt (kV)', factor: 1000 },
    },
  },
  current: {
    name: 'Corriente',
    units: {
      A: { name: 'Amperio (A)', factor: 1 },
      mA: { name: 'Miliamperio (mA)', factor: 0.001 },
      kA: { name: 'Kiloamperio (kA)', factor: 1000 },
    },
  },
  resistance: {
    name: 'Resistencia',
    units: {
      Ohm: { name: 'Ohm (Ω)', factor: 1 },
      mOhm: { name: 'Miliohm (mΩ)', factor: 0.001 },
      kOhm: { name: 'Kiloohm (kΩ)', factor: 1000 },
      MOhm: { name: 'Megaohm (MΩ)', factor: 1000000 },
    },
  },
  energy: {
    name: 'Energía',
    units: {
      J: { name: 'Joule (J)', factor: 1 },
      kWh: { name: 'Kilowatt-hora (kWh)', factor: 3600000 },
      BTU: { name: 'BTU', factor: 1055.06 },
      cal: { name: 'Caloría (cal)', factor: 4.184 },
    },
  },
};

const UnitConverterPage = () => {
  const [category, setCategory] = useState('power');
  const [fromUnit, setFromUnit] = useState(Object.keys(unitCategories.power.units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(unitCategories.power.units)[1]);
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState('');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setFromUnit(Object.keys(unitCategories[newCategory].units)[0]);
    setToUnit(Object.keys(unitCategories[newCategory].units)[1] || Object.keys(unitCategories[newCategory].units)[0]);
    setInputValue('1');
    setResult('');
  };
  
  const handleUnitChange = (type, newUnit) => {
    if (type === 'from') setFromUnit(newUnit);
    if (type === 'to') setToUnit(newUnit);
    setResult('');
  };

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Entrada inválida');
      return;
    }

    const fromFactor = unitCategories[category].units[fromUnit].factor;
    const toFactor = unitCategories[category].units[toUnit].factor;
    
    const valueInBaseUnit = value * fromFactor;
    const convertedValue = valueInBaseUnit / toFactor;
    
    setResult(convertedValue.toPrecision(5));
  };
  
  const swapUnits = () => {
    const tempFromUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempFromUnit);
    setInputValue(result || '1');
    if (result) {
        const value = parseFloat(result);
        if (isNaN(value)) {
            setResult('Entrada inválida');
            return;
        }
        const fromFactor = unitCategories[category].units[toUnit].factor; 
        const toFactor = unitCategories[category].units[tempFromUnit].factor;
        const valueInBaseUnit = value * fromFactor;
        const convertedValue = valueInBaseUnit / toFactor;
        setResult(convertedValue.toPrecision(5));
    }
  };


  React.useEffect(() => {
    if (inputValue) convertUnits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, fromUnit, toUnit, category]);

  return (
    <div className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-electric text-primary-foreground p-6 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <Sigma size={32} />
              <CardTitle className="text-3xl">Conversor de Unidades Eléctricas</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Convierte fácilmente entre diferentes unidades eléctricas.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría de Unidad</Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category"><SelectValue placeholder="Selecciona categoría" /></SelectTrigger>
                <SelectContent>
                  {Object.keys(unitCategories).map(catKey => (
                    <SelectItem key={catKey} value={catKey}>{unitCategories[catKey].name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="fromUnit">De:</Label>
                <Select value={fromUnit} onValueChange={(val) => handleUnitChange('from', val)}>
                  <SelectTrigger id="fromUnit"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(unitCategories[category].units).map(unitKey => (
                      <SelectItem key={unitKey} value={unitKey}>{unitCategories[category].units[unitKey].name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" onClick={swapUnits} className="mb-1 text-brand-blue hover:text-brand-darkBlue">
                <Repeat size={20} />
              </Button>
              <div className="flex-1 space-y-2">
                <Label htmlFor="toUnit">A:</Label>
                <Select value={toUnit} onValueChange={(val) => handleUnitChange('to', val)}>
                  <SelectTrigger id="toUnit"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(unitCategories[category].units).map(unitKey => (
                      <SelectItem key={unitKey} value={unitKey}>{unitCategories[category].units[unitKey].name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inputValue">Valor a Convertir</Label>
              <Input id="inputValue" type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ingresa valor" />
            </div>
            
            {result && (
              <motion.div 
                className="mt-6 p-4 bg-muted rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-foreground">Resultado:</p>
                <p className="text-2xl font-bold text-brand-yellow">{inputValue} {unitCategories[category].units[fromUnit]?.name.split(' ')[0]} = {result} {unitCategories[category].units[toUnit]?.name.split(' ')[0]}</p>
              </motion.div>
            )}
             <div className="mt-6 text-xs text-muted-foreground">
              <p><strong>Nota:</strong> Las conversiones se basan en factores estándar. Para aplicaciones críticas, verifica siempre los valores.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UnitConverterPage;