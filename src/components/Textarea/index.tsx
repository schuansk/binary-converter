import React from 'react';
import { FaCopy } from 'react-icons/fa';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  title: string;
  active: boolean;
  textToClipboard?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ title, active, textToClipboard, ...rest }, ref) => {
    const [toast, setToast] = React.useState(false);

    const baseClasses = `
    rounded-md border-4
    transition-colors duration-200 ease-in-out outline-none
    w-full resize-none
    px-3 py-2
    text-lg
  `;

    const activeClasses = 'border-blue-500 text-gray-800';
    const inativeClasses = 'border-gray-200 text-gray-600';

    const copyToClipboard = () => {
      if (!textToClipboard) return;
      navigator.clipboard
        .writeText(textToClipboard)
        .then(() => {
          setToast(true);
          setTimeout(() => setToast(false), 500);
        })
        .catch((error) => console.error(error));
    };

    return (
      <div className="flex flex-col items-start space-y-1 flex-grow">
        <div className="flex justify-between w-full relative">
          <span className="text-gray-800 text-xl font-medium">{title}</span>
          <button
            onClick={copyToClipboard}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 ease-in-out outline-none"
          >
            <FaCopy size={18} />
          </button>
          {toast && (
            <div className="absolute -mt-8 right-0 text-white bg-blue-500 rounded-md px-2 py-1">
              Copiado!
            </div>
          )}
        </div>
        <textarea
          className={`${baseClasses} ${
            active ? activeClasses : inativeClasses
          }`}
          disabled={!active}
          rows={5}
          ref={ref}
          {...rest}
        ></textarea>
      </div>
    );
  },
);
