import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { DashBoardInfo } from "@api/models/dashboard.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class DashboardService {

  readonly dashboardFunc = 'dashboard/';

  constructor(private service: ApiService) { }

  getDashboard(): Observable<ResponseModel<DashBoardInfo>> {
    return this.service.doGet(this.dashboardFunc);
  }

}
