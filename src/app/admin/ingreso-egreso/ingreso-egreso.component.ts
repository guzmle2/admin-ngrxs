import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IIngresoEgreso, IngresoEgreso, TYPE_INGRESO_EGRESO} from '../../models/ingreso-egreso.model';
import {AdminService} from '../admin.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {DesactivarLoadingAction} from '../../shared/redux/ui.reducer';

@Component({
  selector: 'admin-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type = Object.values(TYPE_INGRESO_EGRESO);
  typeIngresoEgreso = TYPE_INGRESO_EGRESO;
  isLoading: boolean;
  items: IIngresoEgreso[];


  subscription: Subscription[] = [];
  store = this.injector.get(Store);
  adminService = this.injector.get(AdminService);

  constructor(private injector: Injector) {
    const subs1 = this.store.select('ui').subscribe(e => this.isLoading = e.isLoading);
    this.subscription.push(subs1);


    const subs2 = this.store.select('admin').subscribe(e => this.items = e.items);
    this.subscription.push(subs2);

  }

  ngOnInit() {
    this.instanceForm();
  }

  instanceForm() {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0)),
      type: new FormControl(TYPE_INGRESO_EGRESO.INGRESO, Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.adminService.create(new IngresoEgreso({...this.form.value}))
        .then(() => {
          Swal.fire({
            type: 'success',
            title: 'Creado con exito',
            timer: 3000
          });
          this.instanceForm();

        })
        .finally(() => this.store.dispatch(new DesactivarLoadingAction()));
    }
  }


  delete(obj) {
    this.adminService.delete(obj)
      .then(() => {
        Swal.fire(
          'Eliminado',
          obj.type + ' ' + obj.description,
          'success'
        );
      });

  }


  ngOnDestroy(): void {
    for (const subs of this.subscription) {
      subs.unsubscribe();
    }
  }

}
