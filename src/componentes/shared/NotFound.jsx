import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.message}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className={styles.actions}>
          <button 
            onClick={handleGoBack}
            className={styles.secondaryButton}
          >
            ← Volver atrás
          </button>
          
          <button 
            onClick={handleGoHome}
            className={styles.primaryButton}
          >
            Ir al inicio
          </button>
        </div>

        <div className={styles.links}>
          <p>También puedes visitar:</p>
          <div className={styles.linkList}>
            <a href="/Proyecto_sena/JEFT_J_R/frontend1/dist" className={styles.link}>Inicio</a>
            <a href="/Proyecto_sena/JEFT_J_R/frontend1/dist/aspirantes/login" className={styles.link}>Login Aspirantes</a>
            <a href="/Proyecto_sena/JEFT_J_R/frontend1/dist/register" className={styles.link}>Registro</a>
            <a href="/Proyecto_sena/JEFT_J_R/frontend1/dist/Info" className={styles.link}>Información</a>
          </div>
        </div>
      </div>
      
      <div className={styles.illustration}>
        <div className={styles.spaceIllustration}>
          <div className={styles.planet}></div>
          <div className={styles.rocket}></div>
          <div className={styles.stars}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;