import { PIXELS_PER_HOUR } from "@components/calendar-v2/dnd/resizable-event";
import { SlotIdentifier } from "@components/calendar-v2/hooks";
import { format } from "date-fns";
import { motion } from "motion/react";

interface NewEventGhostProps {
  startSlot: SlotIdentifier;
  endSlot: SlotIdentifier;
  use24HourFormat: boolean;
}

export function NewEventGhost({
  startSlot,
  endSlot,
  use24HourFormat,
}: NewEventGhostProps) {
  const top =
    startSlot.hour * PIXELS_PER_HOUR +
    startSlot.minute * (PIXELS_PER_HOUR / 60);
  const height =
    (endSlot.hour - startSlot.hour) * PIXELS_PER_HOUR +
    (endSlot.minute - startSlot.minute) * (PIXELS_PER_HOUR / 60);

  const startTime = format(startSlot.day, use24HourFormat ? "HH:mm" : "h:mm a");
  const endTime = format(endSlot.day, use24HourFormat ? "HH:mm" : "h:mm a");

  return (
    <motion.div
      className="absolute left-1 right-1 bg-secondary/40 rounded-md shadow-lg z-30 pointer-events-none border border-secondary/60"
      initial={{ height: 0, top }}
      animate={{ top, height }}
      exit={{ height: 0 }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md">
        {startTime} - {endTime}
      </div>
    </motion.div>
  );
}
