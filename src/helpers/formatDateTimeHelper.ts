import Handlebars from "handlebars";

export const formatDateTimeHelper = () => {
  Handlebars.registerHelper("formatDateTime", (timestamp, formatType) => {
    const date = new Date(timestamp);

    if (formatType === 'time') {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } else if (formatType === 'date') {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
      return date.toLocaleDateString('ru-RU', options);
    }

    return '';
  });
};