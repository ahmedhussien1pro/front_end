import React, { useEffect, useState } from 'react';
import './ViewRegisters.css';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function ViewRegisters() {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://digitopia-project-backend.vercel.app/api/RaceConditionViewRegister'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage({ text: 'Error loading data', type: 'error' });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `https://digitopia-project-backend.vercel.app/api/RaceConditionDeleteRegister/${deleteId}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error('Failed to delete register');
      }

      setData((prevData) => prevData.filter((item) => item.id !== deleteId));
      setMessage({ text: 'Register deleted successfully.', type: 'success' });
    } catch (error) {
      console.error('Error deleting register:', error);
      setMessage({ text: 'Failed to delete register.', type: 'error' });
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
      <ThemeSwitcher />
      <div className='view-registers-container'>
        <h1 className='view-registers-title'>Registered Users</h1>

        {message.text && (
          <div className={`view-registers-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <table className='view-registers-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.email}</td>
                <td>{item.tel}</td>
                <td>
                  <button
                    className='view-registers-delete-button'
                    onClick={() => handleDeleteClick(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {deleteId !== null && (
          <div className='delete-confirmation'>
            <p>Are you sure you want to delete this register?</p>
            <button className='confirm-button' onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className='cancel-button' onClick={handleCancelDelete}>
              No
            </button>
          </div>
        )}
      </div>
    </>
  );
}
