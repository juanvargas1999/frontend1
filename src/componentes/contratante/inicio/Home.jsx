import { useState, useEffect } from 'react';
import styles from '../../../assets/css/Home.module.css';
import Nav from './Nav'; // Ajusta la ruta según tu estructura

const Home = () => {
  const [connectionStatus, setConnectionStatus] = useState('Verificando conexión...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDatabaseConnection = async () => {
      try {
        const response = await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/conex/database_check.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Conexión exitosa a la base de datos:', data);
          setConnectionStatus('✅ Conectado correctamente a la base de datos');
        } else {
          console.error('❌ Error en la respuesta del servidor');
          setConnectionStatus('❌ Error al conectar con el servidor');
        }
      } catch (error) {
        console.error('❌ Error de conexión:', error);
        setConnectionStatus('❌ Error de conexión con el servidor');
      } finally {
        setIsLoading(false);
      }
    };

    checkDatabaseConnection();
  }, []);

  return (
    <>
    <Nav />
    <br></br>
    <div className={styles.contenido}>
      <h1 className={styles.titulo}>Bienvenido!</h1>
      <div className={styles.estadoConexion}>
        {isLoading ? (
          <p>🔄 Verificando conexión...</p>
        ) : (
          <p>{connectionStatus}</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;