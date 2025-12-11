'use client';

import React from 'react';

const WhatsAppIcon = () => {
  const phoneNumber = '+96170617021';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div style={containerStyle}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={circleStyle}
      >
        {/* White background circle */}
        <div style={whiteBgStyle}></div>

        {/* GIF */}
        <img
          src="https://res.cloudinary.com/dnucihygt/image/upload/v1764685345/output-onlinegiftools_qj7gav.gif"
          alt="WhatsApp Icon"
          style={gifStyle}
        />
      </a>
    </div>
  );
};

const containerStyle = {
  position: 'fixed',
  bottom: 50,
  right: 0,
  zIndex: 9999,
};

const circleStyle = {
  position: 'relative',
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const whiteBgStyle = {
  position: 'absolute',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
};

const gifStyle = {
  position: 'absolute',
  width: 85,
  height: 85,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
};

export default WhatsAppIcon;
