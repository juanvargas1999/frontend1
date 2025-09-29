import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import styles from '../../../assets/css/Aspirantes.module.css';

const Aspirantes = () => {
  const [aspirantes, setAspirantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre_usuario: '',
    correo_electronico: ''
  });
  const navigate = useNavigate();

  // Cargar aspirantes al montar el componente
  useEffect(() => {
    cargarAspirantes();
  }, []);

  const cargarAspirantes = async () => {
    try {
      const response = await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/contratante/aspirantes.php');
      const data = await response.json();
      
      if (response.ok) {
        setAspirantes(data.aspirantes || []);
      } else {
        setMessage('Error al cargar los aspirantes');
      }
    } catch (error) {
      setMessage('Error de conexión');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (aspirante) => {
    setEditingId(aspirante.id_usuario);
    setEditForm({
      nombre_usuario: aspirante.nombre_usuario,
      correo_electronico: aspirante.correo_electronico
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/contratante/editar_aspirante.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: id,
          nombre_usuario: editForm.nombre_usuario,
          correo_electronico: editForm.correo_electronico
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Aspirante actualizado exitosamente');
        setEditingId(null);
        cargarAspirantes(); // Recargar la lista
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este aspirante?')) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1/Proyecto_sena/JEFT_J_R/backend/php/contratante/eliminar_aspirante.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario: id })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Aspirante eliminado exitosamente');
        cargarAspirantes(); // Recargar la lista
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión');
      console.error('Error:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ nombre_usuario: '', correo_electronico: '' });
  };

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.contenido}>
          <h1 className={styles.titulo}>Administrar Aspirantes</h1>
          
          {message && (
            <div className={message.includes('✅') ? styles.successMessage : styles.errorMessage}>
              {message}
            </div>
          )}

          {loading ? (
            <p>Cargando aspirantes...</p>
          ) : (
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de Usuario</th>
                  <th>Correo Electrónico</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {aspirantes.length > 0 ? (
                  aspirantes.map((aspirante) => (
                    <tr key={aspirante.id_usuario}>
                      <td>{aspirante.id_usuario}</td>
                      <td>
                        {editingId === aspirante.id_usuario ? (
                          <input
                            type="text"
                            name="nombre_usuario"
                            value={editForm.nombre_usuario}
                            onChange={handleEditChange}
                            className={styles.inputEdit}
                          />
                        ) : (
                          aspirante.nombre_usuario
                        )}
                      </td>
                      <td>
                        {editingId === aspirante.id_usuario ? (
                          <input
                            type="email"
                            name="correo_electronico"
                            value={editForm.correo_electronico}
                            onChange={handleEditChange}
                            className={styles.inputEdit}
                          />
                        ) : (
                          aspirante.correo_electronico
                        )}
                      </td>
                      <td>{new Date(aspirante.fecha_registro).toLocaleDateString()}</td>
                      <td>
                        {editingId === aspirante.id_usuario ? (
                          <div className={styles.acciones}>
                            <button 
                              onClick={() => handleEditSubmit(aspirante.id_usuario)}
                              className={styles.btnGuardar}
                            >
                              Guardar
                            </button>
                            <button 
                              onClick={cancelEdit}
                              className={styles.btnCancelar}
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className={styles.acciones}>
                            <button 
                              onClick={() => handleEdit(aspirante)}
                              className={styles.btnEditar}
                            >
                              Editar
                            </button>
                            <button 
                              onClick={() => handleDelete(aspirante.id_usuario)}
                              className={styles.btnEliminar}
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No hay aspirantes registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Aspirantes;