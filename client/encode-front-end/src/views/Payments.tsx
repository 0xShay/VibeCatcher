// File: client/encode-front-end/src/views/Payments.tsx
// This file contains Payments component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode } from '../components/QrCode';

const Payments: React.FC = () => {
    const navigate = useNavigate();
    const [qrCodeSrc, setQrCodeSrc] = useState<string>('https://via.placeholder.com/150'); // Placeholder for QR code URL
  
    useEffect(() => {
      // In a real app, fetch the QR code URL from your backend
      // For demo purposes, we use a static image. Replace this with your actual API call.
  
      // Simulate waiting for a Solana transaction response
      const transactionTimeout = setTimeout(() => {
        // On timeout or transaction confirmation, navigate back to the dashboard
        navigate('/dashboard');
      }, 60000); // 60 seconds timeout for demo
  
      return () => clearTimeout(transactionTimeout);
    }, [navigate]);
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-darkBlue to-trueBlack text-gray-300">
        <h1 className="text-2xl font-semibold mb-6">Buy Credits with Solana</h1>
        <div className="mb-4">
          {qrCodeSrc && <img src={qrCodeSrc} alt="QR Code" className="w-48 h-48" />}
        </div>
        <p className="text-center">Scan the QR code with your Solana wallet to proceed with the purchase.</p>
        {/* Optionally, add more UI elements to handle the transaction status */}
      </div>
    );
  };
  
  export default Payments;
