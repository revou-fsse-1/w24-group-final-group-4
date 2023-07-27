import { Archivo } from 'next/font/google';
import PageLayout from '@/components/PageLayout';

const inter = Archivo({ subsets: ['latin'] });

export default function About() {
  return (
    <PageLayout>
      <main
        className={`flex min-h-screen p-24 ${inter.className}`}
      >
        <div className="px-6 w-full ">
          <div className="flex p-16 flex-col ">
            <div className="rounded-[20px]">
              <p
                className="font-semibold py-4 text-center"
                style={{
                  fontSize: '56px',
                  lineHeight: '115%',
                  letterSpacing: '0.45px',
                  // position: 'relative',
                }}
              >
                About Us
              </p>
              <br />
              
              <p
                className="text-gray-400 text-center"
                style={{
                  fontSize: '20px',
                  lineHeight: '150%',
                  letterSpacing: '0px',
                  // position: 'relative',
                }}
              >
                We are group of people who really care about the general masses'
                mental health and decided to make a platform on which they could
                ease their pain by sharing with others.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
