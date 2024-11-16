import { Card } from '@components/ui/card'; // shadcn Card for structure
import { MonthView } from './monthview';
import YearView from './yearview';
import { WeekView } from './weekview';
import { CalendarProps } from '../types/event';
import { TabTypes } from '../types/tabs';

export interface ViewsProps extends CalendarProps {
  activeTab: TabTypes;
  isAnimating: boolean;
  currentDate: Date;
}
const Views = (props: ViewsProps) => {
  const isYearView = props.activeTab === 'year';
  const isMonthView = props.activeTab === 'month';
  const isWeekView = props.activeTab === 'week';
  return (
    <Card
      className={`rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-300 sm:p-4 ${
        props.isAnimating ? '-translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div style={{ minWidth: '100%', display: 'table' }}>
        {isYearView && <YearView currentDate={props.currentDate} events={props.events} />}
        {isMonthView && <MonthView currentDate={props.currentDate} events={props.events} />}
        {isWeekView && <WeekView currentDate={props.currentDate} events={props.events} />}
      </div>
    </Card>
  );
};

export default Views;
