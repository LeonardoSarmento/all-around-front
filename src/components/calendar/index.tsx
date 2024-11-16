import { useState } from 'react';
import { CalendarProps } from './types/event';
import { TabTypes } from './types/tabs';
import { useAnimationTrigger } from './hooks/useAnimationTrigger';
import { useWeekChange } from './hooks/useWeekChange';
import { months } from './constants';
import { useMonthChange } from './hooks/useMonthChange';
import { useYearChange } from './hooks/useYearChange';
import { useToday } from './hooks/useToday';
import CalenderHeader from './component/calender-header';
import Views from './component/views';


const FullCalender = ({ events, config }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<TabTypes>('month'); // Default to "month"

  const [value, setValue] = useState<string>('');
  const { isAnimating, triggerAnimation } = useAnimationTrigger(config?.animationConfig?.duration || 300);

  const handleWeekChange = useWeekChange({
    currentDate,
    setCurrentDate,
    setValue,
    triggerAnimation,
    months,
  });

  const handleMonthChange = useMonthChange({
    currentDate,
    setCurrentDate,
    setValue,
    triggerAnimation,
    months,
  });

  const handleYearChange = useYearChange({
    currentDate,
    setCurrentDate,
    triggerAnimation,
  });

  const handleToday = useToday({
    setCurrentDate,
    setValue,
    triggerAnimation,
  });

  return (
    <div>
      <CalenderHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        value={value}
        setValue={setValue}
        isAnimating={isAnimating}
        handleWeekChange={handleWeekChange}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        handleToday={handleToday}
        config={config}
      />
      <Views currentDate={currentDate} activeTab={activeTab} isAnimating={isAnimating} events={events} />
    </div>
  );
};

export default FullCalender;
