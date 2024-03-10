// File: client/encode-front-end/src/views/login.tsx
// This file contains Login component

// Example Login component
import React, { useEffect } from 'react';
import apiService from '../services/apiService';

const Login: React.FC = () => {
    useEffect(() => {
        const fetchChannels = async () => {
          try {
            const response = await apiService.getChannels();
            console.log(response.data);
            // Process the channels data, maybe store in local storage or state
          } catch (error) {
            console.error('Failed to fetch channels:', error);
          }
        };
    
        fetchChannels();
      }, []);
    
      return (
        <div>
          {/* Render UI elements based on fetched channels */}
        </div>
      );
    };

export default Login;
