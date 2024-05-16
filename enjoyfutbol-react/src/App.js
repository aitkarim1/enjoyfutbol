import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthUser';
import { ProtectedRoute, PublicRoute } from './components/RouteProtected';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import Partidos from './pages/Partidos';
import Partido from './pages/Partido';
import MisPartidos from './pages/MisPartidos';
import MapCampos from './pages/MapCampos';
import Profile from './pages/Profile';
import Administrar from './pages/Administrar';
import Usuarios from './pages/Usuarios';
import Campos from './pages/Campos';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/partidos" element={<Partidos />} />
              <Route path="/partido/:id" element={<Partido />} />
              <Route path="/MisPartidos" element={<MisPartidos />} />
              <Route path="/MapCampos" element={<MapCampos />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/administrar" element={<Administrar />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/campos" element={<Campos />} />
              {/* Más rutas protegidas pueden ir aquí */}
          </Route>
          <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
