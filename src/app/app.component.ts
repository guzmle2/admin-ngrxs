import {Component, Injector} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'admin-root',
  template: `
    <div class="container-scroller">
      <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {

  authService = this.injector.get(AuthService);

  constructor(protected injector: Injector) {
    this.authService.initAuthListener();
  }
}
