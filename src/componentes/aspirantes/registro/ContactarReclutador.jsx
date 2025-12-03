import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/ContactarReclutador.module.css';

const ContactarReclutador = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
    reclutador: '',
    tipo_registro: 'aspirante'
  });

  const reclutadores = [
    { id: 'rec1', nombre: 'Ana Martínez', email: 'ana.martinez@empresa.com', telefono: '+57 300 123 4567' },
    { id: 'rec2', nombre: 'Carlos Rodríguez', email: 'carlos.rodriguez@empresa.com', telefono: '+57 301 234 5678' },
    { id: 'rec3', nombre: 'María González', email: 'maria.gonzalez@empresa.com', telefono: '+57 302 345 6789' },
    { id: 'rec4', nombre: 'Pedro López', email: 'pedro.lopez@empresa.com', telefono: '+57 303 456 7890' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la solicitud
    alert('Solicitud enviada correctamente. El reclutador se pondrá en contacto contigo pronto.');
    navigate('/aspirantes/login');
  };

  const handleVolver = () => {
    navigate('/aspirantes/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>📞 Contactar al Reclutador</h1>
          <p className={styles.subtitle}>
            Para registrarte en la plataforma, necesitas que un reclutador te genere las credenciales.
            Completa este formulario y nos pondremos en contacto contigo.
          </p>
        </div>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Completa el formulario</h3>
              <p>Proporciona tus datos de contacto</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Selecciona un reclutador</h3>
              <p>Elige al profesional que te atenderá</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>Recibe tus credenciales</h3>
              <p>El reclutador te enviará usuario y contraseña</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                placeholder="Ingresa tu apellido"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="+57 300 123 4567"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reclutador">Selecciona un reclutador *</label>
            <select
              id="reclutador"
              name="reclutador"
              value={formData.reclutador}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">-- Selecciona un reclutador --</option>
              {reclutadores.map((rec) => (
                <option key={rec.id} value={rec.id}>
                  {rec.nombre} - {rec.email} - {rec.telefono}
                </option>
              ))}
            </select>
            
            <div className={styles.reclutadoresInfo}>
              {reclutadores.map((rec) => (
                <div key={rec.id} className={styles.reclutadorCard}>
                  <h4>{rec.nombre}</h4>
                  <p>📧 {rec.email}</p>
                  <p>📱 {rec.telefono}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mensaje">Mensaje adicional (opcional)</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="4"
              placeholder="Cuéntanos más sobre tu interés en unirte a nuestra plataforma..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.terms}>
            <input
              type="checkbox"
              id="terms"
              required
              className={styles.checkbox}
            />
            <label htmlFor="terms">
              Acepto que mis datos sean utilizados para contactarme y procesar mi solicitud de registro.
            </label>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleVolver}
              className={styles.secondaryButton}
            >
              ← Volver al Login
            </button>
            <button
              type="submit"
              className={styles.primaryButton}
            >
              Enviar Solicitud
            </button>
          </div>
        </form>

        <div className={styles.infoBox}>
          <h3>ℹ️ ¿Por qué necesito contactar a un reclutador?</h3>
          <ul>
            <li>Los reclutadores verifican tu información antes de generar credenciales</li>
            <li>Te asignarán el tipo de usuario correcto (aspirante, empleado, etc.)</li>
            <li>Podrán orientarte sobre el proceso de selección</li>
            <li>Te brindarán soporte personalizado durante tu registro</li>
          </ul>
        </div>

        <div className={styles.contactInfo}>
          <h3>📞 Contacto General</h3>
          <p>Si tienes dudas adicionales, también puedes contactarnos:</p>
          <div className={styles.contactDetails}>
            <p><strong>Correo:</strong> reclutamiento@jeftj.com</p>
            <p><strong>Teléfono:</strong> +57 1 234 5678</p>
            <p><strong>Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactarReclutador;