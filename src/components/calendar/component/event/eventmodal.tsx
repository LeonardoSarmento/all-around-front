import EventColoredButton from './event-colored-button';
import EventForm from '../eventform';
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../ui/credenza';
import { Icons } from '@components/icons/icon';

export type ColorScheme = 'red' | 'blue' | 'green' | 'default'; // Define the ColorScheme type

type ButtonProps = {
  eventdetails: {
    eventname: string;
    description: string;
    colorScheme?: ColorScheme;
  };
  trigger?: React.ReactNode;
  form?: React.ReactNode;
};

function EventModal({ eventdetails, trigger, form }: ButtonProps) {
  return (
    <Credenza>
      <CredenzaTrigger className="w-full" asChild>
        {trigger ? trigger : <EventColoredButton eventdetails={eventdetails} colorScheme={eventdetails?.colorScheme} />}
      </CredenzaTrigger>

      <CredenzaContent className="max-w-5xl">
        <CredenzaHeader className="px-6 lg:px-2">
          <CredenzaTitle>
            <div className="flex items-center justify-start">
              <Icons.calendarConfig />
              <span className="ml-2">Modify Event</span>
            </div>
          </CredenzaTitle>
          <CredenzaDescription className="text-left">Modify the details of the event.</CredenzaDescription>
        </CredenzaHeader>

        {/* Make the EventModal body scrollable */}
        <CredenzaBody className="max-h-[80vh] overflow-y-auto">
          {form ? form : <EventForm values={eventdetails} />}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default EventModal;
