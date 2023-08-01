import PageLayout from '@/components/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User, getServerSession } from 'next-auth';
import { Archivo } from 'next/font/google';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';
import { prisma } from '@/libs/db';
import { getDate } from '@/libs/getDate';
import Link from 'next/link';
import { PostStringDates } from './posts';

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
        <main className={`${archivo.className} px-8 py-10`}>
          <section className="max-w-screen-lg mx-auto grid grid-cols-10 gap-4">
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
                  <Link
                    href={`/posts/${post.id}`}
                    key={post.id}
                    className="block bg-gray-700 rounded-md p-6 space-y-3 hover:ring-2 ring-transparent hover:ring-sky-600 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full flex justify-center items-center bg-gray-400 p-2 aspect-square min-h-[3rem]">
                          <span className="text-[90%]">
                            {post.user.name
                              ? post.user.name.charAt(0).toUpperCase()
                              : ''}
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
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}