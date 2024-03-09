// File: client/encode-front-end/src/components/QrCode.tsx
// This file contains QrCode component
import React from 'react';

interface QrCodeProps {
  src: string; // URL of the QR code image
}

export const QrCode: React.FC<QrCodeProps> = ({ src }) => {
  return (
    <div className="qr-code-container">
      <img src={src} alt="QR Code" />
    </div>
  );
};
