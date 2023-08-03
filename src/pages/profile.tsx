import PageLayout from '@/components/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User, getServerSession } from 'next-auth';
import { Archivo } from 'next/font/google';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';
import { prisma } from '@/libs/db';
import { getDate } from '@/libs/getDate';
import Link from 'next/link';
import { PostStringDates, customConfig } from './posts';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import PostCard from '@/components/PostCard';

const archivo = Archivo({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  // Fetch posts for the specific user
  const userPosts = await prisma.post.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
      comments: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedPosts = userPosts.map((post) => {
    return {
      ...post,
      user: {
        ...post.user,
        name: uniqueNamesGenerator(customConfig),
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.createdAt.toISOString(),
    };
  });

  return {
    props: {
      user: session.user,
      posts: serializedPosts,
    },
  };
};

export default function Profile({
  user,
  posts,
}: {
  user: User;
  posts: PostStringDates[];
}) {
  return (
    <>
      <Head>
        <title>{`${user.name?.split(' ')[0]}'s Profile | Mentalk`}</title>
      </Head>
      <PageLayout>
        <main className={`${archivo.className} px-8 py-10 min-h-full`}>
          <section className="max-w-screen-lg mx-auto grid grid-cols-10 gap-4">
            <nav className="col-span-full" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium  md:ml-2 text-gray-400 ">
                      Profile
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="col-span-full md:col-span-3 sm:grid sm:grid-cols-2 md:block gap-4 md:space-y-4">
              <div className="bg-gradient-to-tr  bg-sky-700 rounded-md px-6 py-6">
                <div className="relative mx-auto aspect-square w-16 shrink-0 bg-gray-400 rounded-full ring-2 ring-sky-400 ">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image as string}
                    alt={`Profile picture of ${user.name}`}
                    className="block aspect-square shrink-0 rounded-full object-cover object-center h-full text-transparent'"
                    onError={(e) => (e.currentTarget.src = '/avatar.svg')}
                  />
                </div>

                <div className="text-center space-y-1">
                  <h1 className="font-semibold text-xl mt-4 text-slate-200 line-clamp-1">
                    {user.name}
                  </h1>
                  <p className="text-slate-300 text-sm font-medium">
                    {user.email}
                  </p>
                </div>
                <div className=" mt-3 mx-auto w-fit flex items-center gap-1 text-sm font-medium px-2.5 py-0.5 rounded bg-gray-800/20 text-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[1em] h-[1em]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>My Profile</span>
                </div>
              </div>
            </div>

            <div className="col-span-full md:col-span-7 space-y-6">
              <span className="text-xl font-bold leading-none">
                Total Posts - {posts.length}
              </span>

              <div className="h-[1px] w-full bg-slate-200/10"></div>

              <div className="space-y-3">
                {posts.map((post) => (
                  <PostCard post={post} key={post.id} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
