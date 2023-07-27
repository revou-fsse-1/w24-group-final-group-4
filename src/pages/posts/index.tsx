import PageLayout from '@/components/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Session, User, getServerSession } from 'next-auth';
import { Archivo } from 'next/font/google';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';

const archivo = Archivo({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default function Posts({ user }: { user: User }) {
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
                    className="w-6 h-6 shrink-0"
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

            <div className="col-span-7">
              <div className="bg-gray-700 p-8 rounded-md flex items-start gap-6">
                <div className="relative aspect-square w-12 shrink-0 bg-gray-400 rounded-full ring-2 ring-sky-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image as string}
                    alt={`Profile picture of ${user.name}`}
                    className="block w-full aspect-square rounded-full object-cover object-center h-full text-transparent'"
                    onError={(e) => (e.currentTarget.src = '/avatar.svg')}
                  />
                </div>

                <div className="space-y-4 flex-grow">
                  <h3 className="text-lg font-medium">Create New Post</h3>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      >
                        <path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v7.5a3 3 0 003 3v-6A4.5 4.5 0 0110.5 6h6z" />
                        <path d="M18 7.5a3 3 0 013 3V18a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3H18z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-slate-200 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Title"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute top-3 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </div>
                    <textarea
                      id="description"
                      className="bg-gray-50 resize-none border border-slate-200 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Tell us what you feel.."
                      rows={6}
                    />
                  </div>
                  <button className="block bg-sky-600 hover:bg-sky-700 py-2 px-4 ml-auto font-medium rounded-md ">
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
