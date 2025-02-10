export function formatDate(
  date: Date,
  typeMonth: 'long' | 'short' = 'long'
): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: typeMonth ? typeMonth : 'short',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const [month, day, year] = formattedDate.split(' ');
  const noCommaDay = day.replace(',', '');

  if (noCommaDay.startsWith('0')) {
    const removeZero = noCommaDay.slice(1);
    return `${removeZero} ${month} ${year}`;
  }
  return `${noCommaDay} ${month} ${year}`;
}
