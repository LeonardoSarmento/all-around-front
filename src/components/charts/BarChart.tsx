import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';

export const description = 'A multiple bar chart for CO2 equivalent';

const chartData = [
  { indice: 'POÇO À BOMBA', diesel: 86, eletrico: 75, hibridoDiesel: 34, hibridoEtanol: 75, hidrogenio: 80 },
  { indice: 'BOMBA À RODA', diesel: 78, eletrico: 89, hibridoDiesel: 49, hibridoEtanol: 55, hidrogenio: 87 },
  { indice: 'POÇO À RODA', diesel: 127, eletrico: 164, hibridoDiesel: 98, hibridoEtanol: 104, hidrogenio: 87 },
];

const chartConfig = {
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

export default function BarChartComponent() {
    return (
      <div className="flex h-[300px] justify-center">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-[60%]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="indice"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
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
            <Bar dataKey="diesel" fill="var(--color-diesel)" radius={4}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
            <Bar dataKey="eletrico" fill="var(--color-eletrico)" radius={4}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
            <Bar dataKey="hibridoDiesel" fill="var(--color-hibridoDiesel)" radius={4}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
            <Bar dataKey="hibridoEtanol" fill="var(--color-hibridoEtanol)" radius={4}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
            <Bar dataKey="hidrogenio" fill="var(--color-hidrogenio)" radius={4}>
              <LabelList position="top" offset={15} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    );
  }
  