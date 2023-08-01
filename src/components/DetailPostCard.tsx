import { getDate } from '@/libs/getDate';
import { makeInitial } from '@/libs/makeInitial';
import { PostStringDates } from '@/pages/posts';
import { User } from 'next-auth';
import React, { useState } from 'react';

function DetailPostCard({
  post,
  user,
  setShowModal,
  onDelete,
}: {
  post: PostStringDates;
  user: User;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <div
      // href={`/posts/${post.id}`}
      // key={post.id}
      className="block bg-gray-700 rounded-md p-6 space-y-6 ring-transparent"
    >
      <div>
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
              <p className="text-gray-400 text-xs">{getDate(post.createdAt)}</p>
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
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">{post.title}</h3>
        <p className="text-gray-400 whitespace-pre-line">{post.description}</p>
      </div>

      {post.userId === user.id && (
        <>
          <div className="h-[1px] w-full bg-slate-200/10"></div>
          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-green-500  focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center  bg-green-500/20 hover:bg-green-600/20 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[1e-m] h-[1em] mr-2"
              >
                <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setDeleteLoading(true);
                onDelete();
              }}
              className="text-red-500  focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center  bg-red-500/20 hover:bg-red-600/20 focus:ring-red-500"
            >
              {deleteLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-[1em] h-[1em] mr-2 animate-spin text-red-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    className="fill-gray-700"
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[1e-m] h-[1em] mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailPostCard;
