export const dateTimeUtil = {
  y4m2d2: (date: Date): string => {
    date = date instanceof Date ? date : new Date(date);

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  },
};
