
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Specification from './components/Specification';
import Playground from './components/Playground';
import Examples from './components/Examples';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Specification />
      <Playground />
      <Examples />
      <CTA />
      <Footer />
    </>
  );
};

export default App;
