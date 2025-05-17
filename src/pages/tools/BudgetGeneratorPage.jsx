import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FileText, PlusCircle, Trash2, Save, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from '@/contexts/AuthContext';

const BudgetGeneratorPage = () => {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [items, setItems] = useState([{ id: 1, description: '', quantity: 1, unitPrice: '', total: 0 }]);
  const [currency, setCurrency] = useState('PEN');
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(18); // IGV Perú
  const [taxAmount, setTaxAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let currentSubtotal = 0;
    items.forEach(item => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      item.total = quantity * unitPrice;
      currentSubtotal += item.total;
    });
    setSubtotal(currentSubtotal);
    const currentTaxAmount = currentSubtotal * (taxRate / 100);
    setTaxAmount(currentTaxAmount);
    setGrandTotal(currentSubtotal + currentTaxAmount);
  }, [items, taxRate]);

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, unitPrice: '', total: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const saveBudget = () => {
    if (!user) {
      toast({ title: "Acción Requerida", description: "Debes iniciar sesión para guardar presupuestos.", variant: "destructive" });
      return;
    }
    if (!projectName.trim() || !clientName.trim()) {
      toast({ title: "Campos incompletos", description: "Por favor, ingresa el nombre del proyecto y del cliente.", variant: "destructive" });
      return;
    }
    const budgetData = {
      id: `budget-${Date.now()}`,
      projectName,
      clientName,
      items,
      currency,
      subtotal,
      taxRate,
      taxAmount,
      grandTotal,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    
    const savedBudgets = JSON.parse(localStorage.getItem('userBudgets') || '[]');
    savedBudgets.push(budgetData);
    localStorage.setItem('userBudgets', JSON.stringify(savedBudgets));
    
    toast({ title: "Presupuesto Guardado", description: `El presupuesto "${projectName}" ha sido guardado en tu panel.` });
  };
  
  const downloadBudget = () => {
    if (!projectName.trim() || items.length === 0) {
      toast({ title: "Datos Insuficientes", description: "Asegúrate de tener un nombre de proyecto e ítems en el presupuesto para descargar.", variant: "destructive" });
      return;
    }

    let content = `Presupuesto: ${projectName}\n`;
    content += `Cliente: ${clientName || 'No especificado'}\n`;
    content += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
    content += `Moneda: ${currency}\n\n`;
    content += "Ítems:\n";
    content += "--------------------------------------------------\n";
    content += "Descripción".padEnd(30) + "Cant.".padStart(5) + "P.Unit.".padStart(10) + "Total".padStart(10) + "\n";
    content += "--------------------------------------------------\n";
    items.forEach(item => {
      content += `${item.description.padEnd(30)}${(item.quantity.toString()).padStart(5)}${(parseFloat(item.unitPrice) || 0).toFixed(2).padStart(10)}${item.total.toFixed(2).padStart(10)}\n`;
    });
    content += "--------------------------------------------------\n";
    content += `Subtotal: ${subtotal.toFixed(2)}\n`;
    content += `Impuesto (${taxRate}%): ${taxAmount.toFixed(2)}\n`;
    content += `Total General: ${grandTotal.toFixed(2)}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Presupuesto_${projectName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({ title: "Descarga Iniciada", description: "Se ha generado un archivo .txt con el presupuesto." });
  }

  return (
    <div className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-electric text-primary-foreground p-6 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <FileText size={32} />
              <CardTitle className="text-3xl">Generador de Presupuestos</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Crea presupuestos detallados para tus proyectos eléctricos.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Nombre del Proyecto</Label>
                <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ej: Instalación Eléctrica Residencial" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName">Nombre del Cliente</Label>
                <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ej: Juan Pérez" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold text-foreground">Ítems del Presupuesto</Label>
              {items.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="grid grid-cols-12 gap-2 items-center p-3 border rounded-md"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="col-span-5 space-y-1">
                    {index === 0 && <Label htmlFor={`desc-${item.id}`}>Descripción</Label>}
                    <Input id={`desc-${item.id}`} placeholder="Material o Servicio" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} />
                  </div>
                  <div className="col-span-2 space-y-1">
                    {index === 0 && <Label htmlFor={`qty-${item.id}`}>Cant.</Label>}
                    <Input id={`qty-${item.id}`} type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="text-center" />
                  </div>
                  <div className="col-span-2 space-y-1">
                    {index === 0 && <Label htmlFor={`price-${item.id}`}>P. Unit.</Label>}
                    <Input id={`price-${item.id}`} type="number" placeholder="0.00" value={item.unitPrice} onChange={e => handleItemChange(item.id, 'unitPrice', e.target.value)} className="text-right" />
                  </div>
                  <div className="col-span-2 space-y-1 text-right">
                    {index === 0 && <Label>Total</Label>}
                    <p className="h-10 flex items-center justify-end pr-3 text-sm">{item.total.toFixed(2)}</p>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {index === 0 && <Label className="opacity-0">.</Label>}
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" onClick={addItem} className="mt-2">
                <PlusCircle size={18} className="mr-2" /> Añadir Ítem
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PEN">PEN (Soles)</SelectItem>
                    <SelectItem value="USD">USD (Dólares)</SelectItem>
                    <SelectItem value="EUR">EUR (Euros)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tasa de Impuesto (%)</Label>
                <Input id="taxRate" type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} placeholder="Ej: 18" />
              </div>
            </div>

            <div className="pt-4 border-t text-right space-y-1">
              <p className="text-md text-muted-foreground">Subtotal: <span className="font-semibold text-foreground">{currency} {subtotal.toFixed(2)}</span></p>
              <p className="text-md text-muted-foreground">Impuesto ({taxRate}%): <span className="font-semibold text-foreground">{currency} {taxAmount.toFixed(2)}</span></p>
              <p className="text-xl font-bold text-brand-blue">Total General: <span className="text-brand-yellow">{currency} {grandTotal.toFixed(2)}</span></p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3 p-6">
            <Button variant="outline" onClick={downloadBudget}>
                <Download size={18} className="mr-2" /> Descargar Presupuesto
            </Button>
            <Button onClick={saveBudget} className="bg-brand-blue hover:bg-brand-darkBlue text-white">
              <Save size={18} className="mr-2" /> Guardar Presupuesto
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default BudgetGeneratorPage;