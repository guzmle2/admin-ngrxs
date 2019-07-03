import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'admin-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  _isLoading: boolean;
  private authService = this.injector.get(AuthService);
  private store = this.injector.get(Store);
  private subscripcion: Subscription;

  constructor(protected injector: Injector) {
    this.subscripcion = this.store.select('ui').subscribe(e => this._isLoading = e.isLoading);
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.authService.register(form);
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
