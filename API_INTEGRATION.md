# 🔌 API Integration Guide

## Backend Connection

**Backend URL:** `https://cyber-labs-backend.vercel.app/api/v1`

---

## 📋 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://cyber-labs-backend.vercel.app/api/v1
REACT_APP_API_TIMEOUT=30000
```

---

## 🚀 Usage

### Import Services

```javascript
// Import specific service
import { authService, labsService } from './services';

// Or import all
import services from './services';
```

### Authentication Example

```javascript
import { authService } from './services';

// Login
const handleLogin = async (email, password) => {
  try {
    const data = await authService.login({ email, password });
    console.log('Login successful:', data);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const handleRegister = async (userData) => {
  try {
    const data = await authService.register(userData);
    console.log('Registration successful:', data);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Logout
const handleLogout = async () => {
  await authService.logout();
  // Redirect to login page
};
```

### Labs Example

```javascript
import { labsService } from './services';

// Get all labs
const fetchLabs = async () => {
  try {
    const labs = await labsService.getAllLabs();
    console.log('Labs:', labs);
  } catch (error) {
    console.error('Failed to fetch labs:', error);
  }
};

// Get specific lab
const fetchLabDetails = async (labId) => {
  try {
    const lab = await labsService.getLabById(labId);
    console.log('Lab details:', lab);
  } catch (error) {
    console.error('Failed to fetch lab:', error);
  }
};
```

### Direct API Calls

```javascript
import { api } from './services';

// GET request
const getData = async () => {
  const response = await api.get('/endpoint');
  return response.data;
};

// POST request
const postData = async (data) => {
  const response = await api.post('/endpoint', data);
  return response.data;
};

// PUT request
const updateData = async (id, data) => {
  const response = await api.put(`/endpoint/${id}`, data);
  return response.data;
};

// DELETE request
const deleteData = async (id) => {
  const response = await api.delete(`/endpoint/${id}`);
  return response.data;
};
```

---

## 🧪 Testing Connection

Use the `ApiTest` component to test backend connection:

```javascript
import ApiTest from './Components/ApiTest';

function App() {
  return (
    <div>
      <ApiTest />
    </div>
  );
}
```

---

## 📍 Available Endpoints

### General
- `GET /` - Welcome message
- `GET /health` - Health check

### Authentication (`/auth`)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

### Labs (`/labs`)
- `GET /labs` - Get all labs
- `GET /labs/:id` - Get lab by ID
- `POST /labs/:id/submit` - Submit lab solution

### Practice Labs (`/practice-labs`)
- `GET /practice-labs` - Get all practice labs
- `GET /practice-labs/:id` - Get practice lab by ID

### Progress (`/progress`)
- `GET /progress/lab/:id` - Get lab progress
- `PUT /progress/lab/:id` - Update lab progress

### Users (`/users`)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Enrollments (`/enrollments`)
- `GET /enrollments` - Get all enrollments
- `POST /enrollments` - Create enrollment
- `GET /enrollments/:id` - Get enrollment by ID

---

## ⚠️ Important Notes

1. **Authentication Token**: The API service automatically handles token storage and attachment to requests
2. **Error Handling**: All API errors are intercepted and logged. 401 errors automatically redirect to login
3. **CORS**: The backend must have CORS enabled for your frontend domain
4. **Credentials**: `withCredentials: true` is enabled for cookie-based authentication

---

## 🔧 Next Steps

1. ✅ Test connection using `ApiTest` component
2. ⚠️ Update CORS settings in backend to include your frontend domain
3. ✅ Implement authentication flow in your app
4. ✅ Start integrating lab features

---

## 📝 TODO

- [ ] Add proper error boundaries
- [ ] Implement loading states globally
- [ ] Add request retry logic
- [ ] Implement offline mode detection
- [ ] Add request/response logging in development
