import Image from 'next/image';
import { Archivo } from 'next/font/google';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import Head from 'next/head';

const archivo = Archivo({ subsets: ['latin'] });

const images = ['https://i.imgur.com/N1gYpys.jpeg'];

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Mentalk</title>
      </Head>
      <PageLayout>
        <main
          className={`flex min-h-screen flex-col items-center justify-between py-20 px-8 ${archivo.className}`}
        >
          <div className=" max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 bg-slate-700 rounded-[20px] gap-8 w-full">
            <div className="order-2 lg:order-1 flex flex-col gap-3">
              <p
                className="font-semibold py-4 text-4xl md:text-5xl lg:text-[56px]  max-w-[17ch]"
                style={{
                  // fontSize: '56px',
                  // lineHeight: '64px',
                  letterSpacing: '0.45px',
                }}
              >
                Take care of your mental health with our great community
              </p>
              <Link href="/login">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg">
                  Get Started
                </button>
              </Link>
              <div className="flex flex-col md:flex-row py-6 gap-6">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <h1>Relief The Burden</h1>
                    <p className="text-sm text-gray-400 max-w-[26ch]">
                      You don’t have to deal with your mental health problem
                      alone
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>

                  <div className="flex flex-col gap-1">
                    <h1>Accessible</h1>
                    <p className="text-sm text-gray-400 max-w-[26ch]">
                      Find your perfect healer based on your unique needs and
                      goals!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-1 order-1 lg:order-2">
              {images.map((image, index) => {
                return (
                  <div className="" key={image}>
                    <Image
                      src={image}
                      alt={`Image  ${index}`}
                      className="rounded-[20px] w-full"
                      width={500}
                      height={300}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center py-2 my-6">
            <h1 className="italic text-lg">
              {`"Not all scars are visible. Mental health is just as important as
              physical health."`}
            </h1>
            <p className="text-base text-gray-400 italic">
              - Milena Osorio, ICRC Lead Clinical Psychologist
            </p>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
