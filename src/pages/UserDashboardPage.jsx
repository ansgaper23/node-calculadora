import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '@/contexts/AuthContext';
import { User, FileText, ListChecks, Settings, Edit3, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
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

const DashboardCard = ({ icon, title, description, link, buttonText, count }) => (
  <motion.div
    className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center text-brand-yellow mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3 text-foreground">{title}</h3>
      {typeof count !== 'undefined' && <span className="ml-auto bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded-full">{count}</span>}
    </div>
    <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
    {link && (
      <Link to={link}>
        <Button variant="outline" className="w-full">
          {buttonText}
        </Button>
      </Link>
    )}
  </motion.div>
);


const UserDashboardPage = () => {
  const { user, loading, logout: authLogout } = useContext(AuthContext);
  const [userBudgets, setUserBudgets] = useState([]);
  const [userMaterialLists, setUserMaterialLists] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const budgets = JSON.parse(localStorage.getItem('userBudgets') || '[]').filter(b => b.userId === user.id);
      setUserBudgets(budgets);
      const lists = JSON.parse(localStorage.getItem(`userMaterialLists_${user.id}`) || '[]');
      setUserMaterialLists(lists);
    }
  }, [user]);

  const handleDeleteBudget = (budgetId) => {
    const updatedBudgets = userBudgets.filter(b => b.id !== budgetId);
    setUserBudgets(updatedBudgets);
    // Update all budgets in localStorage, not just user's (simpler for now)
    const allBudgets = JSON.parse(localStorage.getItem('userBudgets') || '[]');
    const filteredAllBudgets = allBudgets.filter(b => b.id !== budgetId);
    localStorage.setItem('userBudgets', JSON.stringify(filteredAllBudgets));
    toast({ title: "Presupuesto Eliminado", description: "El presupuesto ha sido eliminado." });
  };
  
  const handleDeleteMaterialList = (listId) => {
    const updatedLists = userMaterialLists.filter(l => l.id !== listId);
    setUserMaterialLists(updatedLists);
    localStorage.setItem(`userMaterialLists_${user.id}`, JSON.stringify(updatedLists));
    toast({ title: "Lista Eliminada", description: "La lista de materiales ha sido eliminada." });
  };


  if (loading) {
    return <div className="main-container text-center"><p>Cargando panel de usuario...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleManageAction = (action) => {
    toast({ title: "Próximamente", description: `La funcionalidad "${action}" estará disponible pronto.` });
  };

  return (
    <div className="main-container">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Panel de Usuario
      </motion.h1>
      
      <motion.div 
        className="bg-card p-6 rounded-lg shadow-md mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <User size={40} className="text-brand-blue mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Bienvenido, {user.email.split('@')[0]}</h2>
              <p className="text-muted-foreground">Gestiona tu información y actividad en ElectroPro.</p>
            </div>
          </div>
          <Button variant="destructive" onClick={() => { authLogout(); navigate('/'); }}>Cerrar Sesión</Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.4 }}>
          <DashboardCard 
            icon={<FileText size={32} />}
            title="Mis Presupuestos"
            description="Ver y gestionar el historial de todos tus presupuestos creados."
            link="/herramientas/generador-presupuestos"
            buttonText="Ir al Generador"
            count={userBudgets.length}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.5 }}>
          <DashboardCard 
            icon={<ListChecks size={32} />}
            title="Mis Listas de Materiales"
            description="Acceder y administrar tus listas de materiales personalizadas."
            link="/herramientas/listas-materiales"
            buttonText="Ir a Listas"
            count={userMaterialLists.length}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.6 }}>
          <DashboardCard 
            icon={<Settings size={32} />}
            title="Configuración de Perfil"
            description="Actualizar tu información personal y preferencias de cuenta (Próximamente)."
            link="#"
            buttonText="Editar Perfil (Próx.)"
          />
        </motion.div>
      </div>

      {/* Sección de Presupuestos Guardados */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <Card className="mb-10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-brand-blue">Presupuestos Guardados</CardTitle>
            <CardDescription>Aquí puedes ver los presupuestos que has creado.</CardDescription>
          </CardHeader>
          <CardContent>
            {userBudgets.length === 0 ? (
              <p className="text-muted-foreground">No tienes presupuestos guardados. <Link to="/herramientas/generador-presupuestos" className="text-brand-yellow hover:underline">Crea uno ahora</Link>.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {userBudgets.map(budget => (
                  <div key={budget.id} className="flex justify-between items-center p-3 border rounded-md bg-background hover:bg-accent/50">
                    <div>
                      <p className="font-semibold text-foreground">{budget.projectName}</p>
                      <p className="text-sm text-muted-foreground">Cliente: {budget.clientName} - Total: {budget.currency} {budget.grandTotal.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Creado: {new Date(budget.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => toast({title: "Ver Presupuesto (Próximamente)", description: "Podrás ver el detalle completo del presupuesto."})}><Eye size={18} className="text-muted-foreground hover:text-brand-blue" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 size={18} className="text-muted-foreground hover:text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>¿Eliminar Presupuesto?</AlertDialogTitle><AlertDialogDescription>Se eliminará "{budget.projectName}". Esta acción es irreversible.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteBudget(budget.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Sección de Listas de Materiales Guardadas */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-brand-blue">Listas de Materiales Guardadas</CardTitle>
            <CardDescription>Aquí puedes ver tus listas de materiales.</CardDescription>
          </CardHeader>
          <CardContent>
            {userMaterialLists.length === 0 ? (
              <p className="text-muted-foreground">No tienes listas de materiales guardadas. <Link to="/herramientas/listas-materiales" className="text-brand-yellow hover:underline">Crea una ahora</Link>.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {userMaterialLists.map(list => (
                  <div key={list.id} className="flex justify-between items-center p-3 border rounded-md bg-background hover:bg-accent/50">
                    <div>
                      <p className="font-semibold text-foreground">{list.name}</p>
                      <p className="text-sm text-muted-foreground">{list.items.length} ítem(s)</p>
                    </div>
                     <div className="flex space-x-2">
                      <Link to="/herramientas/listas-materiales" state={{ selectedListId: list.id }}>
                        <Button variant="ghost" size="icon"><Edit3 size={18} className="text-muted-foreground hover:text-brand-blue" /></Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 size={18} className="text-muted-foreground hover:text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>¿Eliminar Lista?</AlertDialogTitle><AlertDialogDescription>Se eliminará la lista "{list.name}". Esta acción es irreversible.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteMaterialList(list.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
};

export default UserDashboardPage;