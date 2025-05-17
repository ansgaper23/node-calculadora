
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Error de Validación",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      await login(email, password);
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "¡Bienvenido de nuevo!",
      });
      navigate('/panel-usuario');
    } catch (error) {
      toast({
        title: "Error al Iniciar Sesión",
        description: error.message || "Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center bg-gradient-to-br from-yellow-300 via-brand-yellow to-blue-400 p-4">
      <motion.div
        className="bg-card p-8 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <LogIn size={48} className="mx-auto text-brand-blue mb-4" />
          <h1 className="text-3xl font-bold text-foreground">Iniciar Sesión</h1>
          <p className="text-muted-foreground">Accede a tu cuenta ElectroPro.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white" disabled={isLoading}>
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-medium text-brand-yellow hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
