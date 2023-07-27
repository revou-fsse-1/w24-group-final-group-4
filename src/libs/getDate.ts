export function getDate(date: string): string {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', {
    month: 'short',
  });

  return `${month} ${newDate.getDate()}`;
}
