import Header from '@components/header';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/charts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Header title="Uma coleção de gráficos" />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Link to="/charts/bar">
          <div className="flex aspect-video items-center justify-center rounded-xl bg-muted/50 px-8">
            <Header
              title="Barras"
              description="Um gráfico com barras retangulares e comprimento proporcional aos valores que ele apresenta. As barras podem ser desenhadas na vertical ou na horizontal. Este tipo de representação utiliza barras horizontais para ilustrar comparações."
            />
          </div>
        </Link>
        <Link to="/charts/line">
          <div className="flex aspect-video items-center justify-center rounded-xl bg-muted/50 px-8">
            <Header
              title="Linhas"
              description="Um tipo de gráfico que exibe informações com uma série de pontos de dados chamados de marcadores ligados por segmentos de linha reta. É um tipo básico de gráfico comum em muitos campos."
            />
          </div>
        </Link>
        <Link to="/charts">
          <div className="flex aspect-video items-center justify-center rounded-xl bg-muted/50 px-8">
            <Header title="W.I.P." />
          </div>
        </Link>
      </div>
      <Link
        to="/charts"
        className="flex min-h-[100vh] flex-1 items-center justify-center rounded-xl bg-muted/50 px-8 md:min-h-min"
      >
        <Header title="W.I.P." />
      </Link>
    </div>
  );
}
