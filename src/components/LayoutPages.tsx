import Header from './header';
import { Button } from './ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Link, LinkOptions } from '@tanstack/react-router';
import { HTMLAttributes } from 'react';
import { cn } from '@lib/utils';

export type NavigationMenuOptionsType = { title: string; options: LinkOptions; description: string };

export function LayoutPages({
  headerTitle,
  descriptionTitle,
  navigationOptions,
  buttonText,
  className,
  ...props
}: {
  headerTitle: string;
  descriptionTitle?: string;
  navigationOptions: NavigationMenuOptionsType[];
  buttonText?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('container mx-auto space-y-4', className)}>
      <Header title={headerTitle} description={descriptionTitle} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {navigationOptions.map((c, index) => (
          <Card key={index} className="shadow-md transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold capitalize">{c.title}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="flex-1">
                <Link {...c.options}>
                  {buttonText ?? 'Acessar'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
