export const NOTIFICATION_AGO = {
  TODAY: '오늘',
  YESTERDAY: '어제',
  THIS_WEEK: '이번 주',
  THIS_MONTH: '이번 달',
  REST: '지난 알림',
};

export const checkNotificationAgo = (createdAt: string) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const yesterDay = new Date(new Date().setDate(startOfToday.getDate() - 1));
  yesterDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(new Date().setDate(startOfToday.getDate() - startOfToday.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(new Date().setDate(1));
  startOfMonth.setHours(0, 0, 0, 0);

  const createdTime = new Date(createdAt).getTime();
  if (createdTime > startOfToday.getTime()) {
    return NOTIFICATION_AGO.TODAY;
  } else if (createdTime > yesterDay.getTime()) {
    return NOTIFICATION_AGO.YESTERDAY;
  } else if (createdTime > startOfWeek.getTime()) {
    return NOTIFICATION_AGO.THIS_WEEK;
  } else if (createdTime > startOfMonth.getTime()) {
    return NOTIFICATION_AGO.THIS_MONTH;
  } else {
    return NOTIFICATION_AGO.REST;
  }
};
