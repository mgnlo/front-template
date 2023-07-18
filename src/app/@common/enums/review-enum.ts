export enum ReviewStatus {
  review = '待審查',
  agree = '同意',
  reject = '不同意',
}

export enum ReviewClass {
  review = '',
  agree = 'colorGreen textBold',
  reject = 'colorRed textBold'
}

//搭配isSame判斷使用
export enum ReviewCompareClass {
  true = '',
  false = 'colorRed',
  null = 'colorBlue'
}