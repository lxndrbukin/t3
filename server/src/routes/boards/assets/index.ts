export const defaultColumns = [
  { id: 1, name: 'To Do', order: 1, tasks: [] },
  { id: 2, name: 'In Progress', order: 2, tasks: [] },
  { id: 3, name: 'Done', order: 3, tasks: [] },
];

export const boardColumns = (customColumns: string[]) => {
  if (!customColumns) {
    return defaultColumns;
  }
  return customColumns.map((column: string, index: number) => {
    return {
      id: index,
      name: column,
      order: index,
      tasks: [],
    };
  });
};
