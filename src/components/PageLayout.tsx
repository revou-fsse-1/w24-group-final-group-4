import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default PageLayout;
