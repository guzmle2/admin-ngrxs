import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {IIngresoEgreso, TYPE_INGRESO_EGRESO} from '../../models/ingreso-egreso.model';
import {Label, MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'admin-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  store = this.injector.get(Store);
  subscriptions: Subscription[] = [];
  totalIngreso: number;
  totalEgreso: number;
  ingresos: number;
  egresos: number;
  public doughnutChartLabels: Label[] = Object.values(TYPE_INGRESO_EGRESO);
  public doughnutChartData = [];

  constructor(protected injector: Injector) {
    const subs = this.store.select('admin')
      .subscribe(e => this.countTotal(e.items));
    this.subscriptions.push(subs);
  }

  ngOnInit() {
  }

  countTotal(items: IIngresoEgreso[]) {

    const ingresos = items.filter(e => e.type === TYPE_INGRESO_EGRESO.INGRESO);
    const egresos = items.filter(e => e.type === TYPE_INGRESO_EGRESO.EGRESO);

    this.totalIngreso = ingresos.length;
    this.totalEgreso = egresos.length;

    this.ingresos = ingresos.reduce((sum, current) => sum + current.amount, 0);
    this.egresos = egresos.reduce((sum, current) => sum + current.amount, 0);
    this.doughnutChartData = [
      this.ingresos,
      this.egresos
    ];

  }


  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

}
