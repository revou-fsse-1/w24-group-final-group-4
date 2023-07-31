import PageLayout from '@/components/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User, getServerSession } from 'next-auth';
import { Archivo } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authOptions } from '../api/auth/[...nextauth]';
import { prisma } from '@/libs/db';
import { PostStringDates } from '.';
import DetailPostCard from '@/components/DetailPostCard';
import { useState } from 'react';
import Modal from '@/components/Modal';
import CommentForm from '@/components/CommentForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

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

  const post = await prisma.post.findFirst({
    where: {
      id: context.params?.id as string,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log(post);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const serializedPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.createdAt.toISOString(),
  };

  const serializedComment = serializedPost.comments.map((comment) => {
    return {
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.createdAt.toISOString(),
    };
  });

  console.log(serializedComment);

  return {
    props: {
      user: session.user,
      post: { ...serializedPost, comments: serializedComment },
    },
  };
};

export default function DetailPost({
  user,
  post,
}: {
  user: User;
  post: PostStringDates;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ text: string }>();

  const paramId = router.asPath.split('/')[router.asPath.split('/').length - 1];

  const onSubmit: SubmitHandler<{ text: string }> = async (formData) => {
    console.log(formData);
    setShowError(false);
    try {
      await axios.post(
        '/api/comments',
        {
          ...formData,
          userId: user.id,
          postId: paramId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      router.replace(`/posts/${paramId}`);
      reset({ text: '' });
    } catch (error: any) {
      console.log(error);
      setShowError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Detail Post | Mentalk</title>
      </Head>
      <PageLayout>
        <main className={`${archivo.className} px-8 py-10`}>
          <section className="max-w-screen-lg mx-auto grid grid-cols-10 gap-4">
            <nav className="col-span-full" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white"
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
                    <span className="hidden sm:block">Home</span>
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
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 text-gray-400 hover:text-white"
                    >
                      Posts
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
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
                    <span className="ml-1 text-sm font-medium md:ml-2 text-gray-400">
                      {
                        router.asPath.split('/')[
                          router.asPath.split('/').length - 1
                        ]
                      }
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="col-span-full md:col-span-3 sm:grid sm:grid-cols-2 md:block gap-4 md:space-y-4">
              <div className="bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-md p-6 pt-24">
                <h1 className="font-semibold text-2xl">Detail Post</h1>
                <p>They need help. Give them.</p>
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
              <DetailPostCard
                post={post}
                user={user}
                setShowModal={setShowModal}
              />

              <div className="h-[1px] w-full bg-slate-200/10"></div>

              <CommentForm
                errors={errors}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                register={register}
                onSubmit={onSubmit}
              />
            </div>
          </section>
        </main>
        {showModal && (
          <Modal setShowModal={setShowModal} user={user} post={post} />
        )}
      </PageLayout>
    </>
  );
}
