import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const CalculatorsPage = lazy(() => import('@/pages/CalculatorsPage'));
const VoltageDropCalculator = lazy(() => import('@/components/calculators/VoltageDropCalculator'));
const WireGaugeCalculator = lazy(() => import('@/components/calculators/WireGaugeCalculator'));
const EnergyConsumptionCalculator = lazy(() => import('@/components/calculators/EnergyConsumptionCalculator'));
const UnitConversionCalculator = lazy(() => import('@/components/calculators/UnitConversionCalculator'));

const DatabasesPage = lazy(() => import('@/pages/DatabasesPage'));
const WireGaugesDB = lazy(() => import('@/components/databases/WireGaugesDB'));
const ElectricalCodesDB = lazy(() => import('@/components/databases/ElectricalCodesDB'));
const ElectricalSymbolsDB = lazy(() => import('@/components/databases/ElectricalSymbolsDB'));
const ElectricalTermsDB = lazy(() => import('@/components/databases/ElectricalTermsDB'));

const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));

const ToolsPage = lazy(() => import('@/pages/ToolsPage'));
const QuoteGenerator = lazy(() => import('@/components/tools/QuoteGenerator'));
const MaterialLists = lazy(() => import('@/components/tools/MaterialLists'));
const ToolSuggestions = lazy(() => import('@/components/tools/ToolSuggestions'));
const DownloadableTemplates = lazy(() => import('@/components/tools/DownloadableTemplates'));

const CommunityPage = lazy(() => import('@/pages/CommunityPage'));
const PlaceholderPage = lazy(() => import('@/pages/PlaceholderPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="w-12 h-12 text-primary" />
    </motion.div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="calculators" element={<CalculatorsPage />}>
              <Route index element={<Navigate to="voltage-drop" replace />} />
              <Route path="voltage-drop" element={<VoltageDropCalculator />} />
              <Route path="wire-gauge" element={<WireGaugeCalculator />} />
              <Route path="energy-consumption" element={<EnergyConsumptionCalculator />} />
              <Route path="unit-conversion" element={<UnitConversionCalculator />} />
            </Route>
            <Route path="databases" element={<DatabasesPage />}>
              <Route index element={<Navigate to="wire-gauges" replace />} />
              <Route path="wire-gauges" element={<WireGaugesDB />} />
              <Route path="electrical-codes" element={<ElectricalCodesDB />} />
              <Route path="electrical-symbols" element={<ElectricalSymbolsDB />} />
              <Route path="electrical-terms" element={<ElectricalTermsDB />} />
            </Route>
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="tools" element={<ToolsPage />} />
              <Route path="tools/quote-generator" element={<QuoteGenerator />} />
              <Route path="tools/material-lists" element={<MaterialLists />} />
              <Route path="tools/tool-suggestions" element={<ToolSuggestions />} />
              <Route path="tools/templates" element={<DownloadableTemplates />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="privacy" element={<PlaceholderPage title="Política de Privacidad" message="Nuestra política de privacidad se detallará aquí." />} />
            <Route path="terms" element={<PlaceholderPage title="Términos de Servicio" message="Nuestros términos de servicio se detallarán aquí." />} />
            <Route path="*" element={<PlaceholderPage title="Página No Encontrada (404)" message="La página que busca no existe o ha sido movida."/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;