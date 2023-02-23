import { useState } from 'react';
import './App.scss';
import Landing from './components/Landing';
import Link from './components/Link';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Landing />
      <Link />
      <Services />
      <Footer />
    </div>
  )
}

export default App
