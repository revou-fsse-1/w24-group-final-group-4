import { PostStringDates } from '@/pages/posts';
import Link from 'next/link';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { getDate } from '@/libs/getDate';

export default function PostCard({ post }: { post: PostStringDates }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      key={post.id}
      className="block bg-gray-700 rounded-md p-6 space-y-3 hover:ring-2 ring-transparent hover:ring-sky-600 transition-all"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-full flex justify-center items-center bg-gray-400 aspect-square min-h-[3rem] overflow-hidden">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              // className="w-full h-full"
              src={createAvatar(thumbs, {
                seed: post.user.name as string,
              }).toDataUriSync()}
              alt="avatar"
            />
            {/* <span className="text-[90%]">
                            {makeInitial(post.user.name as string)}
                          </span> */}
          </div>

          <div>
            <p className="font-medium text-xl">
              {/* {makeInitial(post.user.name as string)} */}
              {post.user.name}
            </p>
            <p className="text-gray-400 text-xs">
              {getDate(post.createdAt)}{' '}
              {new Date(post.createdAt).toLocaleTimeString('en', {
                timeStyle: 'short',
                hour12: false,
                timeZone: 'Asia/Jakarta',
              })}
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
        <p className="line-clamp-4 text-gray-400">{post.description}</p>
      </div>
    </Link>
  );
}
