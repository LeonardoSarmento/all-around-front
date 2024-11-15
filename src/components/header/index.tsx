import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { HTMLAttributes } from 'react';

type HeaderProps = {
  title: string;
  description?: string;
  classNameTitle?: string;
  classNameDescription?: string;
  user?: string;
  isLoading?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function Header({
  description,
  title,
  classNameDescription,
  classNameTitle,
  user,
  isLoading,
  ...props
}: HeaderProps) {
  return (
    <div className={cn('my-6 flex flex-col gap-3', props.className)} {...props}>
      <h1
        className={cn('scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl gap-3 flex', classNameTitle)}
      >
        {title}
        {isLoading ? <Skeleton className="h-10 w-[350px] rounded-sm" /> : user ? user : null}
      </h1>
      <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', classNameDescription)}>
        {description}
      </h4>
    </div>
  );
}
