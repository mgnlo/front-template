export enum Status {
  enabled = '啟用',
  reviewing = '審查中',
  disabled = '停用'
}

export enum Frequency {
  daily = '每日',
  weekly = '每週',
  monthly = '每月',
  // quarterly = '每季',
  // annually = '每年',
}

export enum Schedule {
  daily = '每日流程',
  weekly = '每週',
  monthly = '每月',
  quarterly = '每季',
  annually = '每年',
}

export enum Filter {
  true = '啟用',
  false = '停用'
}

export enum StatusResult {
  true = '成功',
  false = '失敗',
  success = '成功',
  fail = '失敗'
}

export enum MathSymbol {
  plus = '加',
  minus = '減',
  times = '乘',
  divided = '除',
  $ne = '不等於',
  $eq = '等於',
  $gt = '大於',// >
  $gte = '大於等於',// >=
  $lt = '小於',// <
  $lte = '小於等於',// <=
}

export enum ColumnClass {
  reviewing = '',
  true = '',
  success = '',
  approved = 'color_green text_bold',
  rejected = 'color_red text_bold',
  false = 'color_red text_bold',
  fail = 'color_red text_bold',
}

//搭配isSame判斷使用
export enum ReviewCompareClass {
  true = '',
  false = 'color_red',
  null = 'color_skyBlue'
}

export enum BgClass {
  true = '',
  false = 'redBG',
  null = 'blueBG'
}

export enum toastIcon {
  danger = 'alert-triangle-outline',
  warning = 'alert-triangle-outline',
  success = 'checkmark-outline',
  info = 'paper-plane-outline',
  primary = 'bell-outline'
}

export enum toastTitle {
  danger = '警告',
  warning = '提醒',
  success = '成功',
  info = '訊息',
  primary = '通知'
}

export enum ChineseWeekDays {
  Monday = '星期一',
  Tuesday = '星期二',
  Wednesday = '星期三',
  Thursday = '星期四',
  Friday = '星期五',
  Saturday = '星期六',
  Sunday = '星期日',
}

export const chineseWeekDayValues = [
  ChineseWeekDays.Monday,
  ChineseWeekDays.Tuesday,
  ChineseWeekDays.Wednesday,
  ChineseWeekDays.Thursday,
  ChineseWeekDays.Friday,
  ChineseWeekDays.Saturday,
  ChineseWeekDays.Sunday
];
