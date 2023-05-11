import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { Element2Component } from "./element2.component"

const routes: Routes = [
    { path: "", component: Element2Component }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Element2RoutingModule { }
