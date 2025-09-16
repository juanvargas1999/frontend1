import React, { useState } from 'react';
import styles from '../../../assets/css/Nav.module.css'; // Importamos los estilos como módulo

const Nav = () => {
  const [usuario] = useState('Usuario'); // Puedes cambiar esto por props o contexto

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>JEFT J</div>
      <div className={styles.bienvenida}>Bienvenido, {usuario}</div>
      
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <a href="#">Inicio</a>
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
            <a href="#">Administrar Aspirantes</a>
            <a href="#">Administrar Empleados</a>
            <a href="#">Nuevo Aspirante</a>
            
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