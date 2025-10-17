import { zodResolver } from "@hookform/resolvers/zod";
import { addMinutes, format, set } from "date-fns";
import { type ReactNode, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@components/ui/responsive-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COLORS } from "@components/calendar-v2/constants";
import { useCalendar } from "@components/calendar-v2/contexts/calendar-context";
import { useDisclosure } from "@components/calendar-v2/hooks";
import type { IEvent } from "@components/calendar-v2/interfaces";
import {
  eventSchema,
  type TEventFormData,
} from "@components/calendar-v2/schemas";
import DynamicForm from "@components/common/form/DynamicForm";

interface IProps {
  children: ReactNode;
  startDate?: Date;
  endDate?: Date;
  startTime?: { hour: number; minute: number };
  event?: IEvent;
  isOpen?: boolean;
  onClose?: () => void;
}

export function AddEditEventDialog({
  children,
  startDate,
  startTime,
  event,
  endDate,
  isOpen: isOpenProp,
  onClose: onCloseProp,
}: IProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const modalIsOpen = isOpenProp ?? isOpen;
  const modalOnChange = onCloseProp ?? onToggle;

  const { addEvent, updateEvent } = useCalendar();
  const isEditing = !!event;

  const initialDates = useMemo(() => {
    if (!isEditing && !event) {
      if (startDate && endDate) {
        return { startDate, endDate };
      }

      if (!startDate) {
        const now = new Date();
        return { startDate: now, endDate: addMinutes(now, 30) };
      }

      const start = startTime
        ? set(new Date(startDate), {
            hours: startTime.hour,
            minutes: startTime.minute,
            seconds: 0,
          })
        : new Date(startDate);
      const end = addMinutes(start, 30);
      return { startDate: start, endDate: end };
    }

    return {
      startDate: new Date(event.start),
      endDate: new Date(event.end),
    };
  }, [startDate, endDate, startTime, event, isEditing]);

  const form = useForm<TEventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title ?? "",
      description: event?.description ?? "",
      start: initialDates.startDate,
      end: initialDates.endDate,
      color: event?.color ?? "blue",
    },
  });

  useEffect(() => {
    form.reset({
      title: event?.title ?? "",
      description: event?.description ?? "",
      start: initialDates.startDate,
      end: initialDates.endDate,
      color: event?.color ?? "blue",
    });
  }, [event, initialDates, form]);

  const onSubmit = (values: TEventFormData) => {
    try {
      const formattedEvent: IEvent = {
        ...values,
        start: format(values.start, "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(values.end, "yyyy-MM-dd'T'HH:mm:ss"),
        id: isEditing
          ? event.id
          : Math.floor(Math.random() * 1000000).toString(),
        user: isEditing
          ? event.user
          : {
              id: Math.floor(Math.random() * 1000000).toString(),
              name: "Jeraidi Yassir",
              avatar: null,
            },
        color: values.color,
      };

      if (isEditing) {
        updateEvent(formattedEvent);
        toast.success("Event updated successfully");
      } else {
        addEvent(formattedEvent);
        toast.success("Event created successfully");
      }

      onClose();
      form.reset();
    } catch (error) {
      console.error(`Error ${isEditing ? "editing" : "adding"} event:`, error);
      toast.error(`Failed to ${isEditing ? "edit" : "add"} event`);
    }
  };

  return (
    <Modal open={modalIsOpen} onOpenChange={modalOnChange} modal={false}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{isEditing ? "Edit Event" : "Add New Event"}</ModalTitle>
          <ModalDescription>
            {isEditing
              ? "Modify your existing event."
              : "Create a new event for your calendar."}
          </ModalDescription>
        </ModalHeader>

        <Form {...form}>
          <form
            id="event-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <DynamicForm
              control={form.control}
              name="title"
              type="input"
              placeholder="Nome"
              label="Nome"
            />
            <DynamicForm
              control={form.control}
              name="start"
              type="datetime-input"
              placeholder="Começo"
              label="Começo"
            />
            <DynamicForm
              control={form.control}
              name="end"
              type="datetime-input"
              placeholder="Final"
              label="Final"
            />

            {/* <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <DateTimePicker form={form} field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <DateTimePicker form={form} field={field} />
              )}
            /> */}
            <FormField
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Variant</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`w-full ${
                          fieldState.invalid ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {COLORS.map((color) => (
                          <SelectItem value={color} key={color}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
                              />
                              {color}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter a description"
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <ModalFooter className="flex justify-end gap-2">
          <ModalClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </ModalClose>
          <Button form="event-form" type="submit">
            {isEditing ? "Save Changes" : "Create Event"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
