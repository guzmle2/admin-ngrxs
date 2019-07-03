import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Route, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  _isLoading: boolean;
  private authService = this.injector.get(AuthService);
  private router = this.injector.get(Router);
  private store = this.injector.get(Store);
  private subscripcion: Subscription;

  constructor(protected injector: Injector) {
    this.subscripcion = this.store.select('ui')
      .subscribe(e => this._isLoading = e.isLoading);

    this.subscripcion =
      this.store.select('auth')
        .pipe(
          filter(e => !!e.user && Object.values(e.user).length > 0)
        )
        .subscribe(e => this.router.navigateByUrl(''));
  }

  ngOnInit() {

  }

  onSubmit(user) {
    this.authService.login(user);
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
