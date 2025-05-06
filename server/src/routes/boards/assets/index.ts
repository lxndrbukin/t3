export const defaultColumns = [
  { id: 1, name: "To Do", order: 0, tasks: [] },
  { id: 2, name: "In Progress", order: 1, tasks: [] },
  { id: 3, name: "Done", order: 2, tasks: [] },
];

export const boardColumns = (customColumns: string[]) => {
  if (customColumns.length === 0) {
    return defaultColumns;
  }
  return customColumns.map((column: string, index: number) => {
    return {
      id: index + 1,
      name: column,
      order: index,
      tasks: [],
    };
  });
};
