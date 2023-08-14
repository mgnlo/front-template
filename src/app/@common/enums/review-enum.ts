export enum ReviewStatus {
  reviewing = '待審查',
  approved = '同意',
  rejected = '不同意',
}

export enum ReviewClass {
  reviewing = '',
  approved = 'color_green text_bold',
  rejected = 'color_red text_bold'
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