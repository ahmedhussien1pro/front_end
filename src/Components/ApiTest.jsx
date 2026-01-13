import React, { useState } from 'react';
import { api } from '../services';

/**
 * API Test Component
 * Simple component to test backend connection
 */
const ApiTest = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await api.get('/health');
      setStatus(response.data);
      console.log('✅ Backend connection successful:', response.data);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend');
      console.error('❌ Backend connection failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🔌 Backend Connection Test</h2>
      <p>
        <strong>Backend URL:</strong> {process.env.REACT_APP_API_URL}
      </p>

      <button
        onClick={testConnection}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      {status && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
          }}
        >
          <h3>✅ Connection Successful!</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(status, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '5px',
          }}
        >
          <h3>❌ Connection Failed</h3>
          <p>{error}</p>
          <p>
            <strong>Note:</strong> Make sure the backend is deployed and CORS is
            configured correctly.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
