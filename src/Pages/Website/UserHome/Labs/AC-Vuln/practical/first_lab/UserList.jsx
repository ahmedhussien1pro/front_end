import React, { useState, useEffect } from 'react';
import Cookie from 'cookie-universal';
import '../Lab_Style.css';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const cookie = Cookie();
    const retrievedToken = cookie.get('CuberWeb');
    setToken(retrievedToken);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://digitopia-project-backend.vercel.app/api/vulnUsers',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://digitopia-project-backend.vercel.app/api/vulnUsers/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <ThemeSwitcher />
      <div className='Custom__body--bg m-0 p-2 ' style={{ height: '100vh' }}>
        <div className='users-container row mx-auto  justify-content-center align-items-center text-center'>
          <h2 className=' main-color mb-3 pb-2'>Users</h2>
          {users.map((user) => (
            <div className='user-item' key={user.id}>
              <h2 className='user-name '>{user.name}</h2>
              <button
                className='delete-btn'
                onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
