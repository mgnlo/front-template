import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { DashboardComponent } from "./dashboard.component"
import { CenterRoomComponent } from "./center-room/center-room.component";

const routes: Routes = [
    {
        path: "", component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'center-room', pathMatch: 'full' },
            { path: "center-room", component: CenterRoomComponent, data:{ schema: 'dashboard' }}
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
    CenterRoomComponent
];