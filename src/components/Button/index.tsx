export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={className}>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-2 px-16 rounded-md shadow-lg"
        {...props}
      >
        {children}
      </button>
    </div>
  );
};
