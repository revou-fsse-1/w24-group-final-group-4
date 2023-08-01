import React from 'react';
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ['latin'] });

const Footer = () => {
  return (
    <footer className={` text-white text-sm p-2 ${archivo.className}`}>
      <p>© 2023 Mentalk. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
