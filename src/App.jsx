import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ToolsPage from '@/pages/ToolsPage';
import VoltageDropCalculatorPage from '@/pages/tools/VoltageDropCalculatorPage';
import WireGaugeCalculatorPage from '@/pages/tools/WireGaugeCalculatorPage';
import EnergyConsumptionCalculatorPage from '@/pages/tools/EnergyConsumptionCalculatorPage';
import UnitConverterPage from '@/pages/tools/UnitConverterPage';
import BudgetGeneratorPage from '@/pages/tools/BudgetGeneratorPage';
import MaterialListsPage from '@/pages/tools/MaterialListsPage';
import SupplierDirectoryPage from '@/pages/SupplierDirectoryPage';
import EducationalResourcesPage from '@/pages/EducationalResourcesPage';
import ForumPage from '@/pages/ForumPage';
import UserDashboardPage from '@/pages/UserDashboardPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/herramientas" element={<ToolsPage />} />
              <Route path="/herramientas/caida-tension" element={<VoltageDropCalculatorPage />} />
              <Route path="/herramientas/calibre-cable" element={<WireGaugeCalculatorPage />} />
              <Route path="/herramientas/consumo-energia" element={<EnergyConsumptionCalculatorPage />} />
              <Route path="/herramientas/conversion-unidades" element={<UnitConverterPage />} />
              <Route path="/herramientas/generador-presupuestos" element={<BudgetGeneratorPage />} />
              <Route path="/herramientas/listas-materiales" element={<MaterialListsPage />} />
              <Route path="/directorio-proveedores" element={<SupplierDirectoryPage />} />
              <Route path="/recursos-educativos" element={<EducationalResourcesPage />} />
              <Route path="/foro" element={<ForumPage />} />
              <Route path="/panel-usuario" element={<UserDashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;