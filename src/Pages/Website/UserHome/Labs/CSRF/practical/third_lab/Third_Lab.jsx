import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function Third_Lab() {
  const apiUrl = 'https://digitopia-project-backend.vercel.app/api';
  const [users, setUsers] = useState([]);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [userId, setUserId] = useState('');
  const [setAccount] = useState({});
  const [message, setMessage] = useState('');

  // Fetch users on initial load
  useEffect(() => {
    axios
      .get(`${apiUrl}/CSRF-accounts`)
      .then((response) => {
        const usersData = response.data.money.slice(0, 2);
        setUsers(usersData);

        // Set userId to the first user's ID
        if (usersData.length > 0) {
          setUserId(usersData[0].id);
        }

        // Set recipientId and recipientName to the second user's ID and name
        if (usersData.length > 1) {
          setRecipientId(usersData[1].id);
          setRecipientName(usersData[1].name);
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Fetch account details when userId changes
  useEffect(() => {
    if (userId) {
      axios
        .get(`${apiUrl}/CSRF-account/${userId}`)
        .then((response) => {
          setAccount(response.data.account);
        })
        .catch((error) => console.error('Error fetching account:', error));
    }
  }, [userId]);

  const handleTransfer = (e) => {
    e.preventDefault();

    // Debugging: Log recipientId and userId
    console.log('Recipient ID:', recipientId);
    console.log('User ID:', userId);

    // Ensure recipientId and userId are set
    if (!recipientId || !userId) {
      setMessage('Recipient or sender information is missing.');
      return;
    }

    // Proceed with the transfer
    axios
      .post(`${apiUrl}/CSRF-transfer`, {
        transferAmount: Number(transferAmount),
        recipientId: Number(recipientId),
        userId: Number(userId),
      })
      .then((response) => {
        setMessage(response.data.message);
        setTransferAmount('');

        // Refresh user and account data
        axios.get(`${apiUrl}/CSRF-accounts`).then((response) => {
          const usersData = response.data.money.slice(0, 2);
          setUsers(usersData);

          // Update recipientId and recipientName if necessary
          if (usersData.length > 1) {
            setRecipientId(usersData[1].id);
            setRecipientName(usersData[1].name);
          }
        });
        axios.get(`${apiUrl}/CSRF-account/${userId}`).then((response) => {
          setAccount(response.data.account);
        });
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || 'Transfer failed');
        console.error('Transfer error:', error);
      });
  };

  return (
    <>
      <ThemeSwitcher />
      <div className='Custom__body--bg p-3'>
        <div className='container my-5 secondary-bg p-4 rounded'>
          <div className='text-center mb-4'>
            <h1 className='display-4 main-color'>Money Transfer</h1>
          </div>

          <div
            className='card mb-4 secondary-bg primary-text'
            style={{ boxShadow: '0 0 10px var(--glass-effect)' }}>
            <div className='card-body'>
              <h5 className='card-title mb-1'>Account Information</h5>
              {users.length > 0 ? (
                <>
                  <p className='card-text'>
                    Sender Name: <strong>{users[0].name}</strong>
                  </p>
                  <p className='card-text'>
                    Balance: <strong>{users[0].balance} $</strong>
                  </p>
                </>
              ) : (
                <p>Loading account information...</p>
              )}
            </div>
          </div>

          {message && (
            <div
              className={`alert ${
                message.includes('success') ? 'alert-success' : 'alert-danger'
              }`}
              role='alert'>
              {message}
            </div>
          )}

          <div
            className='card mb-4 secondary-bg '
            style={{ boxShadow: '0 0 10px var(--glass-effect)' }}>
            <div className='card-body primary-text'>
              <form onSubmit={handleTransfer}>
                <div className='mb-3'>
                  <label htmlFor='recipient_name' className='form-label'>
                    Recipient Name:
                  </label>
                  <input
                    type='text'
                    className='form-control focus-bg-transparent primary-text'
                    id='recipient_name'
                    value={recipientName}
                    readOnly
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='transfer_amount' className='form-label'>
                    Transfer Amount:
                  </label>
                  <input
                    type='number'
                    className='form-control focus-bg-transparent'
                    id='transfer_amount'
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    required
                    min='0'
                  />
                </div>

                <button type='submit' className='btn go-to my-3'>
                  Transfer
                </button>
              </form>
            </div>
          </div>

          <table className='table table-bordered table-striped text-center mx-auto'>
            <thead class='table-dark'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.balance} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
