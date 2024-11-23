import { PaginationState } from '@tanstack/react-table';
import { z } from 'zod';

export type PaginatedData<T> = {
  result: T[];
  rowCount: number;
};

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}.${'asc' | 'desc'}` };
export type SelectionParams = { selection: SelectionType[] };
export type Filters<T> = Partial<T & PaginationParams & SortParams & SelectionParams>;
export const selectionSchema = z.enum(['SELECTED', 'NOT_SELECTED']);

export type SelectionType = z.infer<typeof selectionSchema>;
