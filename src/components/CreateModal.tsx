import React, { useEffect, useRef, useState } from 'react';
import PostForm from './PostForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput, PostStringDates } from '@/pages/posts';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from 'next-auth';
import Toast from './Toast';

type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

function CreateModal(props: ModalProps) {
  const formWrapper = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setShowError(false);
    try {
      await axios.post(
        `/api/posts`,
        {
          ...formData,
          userId: props.user.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      reset({ title: '', description: '' });
      router.replace(`/posts`);
      props.setShowModal(false);
    } catch (error: any) {
      console.log(error);
      setShowError(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formWrapper.current &&
        !formWrapper.current.contains(event.target as Node)
      ) {
        props.setShowModal(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    // reset({
    //   title: props.post.title,
    //   description: props.post.description,
    // });

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-zinc-900/80 backdrop-blur-sm">
      <div
        ref={formWrapper}
        className="w-full max-w-screen-sm"
        // className="bg-zinc-200/50 p-8 text-zinc-900 rounded-md w-2/6 min-w-[22rem] sm:min-w-[30rem] border-gray-100/20 border-2 backdrop-blur-sm"
      >
        <PostForm
          user={props.user}
          errors={errors}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          register={register}
          type="create"
          onSubmit={onSubmit}
        />

        {showError && (
          <Toast>Failed to create the post. Please try again.</Toast>
        )}
      </div>
    </div>
  );
}

export default CreateModal;
