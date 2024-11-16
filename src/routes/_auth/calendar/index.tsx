import { createFileRoute } from '@tanstack/react-router';
import Header from '@components/header';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import CO2EqChart from '@components/charts/BarChart';
import { ButtonGroup } from '@components/common/buttons/ButtonGroup';

export const Route = createFileRoute('/_auth/calendar/')({
  component: CalendarComponent,
});

function CalendarComponent() {
  return (
    <>
      <Header title="Calendário" />
      <Card>
        <CardContent className="flex min-h-[450px] flex-col items-center justify-center gap-5 p-4">
          <CO2EqChart />
        </CardContent>
        <CardFooter className="flex justify-center">
          <ButtonGroup buttons={['back']} />
        </CardFooter>
      </Card>
    </>
  );
}
