import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import styles from '../../../assets/css/Nav.module.css';

const Nav = () => {
  const [usuario] = useState('Usuario');
  const navigate = useNavigate(); // Hook para navegación

  const handleNuevoUsuario = () => {
    navigate('/register'); // Navega a la ruta del registro
  };

  const handleInicio = () => {
    navigate('/Home'); // Navega a la ruta del Home
  };

  
  const handleAdministrarAspirantes = () => {
    navigate('/aspirantes');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>JEFT J</div>
      <div className={styles.bienvenida}>Bienvenido, {usuario}</div>
      
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <a onClick={handleInicio}>Inicio</a>
        </div>

        <div className={styles.menuItem}>
          <a href="#">Proceso ▾</a>
          <div className={styles.submenu}>
            <a href="#">Administrar Documentos</a>
            <a href="#">Estado del Proceso</a>
            <a href="#">Certificados y descargas</a>
          </div>
        </div>

        <div className={styles.menuItem}>
          <a href="#">Aspirantes ▾</a>
          <div className={styles.submenu}>
            <a onClick={handleAdministrarAspirantes}>Administrar Aspirantes</a>
            <a href="#">Administrar Empleados</a>
            <a onClick={handleNuevoUsuario}>Nuevo Aspirante</a>
          </div>
        </div>

        <div className={styles.menuItem}>
          <a href="#">Contacto</a>
        </div>

        <div className={`${styles.menuItem} ${styles.derecha}`}>
          <a href="#">Cerrar sesión ▾</a>
          <div className={styles.submenu}>
            <a href="#">Perfil</a>
            <a href="#">Salir</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;