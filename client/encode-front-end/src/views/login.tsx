// File: client/encode-front-end/src/views/login.tsx
// This file contains Login component

// Example Login component
import apiService from '../services/apiService';

const Login: React.FC = () => {
  const handleLogin = () => {
    // Redirect user to Google OAuth login page
    apiService.login(); // Adjust this line according to your ApiService method
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
