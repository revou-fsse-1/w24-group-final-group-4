import { useSession } from 'next-auth/react';
import { Archivo } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthButton from './AuthButton';
import Navigation from './Navigation';

const archivo = Archivo({ subsets: ['latin'] });

function Navbar() {
  const session = useSession();

  return (
    <nav
      className={`${archivo.className} relative border-gray-200 bg-gray-800 border-b border-b-slate-200/10 px-8`}
    >
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="w-8 h-8"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#0284C7" />
              <path
                d="M20 36.8C24.4556 36.8 28.7288 35.03 31.8794 31.8794C35.03 28.7288 36.8 24.4556 36.8 20C36.8 15.5443 35.03 11.2712 31.8794 8.12059C28.7288 4.96998 24.4556 3.19998 20 3.19998L20 20L20 36.8Z"
                fill="#38BDF8"
              />
            </svg>
            <span className="block font-bold text-[1.75rem]">Mentalk</span>
          </Link>
        </div>
        <Navigation />
        <AuthButton status={session.status} />
      </div>
    </nav>
  );
}

export default Navbar;
