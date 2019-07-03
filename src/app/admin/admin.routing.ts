import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminModule} from './admin.module';
import {IngresoEgresoComponent} from './ingreso-egreso/ingreso-egreso.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminGuard} from './admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'stadistic',
        component: EstadisticaComponent
      },
      {
        path: 'ingreso-egreso',
        component: IngresoEgresoComponent
      },
      {
        path: '**',
        redirectTo: 'stadistic'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    AdminModule
  ]
})
export class AdminRouting {
}
