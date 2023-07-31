import { getDate } from '@/libs/getDate';
import { makeInitial } from '@/libs/makeInitial';
import { SerializedComment } from '@/pages/posts/[id]';
import { Comment, User } from '@prisma/client';

export default function CommentCard({ comment }: { comment: any }) {
  return (
    <div
      // href={`/posts/${comment.id}`}
      // key={comment.id}
      className="block bg-gray-700/30 rounded-md p-6 space-y-6 ring-transparent hover:ring-2 hover:ring-sky-600"
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-full flex justify-center items-center bg-gray-400 p-2 aspect-square min-h-[3rem] ">
              <span className="text-[90%]">
                {makeInitial(comment.user.name as string)}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-xl">
                  {makeInitial(comment.user.name as string)}
                </p>
                <p className="text-gray-400 text-xs">
                  {getDate(comment.createdAt)}
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
    </div>
  );
}
