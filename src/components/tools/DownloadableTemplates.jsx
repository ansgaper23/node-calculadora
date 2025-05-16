import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const templates = [
  { 
    name: 'Plantilla de Presupuesto Básico (CSV)', 
    description: 'Un formato CSV simple para crear presupuestos. Incluye columnas para descripción, cantidad, precio unitario y total.', 
    icon: FileSpreadsheet,
    fileName: 'plantilla_presupuesto_basico.csv',
    fileContent: `"Descripción","Cantidad","Precio Unitario","Total"\n"Ejemplo de Servicio/Producto","1","100.00","100.00"\n"Otro Ítem","2","50.00","100.00"`
  },
  { 
    name: 'Lista de Verificación de Seguridad (TXT)', 
    description: 'Una lista de verificación básica en formato de texto para recordar puntos clave de seguridad antes de un trabajo.', 
    icon: FileText,
    fileName: 'lista_verificacion_seguridad.txt',
    fileContent: `LISTA DE VERIFICACIÓN DE SEGURIDAD ELÉCTRICA (BÁSICA)\n\nANTES DE COMENZAR:\n[ ] ¿Se ha desenergizado el circuito? (LOTO)\n[ ] ¿Se ha verificado la ausencia de tensión con un multímetro?\n[ ] ¿Se cuenta con el EPP adecuado (guantes, gafas, etc.)?\n[ ] ¿El área de trabajo está despejada y segura?\n[ ] ¿Se conocen los procedimientos de emergencia?\n\nHERRAMIENTAS Y EQUIPO:\n[ ] ¿Las herramientas están en buen estado y son adecuadas para el trabajo?\n[ ] ¿Los equipos de medición están calibrados y funcionan correctamente?\n\nAL FINALIZAR:\n[ ] ¿Se han retirado todas las herramientas y materiales?\n[ ] ¿Se ha restaurado la energía de forma segura (si aplica)?\n[ ] ¿Se ha verificado el correcto funcionamiento del sistema?\n\nNota: Esta es una lista genérica. Adáptela a sus necesidades y a los códigos locales.`
  },
  {
    name: 'Formato de Informe de Inspección (CSV)',
    description: 'Plantilla CSV para registrar observaciones durante una inspección eléctrica.',
    icon: FileSpreadsheet,
    fileName: 'formato_informe_inspeccion.csv',
    fileContent: `"Fecha","Ubicación","Elemento Inspeccionado","Observación","Acción Requerida","Estado"\n"AAAA-MM-DD","Ej: Tablero Principal","Conexiones","Algunas conexiones flojas","Reapretar terminales","Pendiente"`
  }
];

const DownloadableTemplates = () => {
  const { toast } = useToast();

  const handleDownload = (fileName, fileContent, mimeType = 'text/plain') => {
    const blob = new Blob([fileContent], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: "Descarga Iniciada", description: `Se está descargando ${fileName}.` });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-3xl mx-auto glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Download className="w-6 h-6 text-primary" />
            <CardTitle>Plantillas Descargables</CardTitle>
          </div>
          <CardDescription>Optimice sus flujos de trabajo con estas plantillas listas para usar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {templates.map((template, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-muted/30">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                  <div className="p-2 rounded-md bg-primary/20 text-primary">
                    <template.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">{template.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload(
                      template.fileName, 
                      template.fileContent, 
                      template.fileName.endsWith('.csv') ? 'text/csv;charset=utf-8;' : 'text/plain;charset=utf-8;'
                    )}
                  >
                    <Download className="w-4 h-4 mr-2" /> Descargar Plantilla
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
           <p className="mt-6 text-xs text-muted-foreground pt-4 border-t">
            Estas plantillas son ejemplos básicos. Adáptelas y modifíquelas según sus necesidades específicas y los requisitos de sus proyectos.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DownloadableTemplates;