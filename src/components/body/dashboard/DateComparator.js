const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export const monthsMapper = {
  Ene: "jan",
  Feb: "feb",
  Mar: "mar",
  Abr: "apr",
  May: "may",
  Jun: "jun",
  Jul: "jul",
  Ago: "aug",
  Sep: "sep",
  Oct: "oct",
  Nov: "nov",
  Dic: "dec",
};

export const monthsMapper1 = {
  Ene: 1,
  Feb: 2,
  Mar: 3,
  Abr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Ago: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dic: 12,
};

export function sortLabels(labels) {
  const reversedLabels = labels.map((label) => {
    const splitLabel = label.split("-");
    const monthNumber = months.indexOf(splitLabel[0]) + 1;
    return (
      splitLabel[1] + (monthNumber > 9 ? monthNumber : "0" + monthNumber) + "01"
    );
  });
  const x = reversedLabels.sort(sortDateLabels);

  const reversedAsString = [...x].map((y) => {
    const year = y.substring(0, 4);
    const z = parseInt(y.substring(4, 6), 10);
    const month = getMonthFromNumber(z);

    return month + "-" + year;
  });

  return reversedAsString;
}

function sortDateLabels(a, b) {
  a = a.split("/").reverse().join("");
  b = b.split("/").reverse().join("");
  return a > b ? 1 : a < b ? -1 : 0;
}

function getMonthFromNumber(numbermonth) {
  return Object.entries(monthsMapper1).filter(
    ([key, value]) => value === numbermonth
  )[0][0];
}
