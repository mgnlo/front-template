import { Pipe, PipeTransform } from '@angular/core';
import { HistoryGroupView } from '@api/models/activity-list.model';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(value: string, args: HistoryGroupView): unknown {
    console.info(args)
    return null;
  }
}
