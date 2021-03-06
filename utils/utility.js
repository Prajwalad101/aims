export function getFormattedDate(createdAt) {
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date(createdAt);
  const year = d.getFullYear();
  const date = d.getDate();

  const monthIndex = d.getMonth();
  const month = months[monthIndex];

  return `${date} ${month} ${year}`;
}

export const checkPlural = (name, number) => {
  if (Number(number) === 0 || Number(number) > 1) {
    return name + "s";
  } else {
    return name;
  }
};
