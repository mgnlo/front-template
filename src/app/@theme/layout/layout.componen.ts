import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '@api/services/loading.service';

@Component({
  selector: 'ngx-column-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponet implements OnInit {
  public loading: boolean = false;

  constructor(private loadingService: LoadingService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loadingService.getLoading().subscribe((loading) => {
      this.loading = loading;
      this.cdr.detectChanges();
    });
  }
}
