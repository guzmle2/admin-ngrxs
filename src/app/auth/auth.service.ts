import {Injectable, Injector} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {IAppState} from '../app.reducer';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/redux/ui.reducer';
import {SetUserAction} from './auth.reducer';
import {IUser, User} from '../models/user.model';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: IUser;
  afAuth = this.injector.get(AngularFireAuth);
  afDB = this.injector.get(AngularFirestore);
  router = this.injector.get(Router);
  private subscription: Subscription = new Subscription();

  constructor(private injector: Injector, private store: Store<IAppState>) {

  }

  initAuthListener() {
    this.afAuth.authState.subscribe((e: any) => {
      this.userLogged = new User({...e});
      if (this.user) {
        this.subscription = this.afDB.doc(`${this.user.uid}/user`)
          .valueChanges()
          .subscribe((us: User) => this.updateUser(us));
      } else {
        this.updateUser(null);
        this.subscription.unsubscribe();
      }
    });
  }

  register(user: IUser) {
    this.updateLoading(true);

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {

        const auxUser: IUser = {
          uid: response.user.uid,
          name: user.name,
          email: response.user.email
        };

        return this.afDB.doc(`${auxUser.uid}/user`)
          .set(auxUser);
      })
      .then(e => this.router.navigateByUrl('/in'))
      .catch(e => Swal.fire('Error ', e.message, 'error'))
      .finally(() => this.updateLoading(false));
  }

  login(user: IUser) {
    this.updateLoading(true);

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(e => this.router.navigateByUrl('/in'))
      .catch(e => Swal.fire('Error en el login', e.message, 'error'))
      .finally(() => this.updateLoading(false));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigateByUrl(''));
  }

  updateLoading(isLoading) {
    const action = isLoading ? new ActivarLoadingAction() : new DesactivarLoadingAction();
    this.store.dispatch(action);
  }

  updateUser(user) {
    const action = new SetUserAction(user);
    this.store.dispatch(action);
  }

  get user() {
    let retorno = Object.assign({}, this.userLogged);
    if (!Object.values(retorno).length) {
      retorno = null;
    }
    return retorno;
  }

  public isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
