import PageLayout from '@/components/PageLayout';
import { Archivo } from 'next/font/google';
import Head from 'next/head';

const archivo = Archivo({ subsets: ['latin'] });

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Mentalk</title>
      </Head>
      <PageLayout>
        <main className={`${archivo.className} px-8 py-10`}>
          <section className="max-w-screen-lg mx-auto grid grid-cols-10 gap-4">
            <div className="col-span-3 space-y-4">
              <div className="bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-md p-6 pt-24">
                <h1 className="font-semibold text-2xl">All Posts</h1>
                <p>{`Let's`} help each other</p>
              </div>
              <div className="bg-slate-200 rounded-md px-6 py-14 text-gray-900 text-center space-y-1">
                <p className="font-semibold text-2xl">Need Direct Help?</p>
                <div className="flex items-center justify-center gap-1 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p>Call 0821-2300-2323</p>
                </div>
              </div>
            </div>

            <div></div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
