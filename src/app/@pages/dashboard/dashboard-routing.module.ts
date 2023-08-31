import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { DashboardComponent } from "./dashboard.component"
import { DashboardRoomComponent } from "./dashboard-room/dashboard-room.component";

const routes: Routes = [
    {
        path: "", component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'dashboard-room', pathMatch: 'full' },
            { path: 'dashboard-room', component: DashboardRoomComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

export const routedComponents = [
    DashboardComponent,
    DashboardRoomComponent
];