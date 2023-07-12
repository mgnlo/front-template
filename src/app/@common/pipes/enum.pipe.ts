import { Pipe, PipeTransform } from '@angular/core';
import { Filter, Schedule, Status } from '@common/enums/activity-list-enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: string): number {
    return Status[value];
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