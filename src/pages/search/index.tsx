import PageLayout from '@/components/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User, getServerSession } from 'next-auth';
import { Archivo } from 'next/font/google';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import PostForm from '@/components/PostForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Toast from '@/components/Toast';
import { prisma } from '@/libs/db';
import { Comment, Post } from '@prisma/client';
import { makeInitial } from '@/libs/makeInitial';
import { getDate } from '@/libs/getDate';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import { useSearchParams } from 'next/navigation';

const archivo = Archivo({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const query = (context.query.q ? context.query.q : '') as string;
  const session = await getServerSession(context.req, context.res, authOptions);
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
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
  const serializedPosts = posts.map((post) => {
    return {
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.createdAt.toISOString(),
    };
  });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      user: session.user,
      posts: serializedPosts,
    },
  };
};

export interface IFormInput {
  title: string;
  description: string;
}

export type PostStringDates = Omit<Post, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
} & { comments: Comment[]; user: User };

export default function Posts({
  user,
  posts,
}: {
  user: User;
  posts: PostStringDates[];
}) {
  return (
    <>
      <Head>
        <title>Posts | Mentalk</title>
      </Head>
      <PageLayout>
        <main className={`${archivo.className} px-8 py-10`}>
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
                    <Link
                      href="/posts"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Posts
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="col-span-full md:col-span-3 sm:grid sm:grid-cols-2 md:block gap-4 md:space-y-4">
              <div className="bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-md p-6 pt-24">
                <h1 className="font-semibold text-2xl">Search</h1>
                <p>{`Let's`} help each other</p>
              </div>
              <div className="bg-slate-200 rounded-md px-6 py-14 hidden sm:block text-gray-900 text-center space-y-1">
                <p className="font-semibold text-lg lg:text-2xl">
                  Need Direct Help?
                </p>
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

                  <p className="text-sm lg:text-base">Call 0821-2300-2323</p>
                </div>
              </div>
            </div>

            <div className="col-span-full md:col-span-7 space-y-6">
              <SearchInput></SearchInput>
              <div className="h-[1px] w-full bg-slate-200/10"></div>

              {posts.length === 0 ? (
                <div className="flex justify-center py-24 bg-gray-900/20 rounded-lg mt-10">
                  <p>No posts available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => (
                    <Link
                      href={`/posts/${post.id}`}
                      key={post.id}
                      className="block bg-gray-700 rounded-md p-6 space-y-3 hover:ring-2 ring-transparent hover:ring-sky-600 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full flex justify-center items-center bg-gray-400 p-2 aspect-square min-h-[3rem] ">
                            <span className="text-[90%]">
                              {makeInitial(post.user.name as string)}
                            </span>
                          </div>

                          <div>
                            <p className="font-semibold text-xl">
                              {makeInitial(post.user.name as string)}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {getDate(post.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <p>{post.comments.length}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{post.title}</h3>
                        <p className="line-clamp-4 text-gray-400">
                          {post.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}