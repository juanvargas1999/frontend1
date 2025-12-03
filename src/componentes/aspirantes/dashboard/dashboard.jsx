import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/Aspirantes2.module.css';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const userData = localStorage.getItem('usuario');
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      // Si no hay datos, redirigir al login
      navigate('/aspirantes/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/aspirante/logout.php');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar localStorage y redirigir
      localStorage.removeItem('usuario');
      localStorage.removeItem('isLoggedIn');
      navigate('/aspirantes/login');
    }
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Dashboard - Aspirantes</h1>
        <div className={styles.userInfo}>
          <span>Bienvenido, {usuario.nombre}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <main className={styles.mainContent}>
        <div className={styles.welcomeCard}>
          <h2>¡Hola {usuario.nombre}!</h2>
          <p>Bienvenido al sistema de gestión de aspirantes.</p>
          <p>Desde aquí puedes gestionar tus aplicaciones, documentos y perfil.</p>
        </div>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Aplicaciones Activas</h3>
            <p className={styles.statNumber}>3</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Documentos Pendientes</h3>
            <p className={styles.statNumber}>2</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Entrevistas Programadas</h3>
            <p className={styles.statNumber}>1</p>
          </div>
        </div>
        
        <div className={styles.quickActions}>
          <h3>Acciones Rápidas</h3>
          <div className={styles.actionsGrid}>
            <button className={styles.actionButton}>
              Ver Aplicaciones
            </button>
            <button className={styles.actionButton}>
              Subir Documentos
            </button>
            <button className={styles.actionButton}>
              Actualizar Perfil
            </button>
            <button className={styles.actionButton}>
              Ver Vacantes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;