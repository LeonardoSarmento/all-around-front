import { faker } from '@faker-js/faker';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@services/constants/tables';
import { roleSchema, RolesType } from '@services/types/Role';
import { Filters, PaginatedData } from '@services/types/tables/FilterExtension';
import { UserTableType } from '@services/types/tables/User';


export type TaskFilters = Filters<UserTableType>;

function makeData(amount: number): UserTableType[] {
  return Array(amount)
    .fill(0)
    .map(() => {
      return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: [faker.helpers.enumValue(roleSchema.enum)],
      };
    });
}

const data = makeData(1000);

export async function fetchUsers(filtersAndPagination: TaskFilters): Promise<PaginatedData<UserTableType>> {
  const { pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE, sortBy, ...filters } = filtersAndPagination;
  const requestedData = data.slice();

  if (sortBy) {
    const [field, order] = sortBy.split('.');
    requestedData.sort((a, b) => {
      const aValue = a[field as keyof UserTableType];
      const bValue = b[field as keyof UserTableType];

      if (aValue === bValue) return 0;
      if (order === 'asc') return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }

  const filteredData = requestedData.filter((user) => {
    return Object.keys(filters).every((key) => {
      const filter = filters[key as keyof UserTableType];
      if (filter === undefined || filter === '') return true;

      const value = user[key as keyof UserTableType];

      if (key === 'role') {
        if (Array.isArray(filter)) {
          if (filter.length === 0) return true;
          return Array.isArray(value) ? value.some((val) => filter.includes(val)) : filter.includes(value as RolesType);
        }
        return false;
      }

      if (typeof value === 'string') return value.toLowerCase().includes(`${filter}`.toLowerCase());
      if (typeof value === 'number') return value === +filter;

      return true;
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    result: filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    rowCount: filteredData.length,
  };
}
