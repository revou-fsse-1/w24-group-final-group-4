import { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default PageLayout;
