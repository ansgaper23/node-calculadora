import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías agregar validaciones y lógica para actualizar el perfil
    updateUser({ ...user, name, email });
    toast({ title: "Perfil actualizado", description: "Tus datos han sido guardados." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      <label>
        Nombre:
        <Input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <Input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <Button type="submit">Guardar Cambios</Button>
    </form>
  );
};

export default EditProfile;