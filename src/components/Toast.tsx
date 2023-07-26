import { PropsWithChildren } from 'react';

function Toast(props: PropsWithChildren) {
  return (
    <div
      id="toast-danger"
      className={`flex items-center justify-center w-full max-w-lg p-4 rounded-lg shadow text-red-400 border-2 border-red-700/75 bg-red-700/20`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 p-1 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">{props.children}</div>
    </div>
  );
}

export default Toast;
