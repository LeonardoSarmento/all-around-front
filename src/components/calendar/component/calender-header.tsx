import { Dispatch, SetStateAction } from 'react';
import AddEvent from './add-event';
import { MonthHeader } from './monthheader';
import { Tabs } from './tabs';
import { TabTypes } from '../types/tabs';
import { CalendarProps } from '../types/event';
import { Button } from '@components/ui/button';
import { YearHeader } from './yearheader';

export interface CalenderHeaderProps {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  activeTab: TabTypes;
  setActiveTab: Dispatch<SetStateAction<TabTypes>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isAnimating: boolean;
  handleWeekChange: (action: 'prev' | 'next' | string) => void;
  handleMonthChange: (action: 'prev' | 'next' | string) => void;
  handleYearChange: (action: 'prev' | 'next' | number) => void;
  handleToday: () => void;
  config?: CalendarProps['config'];
}

const CalenderHeader = (props: CalenderHeaderProps) => {
  const isYearView = props.activeTab === 'year';
  const isMonthView = props.activeTab === 'month';
  const isWeekView = props.activeTab === 'week';
  return (
    <header>
      {isWeekView && (
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <MonthHeader
            currentDate={props.currentDate}
            setCurrentDate={props.setCurrentDate}
            isAnimating={props.isAnimating}
            value={props.value}
            setValue={props.setValue}
            handleMonthChange={(action: 'prev' | 'next' | string) => {
              if (action === 'prev' || action === 'next') {
                props.handleWeekChange(action);
              } else {
                props.handleMonthChange(action);
              }
            }}
            handleYearChange={props.handleYearChange}
          />
          <div className="flex items-center justify-between gap-4">
            <AddEvent
              CustomForm={props.config?.addEventConfig?.customForm}
              buttonText={props.config?.addEventConfig?.buttonText}
              formDescription={props.config?.addEventConfig?.formDescription}
              formTitle={props.config?.addEventConfig?.formTitle}
              icon={props.config?.addEventConfig?.icon}
            />
            <Tabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
            <Button variant="outline" onClick={props.handleToday}>
              Today
            </Button>
          </div>
        </div>
      )}
      {isMonthView && (
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <MonthHeader
            currentDate={props.currentDate}
            setCurrentDate={props.setCurrentDate}
            isAnimating={props.isAnimating}
            value={props.value}
            setValue={props.setValue}
            handleMonthChange={props.handleMonthChange}
            handleYearChange={props.handleYearChange}
          />
          <div className="flex items-center justify-between gap-4">
            <AddEvent
              CustomForm={props.config?.addEventConfig?.customForm}
              buttonText={props.config?.addEventConfig?.buttonText}
              formDescription={props.config?.addEventConfig?.formDescription}
              formTitle={props.config?.addEventConfig?.formTitle}
              icon={props.config?.addEventConfig?.icon}
            />
            <Tabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
            <Button variant="outline" onClick={props.handleToday}>
              Today
            </Button>
          </div>
        </div>
      )}
      {isYearView && (
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <YearHeader
            getFullYear={props.currentDate.getFullYear()}
            setCurrentDate={props.setCurrentDate}
            isAnimating={props.isAnimating}
            handleYearChange={props.handleYearChange}
          />
          <div className="flex items-center justify-center gap-4">
            <AddEvent
              CustomForm={props.config?.addEventConfig?.customForm}
              buttonText={props.config?.addEventConfig?.buttonText}
              formDescription={props.config?.addEventConfig?.formDescription}
              formTitle={props.config?.addEventConfig?.formTitle}
              icon={props.config?.addEventConfig?.icon}
            />
            <Tabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
            <Button variant="outline" onClick={props.handleToday}>
              This Year
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default CalenderHeader;
