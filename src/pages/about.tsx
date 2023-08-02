import { Archivo } from 'next/font/google';
import PageLayout from '@/components/PageLayout';
import Head from 'next/head';

const archivo = Archivo({ subsets: ['latin'] });

export default function About() {
  return (
    <>
      <Head>
        <title>About | Mentalk</title>
      </Head>
      <PageLayout>
        <main className={`flex min-h-screen px-8 py-12 ${archivo.className}`}>
          <div className="px-6 w-full ">
            <div className="flex flex-col items-center">
              <div className="max-w-screen-md ">
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
                  We are a group of people who really care about the general{' '}
                  {` masses' `}
                  mental health and decided to make a platform on which they
                  could ease their pain by sharing with others.
                </p>
                <br />
              </div>

              <div className="w-full">
                <iframe
                  className="rounded-xl mt-9 w-full"
                  // width="1000"
                  height="450"
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65638948375!2d106.66470170942193!3d-6.229379588483536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1690526939814!5m2!1sen!2sid"
                ></iframe>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
