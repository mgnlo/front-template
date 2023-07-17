import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '@common/enums/activity-list-enum';
import { TagDimension, TagType, tagSubDimension } from '@common/enums/tag-enum';
import { Filter, Schedule, Status } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: string): number {
    return Status[value];
  }
}

@Pipe({
  name: 'reviewStatus'
})
export class ReviewStatusPipe implements PipeTransform {
  transform(value: string): number {
    return ReviewStatus[value];
  }
}

@Pipe({
  name: 'schedule'
})
export class SchedulePipe implements PipeTransform {
  transform(value: string): number {
    return Schedule[value];
  }
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: string): number {
    return Filter[value];
  }
}

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  transform(value: string): number {
    return Gender[value];
  }
}

@Pipe({
  name: 'tagDimension'
})
export class TagDimensionPipe implements PipeTransform {
  transform(value: string): number {
    return TagDimension[value];
  }
}

@Pipe({
  name: 'tagSubDimension'
})
export class TagSubDimensionPipe implements PipeTransform {
  transform(value: string): number {
    return tagSubDimension[value];
  }
}

@Pipe({
  name: 'tagType'
})
export class TagTypePipe implements PipeTransform {
  transform(value: string): number {
    return TagType[value];
  }
}
