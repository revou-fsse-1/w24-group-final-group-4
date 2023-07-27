import { IFormInput } from '@/pages/posts';
import { User } from 'next-auth';
import React from 'react';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

type FormContactProps = {
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
  onSubmit: SubmitHandler<IFormInput>;
  errors: FieldErrors<IFormInput>;
  register: UseFormRegister<IFormInput>;
  isSubmitting: boolean;
  type: 'create' | 'edit';
};

function PostForm({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isSubmitting,
  type,
  user,
}: FormContactProps & { user: User }) {
  return (
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
        <form
          className="space-y-3"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v7.5a3 3 0 003 3v-6A4.5 4.5 0 0110.5 6h6z" />
                <path d="M18 7.5a3 3 0 013 3V18a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3H18z" />
              </svg>
            </div>
            <input
              type="text"
              id="title"
              className={`border text-sm rounded-lg outline-none  block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 `}
              placeholder="Title"
              {...register('title', { required: true })}
            />
          </div>
          {errors.title?.type === 'required' && (
            <span className="text-red-500 text-xs">*Field required</span>
          )}
          <div className="relative">
            <div className="absolute top-3 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <textarea
              id="description"
              className=" resize-none border  text-sm rounded-lg outline-none block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us what you feel.."
              rows={6}
              {...register('description', { required: true })}
            />
          </div>
          {errors.description?.type === 'required' && (
            <span className="text-red-500 text-xs">*Field required</span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="block bg-sky-600 hover:bg-sky-700 py-2 px-4 ml-auto font-medium rounded-md "
          >
            {type === 'create' ? 'Create Post' : 'Edit Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
