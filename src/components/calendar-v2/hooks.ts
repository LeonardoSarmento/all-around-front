import { useEffect, useRef, useState } from "react";

export function useDisclosure({
  defaultIsOpen = false,
}: {
  defaultIsOpen?: boolean;
} = {}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((currentValue) => !currentValue);

  return { onOpen, onClose, isOpen, onToggle };
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export interface SlotIdentifier {
  day: Date;
  hour: number;
  minute: number;
}

export function useTimeRangeSelection() {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<SlotIdentifier[]>([]);
  const startSlotRef = useRef<SlotIdentifier | null>(null);

  function handleMouseDown(slot: SlotIdentifier) {
    setIsSelecting(true);
    startSlotRef.current = slot;
    setSelectedSlots([slot]);
  }

  function handleMouseEnter(slot: SlotIdentifier) {
    if (!isSelecting || !startSlotRef.current) return;

    const start = startSlotRef.current;
    if (start.day.toDateString() !== slot.day.toDateString()) return;

    const startTotal = start.hour * 60 + start.minute;
    const endTotal = slot.hour * 60 + slot.minute;
    const [min, max] = [
      Math.min(startTotal, endTotal),
      Math.max(startTotal, endTotal),
    ];

    const newSelection: SlotIdentifier[] = [];
    for (let t = min; t <= max; t += 30) {
      newSelection.push({
        day: start.day,
        hour: Math.floor(t / 60),
        minute: t % 60,
      });
    }
    setSelectedSlots(newSelection);
  }

  function handleMouseUp() {
    if (!isSelecting || selectedSlots.length === 0) return null;

    setIsSelecting(false);
    const start = selectedSlots[0];
    const end = selectedSlots[selectedSlots.length - 1];
    startSlotRef.current = null;

    return { start, end };
  }

  return {
    isSelecting,
    selectedSlots,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
}
