export const formatDate = (date: string): string => {
  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}`;
};

export const toISOString = (date: string, hour: number): string => {
  const [day, month, year] = date.split('/');

  const dateObj = new Date(`${year}/${month}/${day}`);
  dateObj.setHours(hour);

  return dateObj.toISOString().replace('.000Z', '+00:00');
};

export const adjustCNMCHour = (hour: string): number => parseInt(hour) - 1;
