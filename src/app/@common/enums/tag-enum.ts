export enum TagType {
  normal = '規則標籤',
  document = '名單標籤',
}

export enum TagSetCondition {
  normal = '查詢語法',
  field = '欄位條件篩選',
}

export enum TagJoinValue {
  and = 'and',
  or = 'or',
}

//方便tag-set判斷用
/** 標籤類型 */
export enum TagTypeEnum {
  /** 規則標籤 */
  normal = 'normal',
  /** 名單標籤 */
  document = 'document',
}

//方便tag-set判斷用
/** 條件設定方式 */
export enum ConditionSettingMethodEnum {
  /** 查詢語法 */
  normal = 'normal',
  /** 欄位條件篩選 */
  field = 'field',
}
