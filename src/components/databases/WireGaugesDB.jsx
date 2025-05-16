import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ListChecks } from 'lucide-react';

const wireGaugeData = [
  { awg: "4/0", diameter_in: 0.4600, diameter_mm: 11.684, area_kcmil: 211.6, copper_amps_75C: 230, aluminum_amps_75C: 180, resistance_ohm_km_cu: 0.1608, resistance_ohm_km_al: 0.2642 },
  { awg: "3/0", diameter_in: 0.4096, diameter_mm: 10.405, area_kcmil: 167.8, copper_amps_75C: 200, aluminum_amps_75C: 155, resistance_ohm_km_cu: 0.2028, resistance_ohm_km_al: 0.3331 },
  { awg: "2/0", diameter_in: 0.3648, diameter_mm: 9.266, area_kcmil: 133.1, copper_amps_75C: 175, aluminum_amps_75C: 135, resistance_ohm_km_cu: 0.2556, resistance_ohm_km_al: 0.4200 },
  { awg: "1/0", diameter_in: 0.3249, diameter_mm: 8.251, area_kcmil: 105.6, copper_amps_75C: 150, aluminum_amps_75C: 120, resistance_ohm_km_cu: 0.3224, resistance_ohm_km_al: 0.5296 },
  { awg: "1", diameter_in: 0.2893, diameter_mm: 7.348, area_kcmil: 83.69, copper_amps_75C: 130, aluminum_amps_75C: 100, resistance_ohm_km_cu: 0.4066, resistance_ohm_km_al: 0.6679 },
  { awg: "2", diameter_in: 0.2576, diameter_mm: 6.544, area_kcmil: 66.36, copper_amps_75C: 115, aluminum_amps_75C: 90, resistance_ohm_km_cu: 0.5127, resistance_ohm_km_al: 0.8422 },
  { awg: "3", diameter_in: 0.2294, diameter_mm: 5.827, area_kcmil: 52.62, copper_amps_75C: 100, aluminum_amps_75C: 75, resistance_ohm_km_cu: 0.6465, resistance_ohm_km_al: 1.062 },
  { awg: "4", diameter_in: 0.2043, diameter_mm: 5.189, area_kcmil: 41.74, copper_amps_75C: 85, aluminum_amps_75C: 65, resistance_ohm_km_cu: 0.8152, resistance_ohm_km_al: 1.339 },
  { awg: "6", diameter_in: 0.1620, diameter_mm: 4.115, area_kcmil: 26.24, copper_amps_75C: 65, aluminum_amps_75C: 50, resistance_ohm_km_cu: 1.296, resistance_ohm_km_al: 2.129 },
  { awg: "8", diameter_in: 0.1285, diameter_mm: 3.264, area_kcmil: 16.51, copper_amps_75C: 50, aluminum_amps_75C: 40, resistance_ohm_km_cu: 2.061, resistance_ohm_km_al: 3.385 },
  { awg: "10", diameter_in: 0.1019, diameter_mm: 2.588, area_kcmil: 10.38, copper_amps_75C: 30, aluminum_amps_75C: 25, resistance_ohm_km_cu: 3.277, resistance_ohm_km_al: 5.383 },
  { awg: "12", diameter_in: 0.0808, diameter_mm: 2.053, area_kcmil: 6.53, copper_amps_75C: 20, aluminum_amps_75C: 20, resistance_ohm_km_cu: 5.211, resistance_ohm_km_al: 8.560 },
  { awg: "14", diameter_in: 0.0641, diameter_mm: 1.628, area_kcmil: 4.11, copper_amps_75C: 15, aluminum_amps_75C: null, resistance_ohm_km_cu: 8.286, resistance_ohm_km_al: null },
];

const WireGaugesDB = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = wireGaugeData.filter(wire => 
    wire.awg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ListChecks className="w-6 h-6 text-primary" />
            <CardTitle>Base de Datos: Calibres de Cable (AWG)</CardTitle>
          </div>
          <CardDescription>
            Información detallada sobre calibres de cable comunes, incluyendo diámetro, área, ampacidad y resistencia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            type="text"
            placeholder="Buscar por calibre AWG (Ej: 10, 2/0)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 max-w-sm"
          />
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">AWG</TableHead>
                  <TableHead>Diámetro (in)</TableHead>
                  <TableHead>Diámetro (mm)</TableHead>
                  <TableHead>Área (kcmil)</TableHead>
                  <TableHead>Ampacidad Cu (75°C)</TableHead>
                  <TableHead>Ampacidad Al (75°C)</TableHead>
                  <TableHead>Resistencia Cu (Ω/km)</TableHead>
                  <TableHead>Resistencia Al (Ω/km)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? filteredData.map((wire) => (
                  <TableRow key={wire.awg}>
                    <TableCell className="font-medium">{wire.awg}</TableCell>
                    <TableCell>{wire.diameter_in.toFixed(4)}</TableCell>
                    <TableCell>{wire.diameter_mm.toFixed(3)}</TableCell>
                    <TableCell>{wire.area_kcmil.toFixed(2)}</TableCell>
                    <TableCell>{wire.copper_amps_75C}</TableCell>
                    <TableCell>{wire.aluminum_amps_75C !== null ? wire.aluminum_amps_75C : 'N/A'}</TableCell>
                    <TableCell>{wire.resistance_ohm_km_cu.toFixed(4)}</TableCell>
                    <TableCell>{wire.resistance_ohm_km_al !== null ? wire.resistance_ohm_km_al.toFixed(4) : 'N/A'}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No se encontraron resultados.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Nota: Los valores de ampacidad son referenciales (NEC Tabla 310.16, conductores en canalización, no más de tres conductores portadores de corriente, temperatura ambiente de 30°C). Consulte siempre el NEC y códigos locales para aplicaciones específicas.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WireGaugesDB;