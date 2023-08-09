export const RegExpUtil = {
  custIdSearch: /^[A-Z]{0,2}[0-9]{0,9}$/,
  int: /^[0-9]*$/,
  /** 正負數整數*/
  isNumeric: /^-?\d+$/,
  /** yyyy-MM-dd*/
  dateDashAD: /^\d{4}-\d{2}-\d{2}$/,
  yyyy: /^\d{4}$/,
  yyyyMM: /^\d{4}\-\d{2}$/,
  /** yyyy-MM-dd or yyyy/MM/dd or yyyy.MM.dd*/
  dateFmt1: /^\d{4}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  /** yyyyMMdd*/
  dateFmt2: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/,
  removeChinese : /[\u4e00-\u9fa5]/g,
}
