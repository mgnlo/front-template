export enum Status {
  enabled = '啟用',
  reviewing = '審查中',
  disabled = '停用'
}

export enum Frequency {
  daily = '每日',
  weekly = '每週',
  monthly = '每月',
  quarterly = '每季',
  annually = '每年',
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
