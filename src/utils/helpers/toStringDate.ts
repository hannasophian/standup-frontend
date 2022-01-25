export default function toStringDate(isoDate: string): string {
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];

  const d = new Date(isoDate);
  const stringDate = `${weekday[d.getDay() - 1]}, ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()} @ ${isoDate.slice(11, 16)}`;
  return stringDate;
}
