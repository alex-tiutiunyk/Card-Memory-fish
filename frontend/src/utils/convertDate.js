export function convertDate(textDate) {
  const date = new Date(textDate);

  const dateFormatted = date.toLocaleDateString();
  const timeFormatted = date.toLocaleTimeString('fr-FR', { hour12: false });

  console.log([dateFormatted, timeFormatted]);

  return `${dateFormatted} ${timeFormatted}`;
}
