import React from 'react';
import { Button } from '@components/ui/button';

type EventDetails = {
  eventname: string;
  description: string;
};

type ColorScheme = 'default' | 'blue' | 'green' | 'red'; // Add more as needed

type ColoredButtonProps = {
  eventdetails: EventDetails;
  colorScheme?: ColorScheme; // Optional color scheme
  onClick?: () => void; // Optional onClick prop
};

const EventColoredButton: React.FC<ColoredButtonProps> = ({
  eventdetails,
  colorScheme = 'default', // Default color scheme
  onClick, // Include onClick prop
}) => {
  // Define Tailwind classes for each color scheme
  const colorClasses = {
    default: {
      bgColor: 'bg-yellow-200 dark:bg-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      borderColor: 'border-l-black/70 dark:border-l-white/50',
    },
    blue: {
      bgColor: 'bg-blue-200 dark:bg-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      borderColor: 'border-l-blue-600 dark:border-l-blue-400',
    },
    green: {
      bgColor: 'bg-green-200 dark:bg-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      borderColor: 'border-l-green-600 dark:border-l-green-400',
    },
    red: {
      bgColor: 'bg-red-200 dark:bg-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      borderColor: 'border-l-red-600 dark:border-l-red-400',
    },
  };

  const { bgColor, textColor, borderColor } = colorClasses[colorScheme];

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={onClick} // Use onClick passed from the parent
      className={`mb-1 flex h-10 w-full cursor-pointer flex-col items-start rounded border-l-4 border-opacity-70 p-1 text-[8px] transition-colors duration-200 sm:text-xs ${bgColor} ${textColor} ${borderColor} hover:bg-opacity-85 dark:hover:bg-opacity-40`}
    >
      <div className="w-full max-w-md">
        <h2 className="truncate text-left font-semibold">{eventdetails.eventname}</h2>
        <p className="truncate text-left font-light">{eventdetails.description}</p>
      </div>
    </Button>
  );
};

export default EventColoredButton;
