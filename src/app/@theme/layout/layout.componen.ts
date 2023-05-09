import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@common/services/loading.service';

@Component({
  selector: 'ngx-column-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponet implements OnInit {
  public loading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  public ngOnInit(): void {
    this.loadingService.getLoading().subscribe((loading) => {
      this.loading = loading;
    });
  }
}
