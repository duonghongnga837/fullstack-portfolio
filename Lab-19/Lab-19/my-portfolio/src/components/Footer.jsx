import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-400 p-4 text-center">
      <div className="container mx-auto">
        &copy; {currentYear} [Your Name]. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;