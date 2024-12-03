export const daysLeft = (deadline: string | Date): string => {
  const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline;
  const difference = deadlineDate.getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return Math.max(0, remainingDays).toFixed(0);
};
