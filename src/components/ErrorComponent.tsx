import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { NavigationMenuGroup } from './NavigationMenu';

export function ErrorComponent() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavigationMenuGroup />
      <div className="flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <CardTitle className="mt-4">Alguma coisa quebrou inesperadamente</CardTitle>
          <CardDescription>Entre em contato com o superior responsável</CardDescription>
        </CardContent>
        <div className="flex gap-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.navigate({ to: '/' });
            }}
            type="button"
          >
            Home
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.history.back();
            }}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </div>
      <div />
    </div>
  );
}
