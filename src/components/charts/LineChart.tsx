import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';

type FuelData = {
  minute: string;
  diesel: number;
  eletrico: number;
  hibridoDiesel: number;
  hibridoEtanol: number;
  hidrogenio: number;
};

function generateFakeData(size: number): FuelData[] {
  const fakeData: FuelData[] = [];

  for (let i = 1; i <= size; i++) {
    const data: FuelData = {
      minute: `${i} min`,
      diesel: getRandomInt(80, 90),
      eletrico: getRandomInt(70, 80),
      hibridoDiesel: getRandomInt(30, 40),
      hibridoEtanol: getRandomInt(70, 80),
      hidrogenio: getRandomInt(75, 85),
    };
    fakeData.push(data);
  }

  return fakeData;
}

// Função auxiliar para gerar um número inteiro aleatório entre min e max (inclusive)
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Exemplo de uso da função para gerar 10 elementos
const chartData = generateFakeData(15);

export const description = 'A multiple timeline line chart';

const chartConfig = {
  co2: {
    label: 'CO2eq',
  },
  diesel: {
    label: 'Diesel',
    color: 'hsl(var(--chart-1))',
  },
  eletrico: {
    label: 'Elétrico',
    color: 'hsl(var(--chart-2))',
  },
  hibridoDiesel: {
    label: 'Híbrido Diesel',
    color: 'hsl(var(--chart-3))',
  },
  hibridoEtanol: {
    label: 'Híbrido Etanol',
    color: 'hsl(var(--chart-4))',
  },
  hidrogenio: {
    label: 'Hidrogênio',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function LineChartComponent() {
  return (
    <div className="flex h-[250px] justify-center">
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-[80%]">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 30,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="minute"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelKey="co2"
                indicator="dashed"
                formatter={(value, name) => (
                  <div className="flex min-w-[145px] items-center text-xs text-muted-foreground">
                    {chartConfig[name as keyof typeof chartConfig]?.label || name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {value}
                      <span className="font-normal text-muted-foreground">tCO2eq</span>
                    </div>
                  </div>
                )}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="diesel"
            type="monotone"
            stroke="var(--color-diesel)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-diesel)',
              r: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="eletrico"
            type="monotone"
            stroke="var(--color-eletrico)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-eletrico)',
              r: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="hibridoDiesel"
            type="monotone"
            stroke="var(--color-hibridoDiesel)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-hibridoDiesel)',
              r: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="hibridoEtanol"
            type="monotone"
            stroke="var(--color-hibridoEtanol)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-hibridoEtanol)',
              r: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="hidrogenio"
            type="monotone"
            stroke="var(--color-hidrogenio)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-hidrogenio)',
              r: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
