import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { NavigationMenuGroup } from './NavigationMenu';

export function NotFoundComponent() {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col justify-between min-h-screen">
      <NavigationMenuGroup />
      <div className="flex flex-col items-center justify-center my-auto gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <CardTitle className="mt-4">Ops... Parece que a URL foi escrita de forma incorreta</CardTitle>
          <CardDescription>Tente acessar a página novamente</CardDescription>
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
    </div>
  );
}
