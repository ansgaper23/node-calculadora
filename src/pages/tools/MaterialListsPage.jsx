import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ListChecks, PlusCircle, Trash2, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MaterialListsPage = () => {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null); 
  const [newListName, setNewListName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const savedLists = JSON.parse(localStorage.getItem(`userMaterialLists_${user.id}`) || '[]');
      setLists(savedLists);
    } else {
      setLists([]); 
    }
  }, [user]);

  const saveListsToStorage = (updatedLists) => {
    if (user) {
      localStorage.setItem(`userMaterialLists_${user.id}`, JSON.stringify(updatedLists));
    }
  };

  const handleCreateList = () => {
    if (!user) {
      toast({ title: "Acción Requerida", description: "Debes iniciar sesión para crear listas.", variant: "destructive" });
      return;
    }
    if (!newListName.trim()) {
      toast({ title: "Nombre Requerido", description: "Por favor, ingresa un nombre para la lista.", variant: "destructive" });
      return;
    }
    const newList = { id: `list-${Date.now()}`, name: newListName, items: [] };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    saveListsToStorage(updatedLists);
    setCurrentList(newList);
    setNewListName('');
    toast({ title: "Lista Creada", description: `La lista "${newList.name}" ha sido creada.` });
  };

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);
    setLists(updatedLists);
    saveListsToStorage(updatedLists);
    if (currentList && currentList.id === listId) {
      setCurrentList(null);
    }
    toast({ title: "Lista Eliminada", description: "La lista ha sido eliminada." });
  };

  const handleSelectList = (list) => {
    setCurrentList(list);
    setNewItemName('');
    setNewItemQuantity(1);
  };

  const handleAddItemToList = () => {
    if (!currentList || !newItemName.trim() || newItemQuantity <= 0) {
      toast({ title: "Datos Inválidos", description: "Asegúrate de tener una lista seleccionada, un nombre de ítem y cantidad válida.", variant: "destructive" });
      return;
    }
    const newItem = { id: `item-${Date.now()}`, name: newItemName, quantity: newItemQuantity };
    const updatedCurrentList = { ...currentList, items: [...currentList.items, newItem] };
    
    const updatedLists = lists.map(list => list.id === currentList.id ? updatedCurrentList : list);
    setLists(updatedLists);
    saveListsToStorage(updatedLists);
    setCurrentList(updatedCurrentList);
    setNewItemName('');
    setNewItemQuantity(1);
    toast({ title: "Ítem Añadido", description: `"${newItemName}" añadido a la lista "${currentList.name}".` });
  };

  const handleRemoveItemFromList = (itemId) => {
    if (!currentList) return;
    const updatedItems = currentList.items.filter(item => item.id !== itemId);
    const updatedCurrentList = { ...currentList, items: updatedItems };

    const updatedLists = lists.map(list => list.id === currentList.id ? updatedCurrentList : list);
    setLists(updatedLists);
    saveListsToStorage(updatedLists);
    setCurrentList(updatedCurrentList);
    toast({ title: "Ítem Eliminado", description: "El ítem ha sido eliminado de la lista." });
  };

  const downloadList = () => {
    if (!currentList || currentList.items.length === 0) {
      toast({ title: "Lista Vacía o No Seleccionada", description: "Selecciona una lista con ítems para descargar.", variant: "destructive" });
      return;
    }

    let content = `Lista de Materiales: ${currentList.name}\n`;
    content += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
    content += "Ítems:\n";
    content += "--------------------------------------------------\n";
    content += "Descripción".padEnd(40) + "Cantidad".padStart(10) + "\n";
    content += "--------------------------------------------------\n";
    currentList.items.forEach(item => {
      content += `${item.name.padEnd(40)}${(item.quantity.toString()).padStart(10)}\n`;
    });
    content += "--------------------------------------------------\n";

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Lista_Materiales_${currentList.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({ title: "Descarga Iniciada", description: `Se ha generado un archivo .txt para la lista "${currentList.name}".` });
  };


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
              <ListChecks size={32} />
              <CardTitle className="text-3xl">Listas de Materiales Personalizables</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Crea, gestiona y organiza tus listas de materiales para proyectos.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Mis Listas</h3>
              <div className="space-y-2">
                <Input value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="Nombre de nueva lista" />
                <Button onClick={handleCreateList} className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white">
                  <PlusCircle size={18} className="mr-2" /> Crear Lista
                </Button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {lists.length === 0 && <p className="text-sm text-muted-foreground">No tienes listas creadas. ¡Crea una para empezar!</p>}
                {lists.map(list => (
                  <div key={list.id} className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-accent ${currentList?.id === list.id ? 'bg-accent ring-2 ring-brand-yellow' : 'bg-card border'}`} onClick={() => handleSelectList(list)}>
                    <span className="font-medium text-foreground">{list.name}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={(e) => e.stopPropagation()}>
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente la lista "{list.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteList(list.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              {currentList ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground">Ítems en: <span className="text-brand-yellow">{currentList.name}</span></h3>
                    <Button variant="outline" onClick={downloadList} size="sm">
                      <Download size={16} className="mr-2" /> Descargar Lista
                    </Button>
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="flex-grow space-y-1">
                      <Label htmlFor="newItemName">Nombre del Ítem</Label>
                      <Input id="newItemName" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Ej: Cable THHN #12" />
                    </div>
                    <div className="w-24 space-y-1">
                      <Label htmlFor="newItemQuantity">Cantidad</Label>
                      <Input id="newItemQuantity" type="number" value={newItemQuantity} onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)} min="1" />
                    </div>
                    <Button onClick={handleAddItemToList} className="bg-brand-blue hover:bg-brand-darkBlue text-white">
                      <PlusCircle size={18} className="mr-1 md:mr-2" /> <span className="hidden md:inline">Añadir</span>
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                    {currentList.items.length === 0 && <p className="text-sm text-muted-foreground">Esta lista está vacía. Añade ítems para empezar.</p>}
                    {currentList.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-card border rounded-md hover:bg-accent/50">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItemFromList(item.id)} className="text-destructive hover:text-destructive/80">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted rounded-lg">
                  <ListChecks size={48} className="text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">Selecciona o crea una lista</p>
                  <p className="text-sm text-muted-foreground">Elige una lista de la izquierda para ver sus ítems o crea una nueva.</p>
                </div>
              )}
            </div>
          </CardContent>
           <CardFooter className="p-6 text-xs text-muted-foreground">
            <p>Todas tus listas de materiales se guardan localmente en tu navegador si has iniciado sesión. Para acceder a ellas desde otros dispositivos, necesitarás una solución de almacenamiento en la nube (próximamente con Supabase).</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default MaterialListsPage;