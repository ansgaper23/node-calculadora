import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import Section from './Section';
import { useToast } from "@/components/ui/use-toast";

const DownloadableItem = ({ title, description, format, fileName }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    let content = "";
    let mimeType = "";
    let fileExtension = "";

    if (format === "DOCX") {
      content = `Este es un documento de ejemplo para: ${title}\n\nDescripción: ${description}\n\n[Contenido del documento ${format} aquí...]`;
      mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      fileExtension = "docx";
    } else if (format === "PDF") {
      content = `Este es un documento PDF de ejemplo para: ${title}\n\nDescripción: ${description}\n\n[Simulación de contenido PDF. La generación real de PDF requiere una librería específica.]`;
      mimeType = "application/pdf"; 
      fileExtension = "pdf";
    } else if (format === "TXT") {
      content = `Plantilla: ${title}\nDescripción: ${description}\n\n[Contenido de la plantilla de texto aquí...]`;
      mimeType = "text/plain";
      fileExtension = "txt";
    } else {
      toast({ title: "Formato no Soportado", description: `La descarga para el formato ${format} no está implementada.`, variant: "destructive" });
      return;
    }
    
    if (format === "PDF") {
         toast({ title: "Descarga PDF (Simulada)", description: `La generación y descarga de archivos PDF reales requiere una librería específica y es una funcionalidad avanzada. Se descargará un TXT como ejemplo.`, variant: "default" });
         mimeType = "text/plain";
         fileExtension = "txt";
    }


    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName || title.replace(/\s+/g, '_')}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({ title: "Descarga Iniciada", description: `Se está descargando "${title}.${fileExtension}".` });
  };


  return (
    <motion.div 
      className="bg-muted p-6 rounded-lg hover:ring-2 hover:ring-brand-yellow transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center mb-2">
        <FileText className="text-brand-blue mr-3" size={24}/>
        <h4 className="font-semibold text-md text-foreground">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs bg-brand-yellow text-brand-darkBlue font-bold px-2 py-0.5 rounded">{format}</span>
        <Button variant="outline" size="sm" onClick={handleDownload}><Download size={16} className="mr-2" /> Descargar</Button>
      </div>
    </motion.div>
  );
};


const TemplatesSection = () => {
  const templates = [
    { title: "Modelo de Certificado de Instalación Eléctrica", description: "Plantilla básica para certificar la finalización de una instalación (referencial).", format: "DOCX", fileName: "Certificado_Instalacion_Electrica" },
    { title: "Lista de Verificación de Seguridad Pre-Trabajo", description: "Checklist para revisar antes de iniciar cualquier tarea eléctrica.", format: "PDF", fileName: "Checklist_Seguridad_Electrica" },
    { title: "Formato de Informe de Mantenimiento Eléctrico", description: "Estructura para documentar las tareas de mantenimiento realizadas.", format: "DOCX", fileName: "Informe_Mantenimiento_Electrico" },
    { title: "Planilla de Cálculo de Carga (Simple)", description: "Plantilla básica para estimar la carga total de una instalación pequeña.", format: "TXT", fileName: "Calculo_Carga_Simple" },
  ];

  return (
    <Section id="plantillas" title="Plantillas Descargables">
      <p className="text-muted-foreground mb-6">Descarga formatos útiles para tu trabajo diario. Estos documentos son ejemplos y deben adaptarse a tus necesidades específicas y normativas locales.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {templates.map(template => <DownloadableItem key={template.title} {...template} />)}
      </div>
    </Section>
  );
};

export default TemplatesSection;