import { Checkbox } from '@components/ui/checkbox';
import { Row } from '@tanstack/react-table';
import { useFilters } from '@services/hooks/useFilters';
import { useEffect } from 'react';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

type CheckedAction<T, R> = {
  row: Row<T>;
  id: number;
  routeId: R;
};
export function CheckedRow<T, R extends RouteIds<RegisteredRouter['routeTree']>>({
  row,
  id,
  routeId,
}: CheckedAction<T, R>) {
  const { filters, setFilters } = useFilters(routeId);

  const handleCheckChange = (value: boolean) => {
    const selectedIdSet = new Set((filters as { selectedId?: number[] }).selectedId || []);

    if (value) {
      // Add the row's user ID to the set if checked
      selectedIdSet.add(id);
    } else {
      // Remove the row's user ID from the set if unchecked
      selectedIdSet.delete(id);
    }

    // Update the filters with the new selected IDs
    setFilters({
      ...filters,
      selectedId: Array.from(selectedIdSet),
    });

    // Update the row selection state
    row.toggleSelected(value);
  };

  useEffect(() => {
    function ShouldBeChecked() {
      if (((filters as { selectedId?: number[] }).selectedId || []).includes(id)) {
        row.toggleSelected(true);
      } else {
        row.toggleSelected(false);
      }
    }
    ShouldBeChecked();
  }, [filters, id, row]);

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => handleCheckChange(!!value)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  );
}
