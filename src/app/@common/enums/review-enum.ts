export enum ReviewStatus {
  reviewing = '待審查',
  approved = '同意',
  rejected = '不同意',
}

export enum ReviewClass {
  reviewing = '',
  approved = 'colorGreen textBold',
  rejected = 'colorRed textBold'
}

//搭配isSame判斷使用
export enum ReviewCompareClass {
  true = '',
  false = 'colorRed',
  null = 'colorSkyBlue'
}