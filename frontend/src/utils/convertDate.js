export function convertDate(textDate) {
  const date = new Date(textDate);

  const dateFormatted = date.toLocaleDateString();
  const timeFormatted = date.toLocaleTimeString('fr-FR', { hour12: false });

  return `${dateFormatted} ${timeFormatted}`;
}
