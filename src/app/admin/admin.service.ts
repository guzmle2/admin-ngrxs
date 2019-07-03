import {Injectable, Injector} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {IIngresoEgreso, IngresoEgreso} from '../models/ingreso-egreso.model';
import {AuthService} from '../auth/auth.service';
import {ActivarLoadingAction} from '../shared/redux/ui.reducer';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction} from './admin.reducer';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private afDB = this.injector.get(AngularFirestore);
  private authService = this.injector.get(AuthService);
  private store = this.injector.get(Store);
  private subcriptions: Subscription[] = [];

  constructor(private injector: Injector) {

  }

  initAdminListener() {
    const subscription = this.store.select('auth')
      .pipe(
        filter(e => e.user !== null)
      )
      .subscribe(e => this.ingresoEgreso(e.user.uid));

    this.subcriptions.push(subscription);
  }

  private ingresoEgreso(uid: string) {
    const subscription = this.afDB
      .collection(`${uid}/admin/items`)
      .snapshotChanges()
      .pipe(
        map(docs => {
          return docs.map(its => {
            const obj = {
              uid: its.payload.doc.id.toString(),
              ...its.payload.doc.data()
            };
            return new IngresoEgreso(obj);
          });
        })
      )
      .subscribe(e => this.store.dispatch(new SetItemsAction(e)));
    this.subcriptions.push(subscription);
  }

  create(obj: IIngresoEgreso) {
    this.store.dispatch(new ActivarLoadingAction());
    return this.afDB
      .doc(`${this.authService.user.uid}/admin`)
      .collection('items')
      .add({...obj});
  }

  delete(obj: IIngresoEgreso) {
    return this.afDB
      .doc(`${this.authService.user.uid}/admin/items/${obj.uid}`)
      .delete();
  }

  cancelarSubscription() {
    for (const subs of this.subcriptions) {
      subs.unsubscribe();
    }
  }
}
