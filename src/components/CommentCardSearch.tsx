import { getDate } from '@/libs/getDate';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import Link from 'next/link';

export default function CommentCardSearch({ comment }: { comment: any }) {
  return (
    <Link
      href={`/posts/${comment.postId}`}
      key={comment.id}
      className="block bg-gray-700/30 rounded-md p-6 space-y-6 ring-transparent hover:ring-2 hover:ring-sky-600"
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-full aspect-square flex justify-center items bg-gray-400 overflow-hidden shrink-0 min-w-[3rem] ">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full rounded-full"
                src={createAvatar(thumbs, {
                  seed: comment.user.name as string,
                }).toDataUriSync()}
                alt="avatar"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-xl">
                  {/* {makeInitial(comment.user.name as string)} */}
                  {comment.user.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {getDate(comment.createdAt)}{' '}
                  {new Date(comment.createdAt).toLocaleTimeString('en', {
                    timeStyle: 'short',
                    hour12: false,
                    timeZone: 'Asia/Jakarta',
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 whitespace-pre-line">
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
