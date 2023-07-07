import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center h-500">
        <p>
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span> by Atlax. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
