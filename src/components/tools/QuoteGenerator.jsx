import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { FileText, PlusCircle, Trash2, Printer, DollarSign } from 'lucide-react';

const QuoteGenerator = () => {
  const { toast } = useToast();
  const [quoteDetails, setQuoteDetails] = useState({
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    quoteNumber: `Q-${Date.now().toString().slice(-6)}`,
    quoteDate: new Date().toISOString().slice(0, 10),
    validUntil: '',
    notes: '',
  });
  const [items, setItems] = useState([{ id: 1, description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  const [taxRate, setTaxRate] = useState(0); 
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    let currentSubtotal = 0;
    items.forEach(item => {
      currentSubtotal += parseFloat(item.total) || 0;
    });
    setSubtotal(currentSubtotal);

    const currentTax = (currentSubtotal - parseFloat(discount || 0)) * (parseFloat(taxRate || 0) / 100);
    setTotalTax(currentTax);

    setGrandTotal(currentSubtotal - parseFloat(discount || 0) + currentTax);

  }, [items, taxRate, discount]);

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setQuoteDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          newItem.total = (parseFloat(newItem.quantity) || 0) * (parseFloat(newItem.unitPrice) || 0);
        }
        return newItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePrint = () => {
    toast({ title: "Imprimir Presupuesto", description: "La funcionalidad de impresión está en desarrollo." });
    window.print();
  };
  
  const handleSave = () => {
    localStorage.setItem('quoteData', JSON.stringify({ quoteDetails, items, taxRate, discount }));
    toast({ title: "Presupuesto Guardado", description: "Los datos del presupuesto se han guardado localmente." });
  };

  useEffect(() => {
    const savedData = localStorage.getItem('quoteData');
    if (savedData) {
      const { quoteDetails: sd, items: si, taxRate: st, discount: sdisc } = JSON.parse(savedData);
      if (sd) setQuoteDetails(sd);
      if (si) setItems(si);
      if (st) setTaxRate(st);
      if (sdisc) setDiscount(sdisc);
      toast({ title: "Datos Cargados", description: "Se cargaron datos de un presupuesto anterior." });
    }
  }, []);


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-4xl mx-auto glassmorphism-card print-area">
        <CardHeader className="print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <CardTitle>Generador de Presupuestos</CardTitle>
          </div>
          <CardDescription>Cree presupuestos profesionales para sus clientes.</CardDescription>
        </CardHeader>
        
        <div className="p-6 space-y-6 print-header-info hidden print:block text-center mb-4">
            <h1 className="text-2xl font-bold">PRESUPUESTO</h1>
            <p>Número: {quoteDetails.quoteNumber} | Fecha: {quoteDetails.quoteDate}</p>
        </div>

        <CardContent className="space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Detalles del Cliente</h3>
              <div className="space-y-2">
                <Label htmlFor="clientName">Nombre del Cliente</Label>
                <Input id="clientName" name="clientName" value={quoteDetails.clientName} onChange={handleDetailChange} placeholder="Nombre completo" />
                <Label htmlFor="clientAddress">Dirección</Label>
                <Input id="clientAddress" name="clientAddress" value={quoteDetails.clientAddress} onChange={handleDetailChange} placeholder="Calle, Ciudad, CP" />
                <Label htmlFor="clientEmail">Correo Electrónico</Label>
                <Input id="clientEmail" name="clientEmail" type="email" value={quoteDetails.clientEmail} onChange={handleDetailChange} placeholder="ejemplo@correo.com" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Detalles del Presupuesto</h3>
              <div className="space-y-2">
                <Label htmlFor="quoteNumber">Número de Presupuesto</Label>
                <Input id="quoteNumber" name="quoteNumber" value={quoteDetails.quoteNumber} onChange={handleDetailChange} readOnly />
                <Label htmlFor="quoteDate">Fecha</Label>
                <Input id="quoteDate" name="quoteDate" type="date" value={quoteDetails.quoteDate} onChange={handleDetailChange} />
                <Label htmlFor="validUntil">Válido Hasta</Label>
                <Input id="validUntil" name="validUntil" type="date" value={quoteDetails.validUntil} onChange={handleDetailChange} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Ítems del Presupuesto</h3>
            {items.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="grid grid-cols-12 gap-2 mb-2 items-center"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              >
                <Input className="col-span-5 print:border-none" placeholder="Descripción del servicio/producto" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                <Input className="col-span-2 print:border-none" type="number" placeholder="Cant." value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
                <Input className="col-span-2 print:border-none" type="number" placeholder="P. Unit." value={item.unitPrice} onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)} />
                <Input className="col-span-2 print:border-none" type="number" placeholder="Total" value={item.total.toFixed(2)} readOnly />
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="col-span-1 print:hidden">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </motion.div>
            ))}
            <Button variant="outline" onClick={addItem} className="mt-2 print:hidden">
              <PlusCircle className="w-4 h-4 mr-2" /> Añadir Ítem
            </Button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea id="notes" name="notes" value={quoteDetails.notes} onChange={handleDetailChange} placeholder="Términos, condiciones, etc." className="print:border-none"/>
            </div>
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between items-center">
                <Label>Subtotal:</Label>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="discount">Descuento ($):</Label>
                <Input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-24 h-8 print:border-none" placeholder="0.00"/>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="taxRate">Tasa de Impuesto (%):</Label>
                <Input id="taxRate" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-20 h-8 print:border-none" placeholder="0"/>
              </div>
              <div className="flex justify-between items-center">
                <Label>Impuesto Total:</Label>
                <span className="font-semibold">${totalTax.toFixed(2)}</span>
              </div>
              <hr/>
              <div className="flex justify-between items-center text-xl font-bold text-primary">
                <Label>TOTAL GENERAL:</Label>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 print:hidden">
          <Button variant="outline" onClick={handleSave}>
            <DollarSign className="w-4 h-4 mr-2" /> Guardar Presupuesto
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Imprimir / Guardar PDF
          </Button>
        </CardFooter>
      </Card>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:border-none { border: none !important; }
          .print-header-info { display: block !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default QuoteGenerator;