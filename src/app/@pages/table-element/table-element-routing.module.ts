import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { TableElementComponent } from "./table-element.component"

const routes: Routes = [
    { path: "", component: TableElementComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TableElementRoutingModule { }
