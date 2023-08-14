import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '@common/enums/activity-list-enum';
import { TagDimension, TagType, TagSubDimension, TagSetCondition } from '@common/enums/tag-enum';
import { BgClass, ColumnClass, Filter, Frequency, MathSymbol, ReviewCompareClass, Schedule, Status } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';

export const ENUMS = {
  'gender': Gender,
  'status': Status,
  'schedule': Schedule,
  'filter': Filter,
  'reviewStatus': ReviewStatus,
  'columnClass': ColumnClass,
  'reviewCompareClass': ReviewCompareClass,
  'tagType': TagType,
  'tagSetCondition': TagSetCondition,
  'tagDimension': TagDimension,
  'tagSubDimension': TagSubDimension,
  'bgClass': BgClass,
  'frequency': Frequency,
  'mathSymbol':MathSymbol,
};
@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {

  transform<T>(val: string, enumStr: string): string | null {
    if(!val || !enumStr || !ENUMS[enumStr]){ return null };
    let enumType = ENUMS[enumStr] as T;
    let keyIndex = Object.keys(enumType).indexOf(val);
    return Object.values(enumType)[keyIndex];
  }

}
