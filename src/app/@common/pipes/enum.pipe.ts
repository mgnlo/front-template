import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '@common/enums/activity-list-enum';
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