export const convertDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  if (formatDate(date) === formatDate(today)) {
    return 'Today';
  } else if (formatDate(date) === formatDate(tomorrow)) {
    return 'Tomorrow';
  }

  const day = date.getDate();
  const dd = day < 10 ? `0${day}` : day;
  const month = date.getMonth() + 1;
  const mm = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();

  return `${dd}/${mm}/${year}`;
};
