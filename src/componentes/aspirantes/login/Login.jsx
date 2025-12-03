import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/Login.module.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/aspirante/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Guardar datos en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Llamar al callback si existe
        if (onLoginSuccess) {
          onLoginSuccess(data.usuario);
        }
        
        // Redirigir a la página de aspirantes
        navigate('/aspirantes/dashboard');
      } else {
        setError(data.message || 'Error en el login');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Nueva función para manejar el registro
  const handleRegistrarse = () => {
    navigate('/aspirantes/contactar-reclutador');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Iniciar Sesión - Aspirantes</h2>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre_usuario">Usuario o Email</label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              required
              placeholder="Ingresa tu usuario o email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className={styles.links}>
          <a href="#" className={styles.link}>¿Olvidaste tu contraseña?</a>
          <a 
            onClick={handleRegistrarse} 
            className={styles.link}
            style={{ cursor: 'pointer' }}
          >
            Registrarse
          </a>
        </div>

        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            <strong>Nota:</strong> Para registrarte en la plataforma, necesitas que un reclutador 
            te genere las credenciales. Haz clic en "Registrarse" para contactar con uno.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;