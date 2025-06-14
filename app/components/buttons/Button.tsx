import Link from 'next/link'
import Spinner from '../loaders/Spinner';

interface ButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  isLoading?: boolean;
  url?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isActive = true,
  isLoading = false,
  url,
  onClick
}) => {
  const disabled = !isActive || isLoading;

  const className = `w-full group relative my-4 flex justify-center rounded-md border border-transparent bg-[#222] py-2 px-4 text-sm font-semibold text-white focus:outline-none ${
    disabled ? 'opacity-70 hover:cursor-default hover:bg-[#111]' : ''
  }`;

  const content = (
    <button
      type="submit"
      className={className}
      disabled={disabled}
      {...(onClick ? { onClick } : {})}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );

  if (url && !disabled) {
    return <Link href={url}>{content}</Link>;
  }

  return content;
};

export default Button;