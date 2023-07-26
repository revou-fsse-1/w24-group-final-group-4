import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const navData = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Posts', path: '/posts' },
  { name: 'Search', path: '/search' },
];

function Navigation() {
  const router = useRouter();

  return (
    <div className="fixed backdrop-blur-sm z-10 left-1/2 bottom-0 w-full border-t-2 md:w-fit md:bottom-8 px-8 py-4 md:border-2 lg:border-0 border-slate-300/10 bg-gray-700/30 md:rounded-lg lg:bg-transparent flex items-center justify-around md:justify-center gap-2 sm:gap-4 md:gap-6 lg:absolute lg:left-1/2 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2">
      {navData.map((navItem) => (
        <Link
          href={navItem.path}
          key={navItem.name}
          className={`flex-col flex md:flex-row items-center gap-1 md:gap-2 py-1 px-3 rounded-md hover:text-sky-400 ${
            router.pathname === navItem.path && 'md:bg-sky-600/20 text-sky-400'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            {navItem.name === 'Home' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            )}
            {navItem.name === 'About' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
              />
            )}
            {navItem.name === 'Posts' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            )}
            {navItem.name === 'Search' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            )}
          </svg>

          <span className="block font-medium text-base md:text-lg">
            {navItem.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Navigation;
