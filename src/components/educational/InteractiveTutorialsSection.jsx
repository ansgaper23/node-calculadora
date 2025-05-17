import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Section from './Section';

const InteractiveTutorialCard = ({ title, description, children, imagePlaceholder }) => (
  <Dialog>
    <DialogTrigger asChild>
      <motion.div 
        className="bg-muted p-6 rounded-lg cursor-pointer hover:ring-2 hover:ring-brand-yellow transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center mb-3">
          <PlayCircle className="text-brand-yellow mr-3" size={28}/>
          <h4 className="font-semibold text-lg text-foreground">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <img alt={imagePlaceholder} className="w-full h-32 object-cover rounded bg-gray-300 text-gray-500 flex items-center justify-center" src={`https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=${encodeURIComponent(imagePlaceholder)}`} />
      </motion.div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {children}
      </div>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={(e) => e.target.closest('[role="dialog"]')?.querySelector('[aria-label="Close"]')?.click()}>Cerrar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const LeyDeOhmTutorial = () => {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);
  const current = (voltage / resistance).toFixed(3);

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Experimenta con la Ley de Ohm (V = I * R). Ajusta el voltaje y la resistencia para ver cómo cambia la corriente.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4 p-4 border rounded-lg bg-background">
          <div>
            <Label htmlFor="voltage-slider" className="flex justify-between">Voltaje (V): <span className="text-brand-yellow font-bold">{voltage} V</span></Label>
            <Slider id="voltage-slider" min={1} max={240} step={1} value={[voltage]} onValueChange={(val) => setVoltage(val[0])} />
          </div>
          <div>
            <Label htmlFor="resistance-slider" className="flex justify-between">Resistencia (Ω): <span className="text-brand-yellow font-bold">{resistance} Ω</span></Label>
            <Slider id="resistance-slider" min={10} max={1000} step={10} value={[resistance]} onValueChange={(val) => setResistance(val[0])} />
          </div>
        </div>
        <div className="text-center p-6 bg-muted rounded-lg">
          <Zap size={48} className="mx-auto text-brand-yellow mb-3" />
          <p className="text-lg font-semibold text-foreground">Corriente Calculada (I):</p>
          <p className="text-3xl font-bold text-brand-blue">{current} A</p>
          <p className="text-xs text-muted-foreground mt-1">({(parseFloat(current) * 1000).toFixed(1)} mA)</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground p-3 bg-background/50 rounded">
        <strong>Nota:</strong> Esta es una simulación simplificada. En circuitos reales, factores como la temperatura y las tolerancias de los componentes pueden afectar los valores.
      </div>
    </div>
  );
};

const InterruptorSimpleTutorial = () => {
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">Aprende cómo un interruptor simple controla el flujo de corriente hacia una carga (por ejemplo, una bombilla).</p>
      <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-background">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-foreground">Fuente (220V)</span>
          <div className={`w-16 h-1 bg-foreground transition-all duration-300 ${switchOn ? 'bg-brand-yellow' : 'bg-muted'}`}></div>
          <Button onClick={() => setSwitchOn(!switchOn)} variant={switchOn ? "default" : "outline"} className="w-24">
            {switchOn ? "Apagar" : "Encender"}
          </Button>
          <div className={`w-16 h-1 bg-foreground transition-all duration-300 ${switchOn ? 'bg-brand-yellow' : 'bg-muted'}`}></div>
          <LightbulbIcon active={switchOn} />
        </div>
        <p className={`text-sm font-medium ${switchOn ? 'text-green-500' : 'text-red-500'}`}>
          {switchOn ? 'Bombilla ENCENDIDA (Circuito cerrado)' : 'Bombilla APAGADA (Circuito abierto)'}
        </p>
      </div>
      <div className="text-xs text-muted-foreground p-3 bg-background/50 rounded">
        <strong>Funcionamiento:</strong> Al cerrar el interruptor, se completa el circuito, permitiendo que la corriente fluya y encienda la bombilla. Al abrirlo, se interrumpe el flujo.
      </div>
    </div>
  );
};

const LightbulbIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ${active ? 'text-yellow-400 fill-yellow-300/30' : 'text-muted-foreground'}`}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 8A6 6 0 0 0 6 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>
);


const InteractiveTutorialsSection = () => {
  return (
    <Section id="tutoriales" title="Tutoriales Interactivos">
      <p className="text-muted-foreground mb-6">Nuestros tutoriales interactivos te permitirán practicar y entender conceptos complejos de forma visual y amena.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <InteractiveTutorialCard title="Simulación de Ley de Ohm" description="Experimenta cómo cambian el voltaje, la corriente y la resistencia en un circuito simple." imagePlaceholder="Ley de Ohm interactiva">
          <LeyDeOhmTutorial />
        </InteractiveTutorialCard>
        <InteractiveTutorialCard title="Conexión de un Interruptor Simple" description="Aprende paso a paso cómo conectar un interruptor unipolar para controlar una luminaria." imagePlaceholder="Tutorial conexión interruptor">
          <InterruptorSimpleTutorial />
        </InteractiveTutorialCard>
        <InteractiveTutorialCard title="Identificación de Símbolos Eléctricos (Próximamente)" description="Pon a prueba tu conocimiento identificando los símbolos más comunes utilizados en planos eléctricos. Juego interactivo con puntuación." imagePlaceholder="Juego símbolos eléctricos">
          <div className="text-center py-8">
            <Settings size={48} className="mx-auto text-muted-foreground mb-4 animate-spin-slow" />
            <p className="text-muted-foreground">Este tutorial interactivo estará disponible muy pronto. ¡Vuelve a visitarnos!</p>
          </div>
        </InteractiveTutorialCard>
        <InteractiveTutorialCard title="Cálculo de Sección de Conductor (Básico - Próximamente)" description="Simulador básico para entender cómo la corriente y la longitud afectan la elección de la sección de un conductor." imagePlaceholder="Simulador sección conductor">
           <div className="text-center py-8">
            <Settings size={48} className="mx-auto text-muted-foreground mb-4 animate-spin-slow" />
            <p className="text-muted-foreground">Este simulador básico estará disponible muy pronto. ¡Estamos trabajando en ello!</p>
          </div>
        </InteractiveTutorialCard>
      </div>
    </Section>
  );
};

export default InteractiveTutorialsSection;