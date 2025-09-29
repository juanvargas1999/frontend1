import React, { useState } from 'react';
import Nav from './Nav'; // Ajusta la ruta según tu estructura aqui
import styles from '../../../assets/css/Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    contrasena: '',
    confirmar_contrasena: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validaciones
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setMessage('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.contrasena.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/contratante/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: formData.nombre_usuario,
          correo_electronico: formData.correo_electronico,
          contrasena: formData.contrasena
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Usuario registrado exitosamente');
        setFormData({
          nombre_usuario: '',
          correo_electronico: '',
          contrasena: '',
          confirmar_contrasena: ''
        });
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.registerForm}>
          <h2 className={styles.title}>Registro de Usuario</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre_usuario" className={styles.label}>
                Nombre de Usuario:
              </label>
              <input
                type="text"
                id="nombre_usuario"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleChange}
                className={styles.input}
                required
                minLength="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="correo_electronico" className={styles.label}>
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="correo_electronico"
                name="correo_electronico"
                value={formData.correo_electronico}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contrasena" className={styles.label}>
                Contraseña:
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className={styles.input}
                required
                minLength="6"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmar_contrasena" className={styles.label}>
                Confirmar Contraseña:
              </label>
              <input
                type="password"
                id="confirmar_contrasena"
                name="confirmar_contrasena"
                value={formData.confirmar_contrasena}
                onChange={handleChange}
                className={styles.input}
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Usuario'}
            </button>
          </form>

          {message && (
            <div className={message.includes('✅') ? styles.successMessage : styles.errorMessage}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;