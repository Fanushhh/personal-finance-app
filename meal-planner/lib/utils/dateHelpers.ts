export const getWeekRange = (date = new Date()) => {
  const current = new Date(date);
  const day = (current.getDay() + 6) % 7;
  const monday = new Date(current);
  monday.setDate(current.getDate() - day);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { weekStart: monday, weekEnd: sunday };
};

export const weekDays = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
