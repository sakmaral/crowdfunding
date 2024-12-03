import { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: string;
}

export const Button: FC<ButtonProps> = ({ styles, children, ...props }) => {
  return (
    <button
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
};
