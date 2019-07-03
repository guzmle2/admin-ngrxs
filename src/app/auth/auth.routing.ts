import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AuthModule,
  ]
})
export class AuthRouting {
}
