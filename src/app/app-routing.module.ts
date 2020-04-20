import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErroresComponent } from "./components/errores/errores.component";
import { InterfComponent } from "./components/interf/interf.component";
const routes: Routes = [
  {
    path:'',
    redirectTo:'/interf',
    pathMatch:'full'
  },
  {
    path: 'interf',
    component: InterfComponent

  },
  {
    path:'err',
    component: ErroresComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
