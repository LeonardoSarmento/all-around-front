import { createFileRoute } from '@tanstack/react-router';
import Header from '@components/header';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import LineChart from '@components/charts/LineChart';
import { ButtonGroup } from '@components/common/buttons/ButtonGroup';

export const Route = createFileRoute('/_auth/charts/line')({
  loader: () => ({
    crumb: 'Linhas',
  }),
  component: LineChartComponent,
});

function LineChartComponent() {
  return (
    <>
      <Header title="Gráfico de linhas" />
      <Card>
        <CardContent className="flex min-h-[450px] flex-col justify-center gap-5 p-4">
          <LineChart />
        </CardContent>
        <CardFooter className="flex justify-center">
          <ButtonGroup buttons={['back']} />
        </CardFooter>
      </Card>
    </>
  );
}
