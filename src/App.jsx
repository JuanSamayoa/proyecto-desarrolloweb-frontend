import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Preprimaria from './pages/Preprimaria';
import Primaria from './pages/Primaria';
import Reporte from './pages/Reporte';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/preprimaria" element={<Preprimaria />} />
        <Route path="/primaria" element={<Primaria />} />
        <Route path="/reporte" element={<Reporte />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;