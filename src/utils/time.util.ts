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

export const getCreatedAtFormat = (createdAt: string) => {
  const currentTime = new Date();
  const postDate = new Date(createdAt);
  const timeDiff = currentTime.getTime() - postDate.getTime();

  if (timeDiff < 60 * 1000) {
    // 1분 이내 게시
    return '방금';
  } else if (timeDiff < 60 * 60 * 1000) {
    // 1시간 이내 게시
    return `${Math.floor(timeDiff / 1000 / 60)}분`;
  } else if (timeDiff < 24 * 60 * 60 * 1000) {
    // 1일 이내 게시
    return `${Math.floor(timeDiff / 1000 / 60 / 60)}시간`;
  } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
    // 7일 이내 게시
    return `${Math.floor(timeDiff / 1000 / 60 / 60 / 24)}일`;
  } else {
    // 주 단위
    return `${Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 7)}주`;
  }
};
