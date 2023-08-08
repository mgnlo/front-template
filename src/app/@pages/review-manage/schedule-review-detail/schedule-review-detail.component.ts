import { Component, OnInit } from '@angular/core';
import { StorageService } from '@api/services/storage.service';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'schedule-review-detail',
  templateUrl: './schedule-review-detail.component.html',
  styleUrls: ['./schedule-review-detail.component.scss']
})
export class ScheduleReviewDetailComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
  ) {
    super(storageService);
  }

  ngOnInit(): void {
  }

}
