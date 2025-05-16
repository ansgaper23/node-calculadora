import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { ListChecks, PlusCircle, Trash2, Save, Download } from 'lucide-react';

const MaterialLists = () => {
  const { toast } = useToast();
  const [listName, setListName] = useState('Mi Lista de Materiales');
  const [items, setItems] = useState([{ id: 1, name: '', quantity: 1, unit: 'unidad', notes: '' }]);
  const [savedLists, setSavedLists] = useState([]);

  useEffect(() => {
    const loadedLists = JSON.parse(localStorage.getItem('materialLists') || '[]');
    setSavedLists(loadedLists);
  }, []);

  const handleItemChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, unit: 'unidad', notes: '' }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSaveList = () => {
    if (!listName.trim()) {
      toast({ title: "Error", description: "Por favor, ingrese un nombre para la lista.", variant: "destructive" });
      return;
    }
    const newList = { id: Date.now(), name: listName, items, createdAt: new Date().toISOString() };
    const updatedLists = [...savedLists, newList];
    setSavedLists(updatedLists);
    localStorage.setItem('materialLists', JSON.stringify(updatedLists));
    toast({ title: "Lista Guardada", description: `La lista "${listName}" ha sido guardada.` });
  };

  const handleLoadList = (listId) => {
    const listToLoad = savedLists.find(list => list.id === listId);
    if (listToLoad) {
      setListName(listToLoad.name);
      setItems(listToLoad.items);
      toast({ title: "Lista Cargada", description: `Se cargó la lista "${listToLoad.name}".` });
    }
  };
  
  const handleDeleteList = (listId) => {
    const updatedLists = savedLists.filter(list => list.id !== listId);
    setSavedLists(updatedLists);
    localStorage.setItem('materialLists', JSON.stringify(updatedLists));
    toast({ title: "Lista Eliminada", description: "La lista ha sido eliminada." });
  };

  const handleExportList = () => {
    if (items.length === 0) {
      toast({ title: "Error", description: "No hay ítems para exportar.", variant: "destructive" });
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nombre,Cantidad,Unidad,Notas\n" 
      + items.map(e => `"${e.name}","${e.quantity}","${e.unit}","${e.notes}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${listName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Lista Exportada", description: "La lista se ha exportado como CSV." });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-3xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ListChecks className="w-6 h-6 text-primary" />
            <CardTitle>Listas de Materiales</CardTitle>
          </div>
          <CardDescription>Organice y gestione sus listas de materiales para proyectos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="listName">Nombre de la Lista</Label>
            <Input id="listName" value={listName} onChange={(e) => setListName(e.target.value)} placeholder="Ej: Instalación Cocina" />
          </div>

          {items.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 border rounded-md items-center"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            >
              <Input className="md:col-span-4" placeholder="Nombre del material" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} />
              <Input className="md:col-span-2" type="number" placeholder="Cant." value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
              <Input className="md:col-span-2" placeholder="Unidad" value={item.unit} onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)} />
              <Input className="md:col-span-3" placeholder="Notas (opcional)" value={item.notes} onChange={(e) => handleItemChange(item.id, 'notes', e.target.value)} />
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="md:col-span-1">
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </motion.div>
          ))}
          <Button variant="outline" onClick={addItem} className="w-full md:w-auto">
            <PlusCircle className="w-4 h-4 mr-2" /> Añadir Ítem
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button onClick={handleSaveList} className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
              <Save className="w-4 h-4 mr-2" /> Guardar Lista Actual
            </Button>
            <Button onClick={handleExportList} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" /> Exportar como CSV
            </Button>
          </div>
          
          {savedLists.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Listas Guardadas</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
                {savedLists.map(list => (
                  <div key={list.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                    <span className="text-sm">{list.name} <span className="text-xs text-muted-foreground">({new Date(list.createdAt).toLocaleDateString()})</span></span>
                    <div className="space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleLoadList(list.id)}>Cargar</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteList(list.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3"/>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MaterialLists;