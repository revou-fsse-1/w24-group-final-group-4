import PageLayout from '@/components/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User, getServerSession } from 'next-auth';
import { Archivo } from 'next/font/google';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';
import { prisma } from '@/libs/db';
import { Comment, Post } from '@prisma/client';
import { makeInitial } from '@/libs/makeInitial';
import { getDate } from '@/libs/getDate';
import Link from 'next/link';

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
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedPosts = userPosts.map((post) => {
    return {
      ...post,
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

export default function Profile({ user, posts }: { user: User; posts: Post[] }) {
    return (
      <>
        <Head>
          <title>{`${user.name}'s Profile | Mentalk`}</title>
        </Head>
        <PageLayout>
          <main className={`${archivo.className} px-8 py-10`}>
            <section className="max-w-screen-lg mx-auto grid grid-cols-10 gap-4">
              <div className="col-span-full md:col-span-3 sm:grid sm:grid-cols-2 md:block gap-4 md:space-y-4">
  

                <div className="bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-md p-6 pt-4">

                <div className="flex justify-center items-center">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="rounded-full w-20 h-20 object-cover"
                    />
                  ) : (
                    <div className="rounded-full flex justify-center items-center bg-gray-400 p-2 aspect-square min-h-[5rem] w-20 h-20">
                      <span className="text-[90%]">
                        {user.name ? user.name.charAt(0).toUpperCase() : ''}
                      </span>
                    </div>
                  )}
                </div>
  

                <div className="text-center ">
                  <h1 className="font-semibold text-2xl mt-4 text-gray-900">{user.name}</h1>
                  <br />
                  <p>My Bio</p>
                </div>
                </div>
              </div>
  
              <div className="col-span-full md:col-span-7 space-y-6">
                <div className="space-y-3">
                  {posts.map((post) => (
                    <Link
                      href={`/posts/${post.id}`}
                      key={post.id}
                      className="block bg-gray-700 rounded-md p-6 space-y-3 hover:ring-2 ring-transparent hover:ring-sky-600 hover:translate-x-2 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full flex justify-center items-center bg-gray-400 p-2 aspect-square min-h-[3rem]">
                            <span className="text-[90%]">
                              {post.user.name ? post.user.name.charAt(0).toUpperCase() : ''}
                            </span>
                          </div>
  
                          <div>
                            <p className="font-semibold text-xl">
                              {post.user.name}
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
              </div>
            </section>
          </main>
        </PageLayout>
      </>
    );
  }