
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Search, Phone, Mail, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SupplierCard = ({ name, category, phone, email, address, logo }) => (
  <motion.div
    className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      {logo ? <img  src={logo} alt={`${name} logo`} className="w-12 h-12 mr-4 rounded-full object-cover" src="https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a" /> : <Building size={48} className="text-brand-yellow mr-4" />}
      <div>
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-brand-blue">{category}</p>
      </div>
    </div>
    <div className="space-y-2 text-muted-foreground">
      {phone && <p className="flex items-center"><Phone size={16} className="mr-2 text-brand-yellow" /> {phone}</p>}
      {email && <p className="flex items-center"><Mail size={16} className="mr-2 text-brand-yellow" /> {email}</p>}
      {address && <p className="flex items-center"><MapPin size={16} className="mr-2 text-brand-yellow" /> {address}</p>}
    </div>
    <Button variant="outline" className="w-full mt-4">Contactar</Button>
  </motion.div>
);

const SupplierDirectoryPage = () => {
  const suppliers = [
    { name: 'ElectroPartes S.A.', category: 'Materiales Eléctricos Generales', phone: '555-1234', email: 'ventas@electropartes.com', address: 'Av. Principal 123, Ciudad', logoUrl: 'https://via.placeholder.com/50/FFD700/000000?text=EP' },
    { name: 'Iluminación Total', category: 'Sistemas de Iluminación', phone: '555-5678', email: 'info@iluminaciontotal.com', address: 'Calle Secundaria 45, Ciudad', logoUrl: 'https://via.placeholder.com/50/00529B/FFFFFF?text=IT' },
    { name: 'Cables y Conductores Express', category: 'Cables y Alambres', phone: '555-9012', email: 'pedidos@cablesexpress.com', address: 'Parque Industrial Lote 7, Ciudad' },
    { name: 'Herramientas ProElec', category: 'Herramientas para Electricistas', phone: '555-3456', email: 'soporte@proelec.com', address: 'Plaza Central 89, Ciudad', logoUrl: 'https://via.placeholder.com/50/FFEB3B/000000?text=HP' },
  ];

  return (
    <div className="main-container">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Directorio de Proveedores
      </motion.h1>
      <motion.p 
        className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Encuentra los mejores proveedores de materiales y equipos eléctricos.
      </motion.p>

      <motion.div 
        className="mb-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Input type="text" placeholder="Buscar proveedor o categoría..." className="flex-grow" />
        <Button className="bg-brand-yellow text-brand-darkBlue hover:bg-yellow-400">
          <Search size={20} className="mr-2" /> Buscar
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suppliers.map((supplier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
          <SupplierCard 
            name={supplier.name}
            category={supplier.category}
            phone={supplier.phone}
            email={supplier.email}
            address={supplier.address}
            logo={supplier.logoUrl}
          />
          </motion.div>
        ))}
      </div>
      {suppliers.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">No hay proveedores listados actualmente. Vuelve pronto.</p>
      )}
    </div>
  );
};

export default SupplierDirectoryPage;
