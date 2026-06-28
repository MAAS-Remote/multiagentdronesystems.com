import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { orgSchema } from './lib/schemas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyNature from './components/WhyNature';
import HomepageDepartments from './components/HomepageDepartments';
import Products from './components/Products';
import WhatWeAre from './components/WhatWeAre';
import MultiAgent from './components/MultiAgent';
import UseCases from './components/UseCases';
import Ottawa from './components/Ottawa';
import FAQ from './components/FAQ';
import Careers from './components/Careers';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';

const HomePage: React.FC<{ onSectionChange: (section: string) => void }> = ({ onSectionChange }) => {
  return (
    <>
      <Helmet>
        <title>MADS Inc — Multi-Agent Drone Systems | Ottawa, Canada</title>
        <meta name="description" content="MADS — nature-inspired, multi-agent drone systems from Ottawa, Canada. Avian aerodynamics and distributed autonomy for surveillance, mapping, and delivery." />
      </Helmet>
      <Navbar onSectionChange={onSectionChange} />
      <Hero />
      <Features />
      <WhyNature />
      <HomepageDepartments />
      <Products />
      <WhatWeAre />
      <MultiAgent />
      <UseCases />
      <Ottawa />
      <FAQ />
      <Careers />
      <Footer />
    </>
  );
};

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  return (
    <div className="relative">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>
      {/* Reviews component should be visible on all pages except contact and product pages */}
      {location.pathname !== '/contact' && !location.pathname.startsWith('/product') && (
        <Reviews activeSection={activeSection} />
      )}
      
      <Routes>
        <Route path="/" element={<HomePage onSectionChange={setActiveSection} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;