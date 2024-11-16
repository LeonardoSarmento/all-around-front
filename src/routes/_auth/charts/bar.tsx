import BarChart from '@components/charts/BarChart';
import { ButtonGroup } from '@components/common/buttons/ButtonGroup';
import Header from '@components/header';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/charts/bar')({
  loader: () => ({
    crumb: 'Barras',
  }),
  component: BarChartComponent,
});

function BarChartComponent() {
  return (
    <>
      <Header title="Gráfico de barras" />
      <Card>
        <CardContent className="flex min-h-[450px] flex-col justify-center gap-5 p-4">
          <BarChart />
        </CardContent>
        <CardFooter className="flex justify-center">
          <ButtonGroup buttons={['back']} />
        </CardFooter>
      </Card>
    </>
  );
}
