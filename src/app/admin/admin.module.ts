import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {IngresoEgresoComponent} from './ingreso-egreso/ingreso-egreso.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {adminhReducer} from './admin.actions';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
  ],
  exports: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', adminhReducer),
  ]
})
export class AdminModule {
}
