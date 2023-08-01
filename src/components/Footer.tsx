import React from 'react';
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ['latin'] });

const Footer = () => {
  return (
    <footer
      className={`text-center text-white text-sm py-6 px-8 border-t border-slate-200/10  ${archivo.className}`}
    >
      <p>© 2023 Mentalk. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
