import { parseISO, isValid, format } from "date-fns";
import { enUS } from "date-fns/locale"; // Import the locale you need

export default function Date({ dateString }) {
  try {
    const date = parseISO(dateString);

    if (!isValid(date)) {
      return <span>Invalid date</span>;
    }

    const formattedDate = format(date, "LLLL d, yyyy", { locale: enUS });

    return <time dateTime={dateString}>{formattedDate}</time>;
  } catch (error) {
    console.error("Error parsing date:", error);
    return <span>Error parsing date</span>;
  }
}
