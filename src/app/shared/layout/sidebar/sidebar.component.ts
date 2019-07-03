import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {IUser, User} from '../../../models/user.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  private authService = this.injector.get(AuthService);
  private store = this.injector.get(Store);
  user: IUser ;
  private subscription: Subscription[] = [];

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    const subs = this.store.select('auth')
      .pipe(filter(auth => !!auth.user))
      .subscribe(e => {
        this.user = e.user;
      });
    this.subscription.push(subs);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    for (const its of this.subscription) {
      its.unsubscribe();
    }
  }
}
